'use strict';

const fieldLabels={nationality:'Nacionalidad',firstName:'Nombre o nombres',surname:'Apellidos',secondSurname:'Segundo apellido',birthDate:'Fecha de nacimiento',documentNumber:'Número de documento',expiryDate:'Fecha de caducidad'};
const scanKeys=['firstName','surname','nationality','birthDate','documentNumber','expiryDate'];
function blankForm(){return {nationality:'',firstName:'',surname:'',secondSurname:'',birthDate:'',documentType:'id',documentNumber:'',expiryDate:'',sources:{}};}
function conflictsFor(current,read){return scanKeys.filter(key=>current[key]&&read[key]&&current[key]!==read[key]);}
function mergeRead(current,read,accept={}){
  const next={...current,sources:{...current.sources}};
  for(const key of scanKeys){const value=String(read[key]??'').trim();if(value&&(!current[key]||accept[key])){next[key]=value;next.sources[key]='read';}}
  return next;
}
if(typeof module!=='undefined')module.exports={blankForm,conflictsFor,mergeRead};

if(typeof document!=='undefined'){
  const $=id=>document.getElementById(id);
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let form=blankForm(),profile=profiles[1],attempts=0,token=0,readData=null,docType='id',correctedPhoto=false,partialFixed=false,issuingCountry='',documentKey='';
  const dialog=$('scan-dialog');
  const announce=message=>{$('live-status').textContent=message;};
  function remember(){for(const key of [...Object.keys(fieldLabels),'documentType'])form[key]=$(key).value;}
  function renderForm(){
    document.querySelectorAll('.read-origin').forEach(el=>el.remove());
    for(const key of [...Object.keys(fieldLabels),'documentType']){$(key).value=form[key];$(key).classList.toggle('read',form.sources[key]==='read');}
    for(const key of scanKeys)if(['read','user_corrected'].includes(form.sources[key])){const label=document.createElement('small');label.className='read-origin';label.textContent=form.sources[key]==='read'?'✓ Leído del documento':'✓ Completado con tu corrección';$(key).parentElement.append(label);}
  }
  function note(message,kind='success'){$('form-notice').textContent=message;$('form-notice').className=`notice ${kind}`;$('form-notice').hidden=false;}
  function reset(){
    token++;if(dialog.open)dialog.close();issuingCountry='';documentKey='';form=blankForm();attempts=0;readData=null;correctedPhoto=false;partialFixed=false;
    if(profile.scenario==='conflict'){form.firstName='Diego';form.surname='García López';form.nationality='Española';}
    docType=[2,10].includes(profile.id)?'passport':'id';form.documentType=docType;
    $('profile-select').value=String(profile.id);$('form-notice').hidden=true;renderForm();
    $('profile-detail').innerHTML=`<span class="context-tag">${esc(profile.context)}</span><h4>Espera</h4><p>${esc(profile.expectation)}</p><h4>Feedback simulado</h4><p>«${esc(profile.feedback)}»</p><h4>Decisión incorporada</h4><p>${esc(profile.decision)}</p>`;
    announce(`Perfil ${profile.name} preparado. Datos de ejemplo.`);
  }
  // Iconos de tipo de documento (SVG, usan el color del texto)
  const docIcon=type=>type==='passport'
    ?'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3.5" width="18" height="25" rx="2.5"/><circle cx="16" cy="13.5" r="5"/><ellipse cx="16" cy="13.5" rx="2.2" ry="5"/><path d="M11 13.5h10"/><rect x="13" y="22.5" width="6" height="3" rx=".8"/></svg>'
    :'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="26" height="18" rx="3"/><circle cx="11" cy="14" r="2.6"/><path d="M6.5 22c.4-2.6 2.2-4 4.5-4s4.1 1.4 4.5 4"/><path d="M19 13h7M19 17h7M19 21h4.5"/></svg>';
  const stageHtml=(d,cam,flip,fx)=>{
    if(!d)return `<div class="stage ${cam?'cam':''}"><div class="stage-empty"><span aria-hidden="true">▭</span>Elige país y tipo para ver<br>qué cara debes fotografiar</div></div>`;
    const passInner=`<div class="pass-stage"><img class="pdata" src="${d.image}" alt="${esc(d.alt)}"><div class="pcover-wrap"><img class="pcover" src="assets/passport/cover.webp" alt=""></div></div>`;
    const inner=flip&&d.formType==='passport'&&fx?passInner:flip&&d.imageOther?`<div class="flip-wrap"><div class="flip-inner" style="--fd:${FLIP_DELAY}s"><div class="face"><img src="${d.imageOther}" alt=""></div><div class="face turned"><img src="${d.image}" alt="${esc(d.alt)}"></div></div></div>`:`<img src="${d.image}" alt="${esc(d.alt)}">`;
    const corners=cam?'<i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>':'';
    return `<div class="stage ${cam?'cam':''}">${fx?`<div class="tilt">${inner}${fx}</div>`:inner}${corners}</div>`;
  };
  function currentDoc(){return resolveDocument(issuingCountry,documentKey);}
  function typeOptions(){
    return `<option value="">Selecciona</option>${Object.entries(documentCatalog[issuingCountry]?.documents||{}).map(([key,d])=>`<option value="${key}" ${documentKey===key?'selected':''}>${esc(d.label)}</option>`).join('')}`;
  }
  const stepsHtml=n=>`<ol class="steps" aria-label="Pasos"><li class="${n===1?'on':n>1?'done':''}"><b>1</b> Documento</li><li class="${n===2?'on':n>2?'done':''}"><b>2</b> Prepárate</li><li class="${n===3?'on':''}"><b>3</b> Foto</li></ol>`;
  const sideName=d=>d.sideLabel.split(' · ')[0];
  // Paso 1 · elegir documento
  function guide(){
    const d=currentDoc();if(d)docType=d.formType;
    const countries=Object.entries(documentCatalog).map(([code,c])=>`<option value="${code}" ${issuingCountry===code?'selected':''}>${esc(c.name)}</option>`).join('');
    const types=Object.entries(documentCatalog[issuingCountry]?.documents||{});
    const typeButtons=types.length?`<div class="type-options" role="radiogroup" aria-label="Tipo de documento">${types.map(([k,t])=>`<button type="button" role="radio" aria-checked="${documentKey===k}" class="type-option ${documentKey===k?'on':''}" data-action="pick-type" data-key="${k}"><span class="ti" aria-hidden="true">${docIcon(t.formType)}</span>${esc(t.label)}</button>`).join('')}</div>`:'<p class="hint">Primero elige el país que expidió el documento.</p>';
    const preview=d?`<div class="pick-preview"><img src="${d.image}" alt=""><div><b>Fotografiarás: ${esc(sideName(d))}</b><span>${d.formType==='passport'?'La página con tu foto y los datos.':'Solo esta cara; no hace falta la otra.'}</span></div></div>`:'';
    body('¿Qué documento vas a usar?',`<div class="field"><label for="issuing-country">País que lo expidió</label><select id="issuing-country" class="big-select"><option value="">Selecciona un país</option>${countries}</select></div><div class="field"><span class="lbl">Tipo de documento</span>${typeButtons}</div>${preview}<div class="dialog-actions"><button class="primary" data-action="prepare" ${d?'':'disabled'}>Continuar</button><button class="text-button" data-action="exit">Prefiero escribirlos</button></div>`,stepsHtml(1));
  }
  // Esquema (mock-up) del documento: zonas de foto, datos y líneas de lectura como referencia visual para la foto
  function genericMock(d){
    const pass=d.formType==='passport',front=d.side==='front';let n=0;
    const part=(cls,style,inner='')=>`<i class="${cls}" style="${style};--i:${n++}">${inner}</i>`;
    const bar=(l,t,w)=>part('mb',`left:${l}%;top:${t}%;width:${w}%`);
    const photo=(l,t,w,h)=>part('mphoto',`left:${l}%;top:${t}%;width:${w}%;height:${h}%`,'<b></b>');
    const lines=pass?['P&lt;XXXMOCK&lt;&lt;DEMO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;','DEMO000012XXX9001018M3101018&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;']:['IDXXXDEMO00012345&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;','9001017M3101018XXX&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;2','MOCK&lt;&lt;DEMO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;'];
    let body,top,h;
    if(pass){body=photo(5,13,25,46)+bar(36,14,50)+bar(36,26,38)+bar(36,38,46)+bar(36,50,30);top=74;h=21;}
    else if(front){body=photo(6,14,26,50)+bar(38,16,48)+bar(38,28,36)+bar(38,40,44)+bar(38,52,30);top=68;h=27;}
    else{body=bar(6,12,46)+bar(6,24,34)+bar(6,36,52)+bar(60,12,32)+bar(60,24,28)+part('mchip','left:6%;top:40%');top=62;h=33;}
    const band=`<div class="mband" style="top:${top}%;height:${h}%;--i:${n++}"><pre class="${pass?'p':'i'}">${lines.join('\n')}</pre></div>`;
    return `<div class="cam-mock" aria-hidden="true">${body}${band}</div>`;
  }
  // Esquema real: dibuja las zonas anotadas en la imagen de cada documento (foto, chip, QR, MRZ…)
  function mockHtml(d){
    const key=(d.image||'').split('/').pop().replace(/\.\w+$/,'');
    const L=typeof documentLayouts!=='undefined'?documentLayouts[key]:null;
    if(!L||!L.length)return genericMock(d);
    const pass=d.formType==='passport';let n=0;
    const box=(cls,x,y,w,h,inner='',st='')=>`<i class="${cls}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;--i:${n++};${st}">${inner}</i>`;
    const chars=pass?44:30;
    const mrzLines=pass?['P&lt;XXXMOCK&lt;&lt;DEMO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;','DEMO000012XXX9001018M3101018&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;']:['IDXXXDEMO00012345&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;','9001017M3101018XXX&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;2','MOCK&lt;&lt;DEMO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;'];
    const parts=L.map(([t,x,y,w,h,k])=>{
      switch(t){
        case 'photo':return box('mphoto',x,y,w,h,'<b></b>');
        case 'ghost':return box('mphoto ghost',x,y,w,h,'<b></b>');
        case 'chip':return box('mchip',x,y,w,h);
        case 'qr':return box('mqr',x,y,w,h,'<svg viewBox="0 0 21 21" preserveAspectRatio="xMidYMid meet" shape-rendering="crispEdges"><g fill="none" stroke="currentColor" stroke-width="1"><rect x=".5" y=".5" width="6" height="6"/><rect x="14.5" y=".5" width="6" height="6"/><rect x=".5" y="14.5" width="6" height="6"/></g><g fill="currentColor"><rect x="2" y="2" width="3" height="3"/><rect x="16" y="2" width="3" height="3"/><rect x="2" y="16" width="3" height="3"/><rect x="9" y="0" width="2" height="2"/><rect x="12" y="1" width="1" height="2"/><rect x="9" y="3" width="1" height="3"/><rect x="11" y="5" width="2" height="1"/><rect x="8" y="8" width="2" height="2"/><rect x="11" y="9" width="1" height="2"/><rect x="13" y="8" width="2" height="1"/><rect x="16" y="9" width="2" height="2"/><rect x="19" y="8" width="2" height="1"/><rect x="0" y="9" width="2" height="1"/><rect x="3" y="9" width="1" height="2"/><rect x="5" y="11" width="2" height="1"/><rect x="8" y="12" width="1" height="2"/><rect x="10" y="13" width="2" height="1"/><rect x="14" y="12" width="2" height="1"/><rect x="18" y="12" width="1" height="2"/><rect x="9" y="16" width="2" height="1"/><rect x="12" y="15" width="2" height="2"/><rect x="15" y="14" width="1" height="2"/><rect x="17" y="16" width="2" height="2"/><rect x="20" y="15" width="1" height="2"/><rect x="9" y="19" width="1" height="2"/><rect x="12" y="19" width="2" height="1"/><rect x="15" y="18" width="1" height="3"/><rect x="18" y="19" width="2" height="2"/></g></svg>');
        case 'barcode':return box('mbar',x,y,w,h);
        case 'holo':return box('mholo',x,y,w,h);
        case 'sign':return box('msign',x,y,w,h,'<svg viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M2 22C10 2 18 28 26 12S42 26 52 10 70 24 98 8"/></svg>');
        case 'box':return box('mbox',x,y,w,h);
        case 'text':{const kk=Math.max(1,Math.min(k||2,8));return box('mtext',x,y,w,h,'<s></s>'.repeat(kk),`--k:${kk}`);}
        case 'mrz':{const kk=Math.max(1,Math.min(k||(pass?2:3),3));
          const ln=Array.from({length:kk},(_,j)=>{const src=mrzLines[Math.min(j,mrzLines.length-1)];return `<span>${[...src.replace(/&lt;/g,'<')].slice(0,chars).map(c=>`<s>${c==='<'?'&lt;':c}</s>`).join('')}</span>`}).join('');
          return box('mband',x,y,w,h,ln,`font-size:calc(var(--mh,200px)*${(h/100/kk*0.72).toFixed(4)})`);}
        default:return '';
      }
    }).join('');
    return `<div class="cam-mock real" aria-hidden="true">${parts}</div>`;
  }
  // Cámara real del dispositivo (requiere HTTPS o localhost). Si no hay permiso o dispositivo, se mantiene la simulación.
  let camStream=null;
  function stopCam(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null;}}
  async function startCam(){
    const st=dialog.querySelector('.stage.cam'),v=st?.querySelector('.cam-video');if(!v)return;
    const fail=msg=>{st.classList.add('no-video');if(!dialog.querySelector('.cam-note'))st.insertAdjacentHTML('afterend',`<p class="hint cam-note">${msg}</p>`);};
    if(!window.isSecureContext||!navigator.mediaDevices?.getUserMedia)return fail('Simulación: esta página no puede abrir la cámara (hace falta HTTPS).');
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});
      if(!st.isConnected||!dialog.open){stream.getTracks().forEach(t=>t.stop());return;}   // la persona ya salió de este paso
      stopCam();camStream=stream;v.srcObject=stream;
      const show=()=>{if(!st.isConnected||st.classList.contains('has-video'))return;st.classList.add('has-video');
        const cap=dialog.querySelector('[data-action="capture"]');if(cap)cap.textContent='Hacer foto';};
      v.addEventListener('loadeddata',show,{once:true});
      v.play().then(show).catch(()=>{});
      setTimeout(show,1500);   // por si el navegador tarda en avisar
    }catch(e){
      fail(e&&e.name==='NotAllowedError'?'Simulación: has bloqueado el acceso a la cámara.':'Simulación: no hemos encontrado una cámara disponible.');
    }
  }
  function containRect(st,pad,ratio){
    const b=st.getBoundingClientRect(),W=b.width-2*pad,H=b.height-2*pad;let w=W,h=W/ratio;if(h>H){h=H;w=H*ratio;}
    return {left:b.left+(b.width-w)/2,top:b.top+(b.height-h)/2,width:w,height:h};
  }
  // Transición paso 2 → cámara: el documento vuela hasta el visor y la cámara se abre en iris desde él
  function layoutCam(from){
    const st=dialog.querySelector('.stage.cam');if(!st)return;
    const card=st.querySelector('.cam-card'),frame=st.querySelector('.cam-frame'),img=st.querySelector('.cam-card img');
    const run=()=>{
      const sb=st.getBoundingClientRect(),r2=containRect(st,40,from?.ratio||img.naturalWidth/img.naturalHeight);
      const L=r2.left-sb.left,T=r2.top-sb.top;
      Object.assign(card.style,{left:L+'px',top:T+'px',width:r2.width+'px',height:r2.height+'px'});
      Object.assign(frame.style,{left:(L-10)+'px',top:(T-10)+'px',width:(r2.width+20)+'px',height:(r2.height+20)+'px'});
      st.style.setProperty('--mw',r2.width+'px');st.style.setProperty('--mh',r2.height+'px');st.style.setProperty('--ix',(L+r2.width/2)+'px');st.style.setProperty('--iy',(T+r2.height/2)+'px');
      const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(from&&!still){
        const sc=from.width/r2.width;
        card.style.transformOrigin='0 0';card.style.transition='none';
        card.style.transform=`translate(${from.left-r2.left}px,${from.top-r2.top}px) scale(${sc})`;
        card.getBoundingClientRect();
        card.style.transition='transform .8s cubic-bezier(.22,.8,.2,1)';card.style.transform='none';st.classList.add('live');
      }else st.classList.add('live',still?'still':'soft');
    };
    from?.ratio||(img.complete&&img.naturalWidth)?run():img.addEventListener('load',run,{once:true});
  }
  const FLIP_DELAY=.85,FLIP_DUR=.9;
  function fitFx(){
    const st=dialog.querySelector('.stage'),fx=st?.querySelector('.fx-wrap');if(!fx)return;
    const img=st.querySelector('.face.turned img')||st.querySelector('img');
    const tilt=st.querySelector('.tilt');if(tilt)['--bd','--ud','--po','--pt','--cr','--pdur'].forEach(p=>tilt.style.setProperty(p,fx.style.getPropertyValue(p)));
    const place=()=>{const pad=12,W=st.clientWidth-2*pad,H=st.clientHeight-2*pad,r=img.naturalWidth/img.naturalHeight;let w=W,h=W/r;if(h>H){h=H;w=H*r;}
      Object.assign(fx.style,{left:(st.clientWidth-w)/2+'px',top:(st.clientHeight-h)/2+'px',width:w+'px',height:h+'px'});
      const ps=st.querySelector('.pass-stage');if(ps&&tilt){const Hb=ps.clientHeight;tilt.style.setProperty('--ps',(w/Hb).toFixed(4));}};
    img.complete&&img.naturalWidth?place():img.addEventListener('load',place,{once:true});
  }
  window.addEventListener('resize',()=>{if(dialog.open)fitFx();});
  // Paso 2 · cómo preparar el documento
  function prepare(){
    const d=currentDoc();if(!d)return guide();docType=d.formType;
    const flipEnd=FLIP_DELAY+FLIP_DUR;
    const isPass=d.formType==='passport';
    const TURN_AT=.85,OPEN_AT=FLIP_DELAY,OPEN_DUR=1.5; // el pasaporte se abre más despacio que el giro del ID // pasaporte: aparece cerrado en horizontal, pausa y la tapa se abre por el lomo
    const BAD=isPass?OPEN_AT+OPEN_DUR/2:FLIP_DELAY+FLIP_DUR/2; // mano, brillo e inclinación entran justo cuando el documento está a medio girar
    const endOpen=isPass?OPEN_AT+OPEN_DUR:flipEnd;
    const GAP=1.45; // tiempo entre pasos
    const T={side:endOpen,place:endOpen+GAP,lines:endOpen+2*GAP,glare:endOpen+3*GAP};
    const tips=[['side',isPass?'Ábrelo por la página de la foto':d.side==='back'?'Muéstralo por la parte de atrás':'Muéstralo por la cara de la foto'],['place','Ponlo plano sobre un fondo liso'],['lines','Líneas de abajo enteras'],['glare','Sin reflejos ni dedos']];
    const hand=`<img class="hand hand-img" src="assets/hand.webp" alt="">`;
    const fx=`<div class="fx-wrap" style="--bd:${BAD}s;--ud:${(T.place-.7).toFixed(2)}s;--hd:${(T.lines-.55).toFixed(2)}s;--tp:${T.place}s;--ts:${T.side}s;--po:${OPEN_AT}s;--pt:${TURN_AT}s;--pdur:${OPEN_DUR}s;--cr:.75;--tl:${T.lines}s;--tg:${T.glare}s;--mt:${d.formType==='passport'?76:58}%;--mh:${d.formType==='passport'?20:36}%"><div class="fx">${isPass?'<i class="pshadow"></i>':''}<i class="ring r1"></i>${T.side?'<i class="ring r2"></i>':''}<i class="mrz-glow"></i><i class="glare"></i><i class="glint"></i></div><div class="hand-box">${hand}</div></div>`;
    body(`Prepara tu ${d.formType==='passport'?'pasaporte':'documento'}`,`<p class="hint"><span class="pill-doc">${esc(documentCatalog[issuingCountry].name)} · ${esc(d.label)}</span> <button class="text-button" data-action="choose">Cambiar</button></p>${stageHtml(d,false,true,fx)}<ul class="tips big">${tips.map(([k,t])=>`<li style="--t:${T[k]}s"><span class="mk" aria-hidden="true"><b class="x">✕</b><b class="ok">✓</b></span>${t}</li>`).join('')}</ul><div class="dialog-actions"><button class="primary" data-action="camera">Hacer la foto <span aria-hidden="true">→</span></button><button class="secondary" data-action="gallery">Elegir de galería</button><button class="text-button" data-action="choose">Atrás</button></div>`,stepsHtml(2),true);
    fitFx();
  }
  function body(title,content,label='PREPARA TU DOCUMENTO',tall=false){
    stopCam();
    dialog.classList.toggle('tall',tall);
    $('dialog-context').textContent='Autorrellenar con una foto';
    $('dialog-content').innerHTML=`<div class="dialog-body">${label.startsWith('<ol')?label:`<div class="step-label">${label}</div>`}<h2 id="dialog-title" tabindex="-1">${title}</h2>${content}</div>`;
    if(dialog.open)$('dialog-title').focus();
  }
  function closeScan(){token++;stopCam();dialog.close();$('start-scan').focus();}
  function exitToForm(){closeScan();note('Escaneo cerrado. Lo que ya habías escrito sigue en el formulario.','neutral');$('firstName').focus();}
  function camera(fromRect){
    if(['denied','desktop'].includes(profile.scenario)){
      body(profile.scenario==='denied'?'La cámara no tiene permiso':'No hay una cámara disponible',`<p>${profile.scenario==='denied'?'Puedes permitir el acceso desde los ajustes de tu navegador o elegir una foto del documento.':'Puedes usar una imagen del documento que ya tengas.'}</p><div class="notice warning">Estado simulado. No hemos solicitado acceso real a tu cámara.</div><div class="dialog-actions"><button class="primary" data-action="gallery">Elegir de galería</button><button class="secondary" data-action="exit">Volver al formulario</button><button class="text-button" data-action="intro">Volver a la guía</button></div>`);return;
    }
    const d=currentDoc();
    const camStage=`<div class="stage cam m-enfoque"><div class="cam-bg"></div><video class="cam-video" muted playsinline autoplay></video><div class="cam-scrim"></div><div class="cam-card"><div class="cam-float"><img src="${d.image}" alt="${esc(d.alt)}">${mockHtml(d)}<i class="scan"></i></div></div><div class="cam-frame"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i></div><div class="cam-chip"><span>Alinea tu documento con la guía</span></div></div>`;
    body(d.side==='back'?'Coloca el reverso en el marco':d.side==='front'?'Coloca el anverso en el marco':'Encuadra la página de la foto',`${camStage}<div class="dialog-actions"><button class="primary" data-action="capture">Simular captura</button><button class="secondary" data-action="intro">Volver</button></div>`,stepsHtml(3),true);
    dialog.querySelector('.dialog-body').classList.add('noslide');
    announce('Cámara abierta.');layoutCam(fromRect);startCam();
  }

  const errorMessages={
    glare:['Un reflejo tapa las líneas','Inclina ligeramente el documento o cambia de luz. Evita que el brillo tape las letras.'],
    blur:['Las líneas no se ven nítidas','Apoya el documento, limpia la lente y espera a que enfoque antes de tomar la foto.'],
    'wrong-side':['No vemos las líneas de lectura','Busca la cara con dos o tres líneas de letras, números y signos <.'],
    cropped:['Falta un extremo de las líneas','Aleja un poco el documento. Las líneas deben verse de principio a fin.'],
    multiple:['Hay más de un documento en la foto','Deja un solo documento en la imagen para evitar mezclar sus datos.'],
    dark:['Necesitamos un poco más de luz','Acerca el documento a una luz uniforme. Evita que tu móvil haga sombra sobre las líneas.'],
    'no-mrz':['No encontramos líneas que podamos leer','Si tu documento no tiene estas líneas, puedes volver al formulario y escribir los datos. Esto no significa que tu documento sea inválido.'],
    offline:['Se ha interrumpido la conexión','No hace falta repetir la foto. Puedes intentar leer la misma imagen de nuevo o cancelar.'],
    timeout:['La lectura está tardando demasiado','Puedes reintentar leer la misma foto o cancelar. Lo que ya escribiste sigue en el formulario.']
  };
  function errorScreen(kind){
    const d=resolveDocument(issuingCountry,documentKey);
    const [title,message]=kind==='wrong-side'&&d?[d.title,d.instruction]:errorMessages[kind];const manualFirst=attempts>=2||kind==='no-mrz';const service=['offline','timeout'].includes(kind);
    body(title,`<p>${esc(message)}</p>${attempts>=2?'<div class="notice warning">Ya lo has intentado dos veces. Puedes volver al formulario sin perder lo escrito.</div>':''}<div class="dialog-actions">${manualFirst?'<button class="primary" data-action="exit">Volver al formulario</button>':''}${kind!=='no-mrz'?`<button class="${manualFirst?'secondary':'primary'}" data-action="${service?'retry-read':'retry-photo'}">${service?'Reintentar lectura':'Hacer otra foto'}</button>`:''}${!manualFirst?'<button class="secondary" data-action="exit">Cancelar escaneo</button>':''}<button class="text-button" data-action="intro">Ver la guía</button></div>${kind!=='no-mrz'?`<div class="sim-control"><span>Control de prueba</span><button class="text-button" data-action="recover">${service?'Simular servicio recuperado':'Simular una foto corregida'} →</button></div>`:''}`,'NO HEMOS PODIDO COMPLETAR LA LECTURA');
  }
  function sample(){
    let data={...resolveDocument(issuingCountry,documentKey).sample};
    if(profile.scenario==='names')data={...data,firstName:'AMINA',surname:'EL AMRANI'};
    if(profile.scenario==='partial')data={...data,firstName:'WEI',surname:'ZHANG',nationality:'China',documentNumber:''};
    if(profile.scenario==='conflict')data={...data,firstName:'DIEGO ALBERTO',surname:'GARCIA LOPEZ'};
    return data;
  }
  function read(){
    attempts++;const request=++token;
    body('Estamos leyendo las líneas',`<p>Cuando estén listas, rellenaremos los campos del formulario.</p><div class="loading" aria-hidden="true"></div><p role="status">Lectura simulada en curso…</p><div class="dialog-actions"><button class="secondary" data-action="exit">Cancelar lectura</button></div>`,'LEYENDO TU FOTO');
    announce('Lectura de la foto en curso.');
    setTimeout(()=>{
      if(request!==token||!dialog.open)return;
      const kind=profile.scenario;
      if(errorMessages[kind]&&!correctedPhoto)return errorScreen(kind);
      readData=sample();partialFixed=false;
      if(kind==='partial')return partialReview();
      if(conflictsFor(form,readData).length)return conflictReview();
      applyResult();
    },profile.scenario==='timeout'?1700:750);
  }
  function partialReview(){
    body('Solo falta un dato por leer',`<p>Hemos leído el resto de los datos, pero no distinguimos un carácter del número de documento.</p><div class="notice warning">No vamos a adivinarlo. Escríbelo tal como aparece en el documento o vuelve a hacer la foto.</div><div class="field"><label for="uncertain-number">Número de documento</label><input id="uncertain-number" autocomplete="off" spellcheck="false" aria-describedby="uncertain-hint"><small id="uncertain-hint">En este ejemplo puedes escribir DEMO12345.</small><small id="uncertain-error" class="field-error" hidden></small></div><div class="dialog-actions"><button class="primary" data-action="resolve">Usar este número y rellenar</button><button class="secondary" data-action="retry-photo">Hacer otra foto</button><button class="text-button" data-action="exit">Cancelar sin aplicar</button></div>`,'LECTURA PARCIAL');
  }
  function conflictReview(){
    const conflicts=conflictsFor(form,readData);
    body('Ya habías escrito algunos datos',`<p>Hay diferencias con la foto. Conservaremos lo que escribiste, salvo que elijas sustituirlo.</p><div class="notice warning">Comprueba que has fotografiado el documento correcto.</div><div class="review-grid">${conflicts.map(key=>`<div class="field"><label for="accept-${key}">${esc(fieldLabels[key])}</label><p class="current-value">Actual: <b>${esc(form[key])}</b><br>Leído: <b>${esc(readData[key])}</b></p><label class="check conflict-choice"><input id="accept-${key}" type="checkbox" data-accept="${key}"> Usar el dato de la foto</label></div>`).join('')}</div><p class="small-note">Los campos vacíos se rellenarán con los datos leídos.</p><div class="dialog-actions"><button class="primary" data-action="apply-conflicts">Rellenar el formulario</button><button class="secondary" data-action="intro">Usar otro documento</button><button class="text-button" data-action="exit">Cancelar sin aplicar</button></div>`,'ANTES DE SUSTITUIR DATOS');
  }
  function applyResult(accept={}){
    const before={...form};form=mergeRead(form,readData,accept);
    // The choice describes the photographed document, but existing populated type is preserved on conflicts.
    if(!before.documentNumber||accept.documentNumber)form.documentType=docType;
    if(partialFixed)form.sources.documentNumber='user_corrected';
    const updated=scanKeys.filter(key=>form[key]!==before[key]);closeScan();renderForm();
    const extra=profile.scenario==='names'?' El nombre conserva la escritura que aparece en las líneas del documento.':'';
    note(`${partialFixed?'Lectura completada con tu corrección.':'Documento leído.'} ${updated.length?`${updated.length} campos rellenados`:'Los datos ya estaban en el formulario'}.${extra}`);
    $('form-notice').setAttribute('tabindex','-1');$('form-notice').focus();$('form-notice').scrollIntoView({block:'center',behavior:'auto'});announce('Autorrellenado completado. Los datos leídos están en el formulario.');
  }
  $('profile-select').innerHTML=profiles.map(p=>`<option value="${p.id}">${String(p.id).padStart(2,'0')} · ${esc(p.name)} — ${esc(p.context.split(' · ')[0])}</option>`).join('');
  $('profile-list').innerHTML=profiles.map(p=>`<article class="profile-card"><h2><span class="profile-number">${String(p.id).padStart(2,'0')}</span>${esc(p.name)}</h2><p class="context">${esc(p.context)}</p><dl><dt>Ronda 1 · Qué espera</dt><dd>${esc(p.expectation)}</dd><dt>Fricción prevista</dt><dd>${esc(p.risk)}</dd><dt>Ronda 2 · Feedback simulado sobre V1</dt><dd>«${esc(p.feedback)}»</dd><dt>Cambio en V2</dt><dd>${esc(p.decision)}</dd><dt>Qué falta validar</dt><dd>${esc(p.residual)}</dd></dl><button class="secondary" data-profile="${p.id}">Probar este caso →</button></article>`).join('');
  function showStudy(show){$('study').hidden=!show;$('prototype').hidden=show;$('study-toggle').textContent=show?'Volver al prototipo ↗':'Estudio de 20 perfiles ↗';window.scrollTo({top:0,behavior:'auto'});}
  $('study-toggle').onclick=()=>showStudy($('study').hidden);
  $('profile-list').onclick=e=>{const button=e.target.closest('[data-profile]');if(button){profile=profiles.find(p=>p.id===Number(button.dataset.profile));reset();showStudy(false);}};
  $('profile-select').onchange=e=>{profile=profiles.find(p=>p.id===Number(e.target.value));reset();};$('reset').onclick=reset;
  $('guest-form').addEventListener('input',e=>{if(fieldLabels[e.target.id]){form.sources[e.target.id]='manual';e.target.classList.remove('read');e.target.parentElement.querySelector('.read-origin')?.remove();}remember();});
  $('guest-form').onsubmit=e=>e.preventDefault();
  $('start-scan').onclick=()=>{remember();attempts=0;correctedPhoto=false;partialFixed=false;docType=form.documentType;guide();dialog.showModal();$('dialog-title').focus();};
  $('manual').onclick=()=>{$('firstName').focus();};$('close-dialog').onclick=closeScan;
  dialog.addEventListener('cancel',()=>{token++;});
  dialog.addEventListener('close',()=>{token++;stopCam();});
  $('dialog-content').onclick=e=>{
    const el=e.target.closest('[data-action]');if(!el)return;const action=el.dataset.action;
    if(action==='choose')guide();
    if(action==='prepare'||action==='intro')prepare();
    if(action==='pick-type'){documentKey=el.dataset.key;guide();dialog.querySelector('.type-option.on')?.focus();}
    if(action==='camera'||action==='retry-photo'){
      const st=dialog.querySelector('.stage'),im=st&&(st.querySelector('.face.turned img')||st.querySelector('img'));
      camera(action==='camera'&&st&&st.querySelector('.fx-wrap')&&im&&im.naturalWidth?{...containRect(st,12,im.naturalWidth/im.naturalHeight),ratio:im.naturalWidth/im.naturalHeight}:null);
    }
    if(['gallery','capture','retry-read'].includes(action))read();
    if(action==='exit')exitToForm();
    if(action==='no-lines')body('Comprueba el país y el modelo',`<p>Puede que tengas otra versión. Revisa tu selección para ver las indicaciones que correspondan a tu documento.</p><div class="dialog-actions"><button class="primary" data-action="choose">Cambiar país o documento</button><button class="secondary" data-action="exit">Volver al formulario</button></div>`);
    if(action==='recover'){correctedPhoto=true;read();}
    if(action==='apply-conflicts'){const accept={};document.querySelectorAll('[data-accept]').forEach(el=>{accept[el.dataset.accept]=el.checked;});applyResult(accept);}
    if(action==='resolve'){
      const number=$('uncertain-number').value.trim();
      if(!number){$('uncertain-error').hidden=false;$('uncertain-error').textContent='Escribe el número tal como aparece en tu documento.';$('uncertain-number').setAttribute('aria-invalid','true');$('uncertain-number').setAttribute('aria-describedby','uncertain-error');$('uncertain-number').focus();return;}
      readData.documentNumber=number;partialFixed=true;if(conflictsFor(form,readData).length)conflictReview();else applyResult();
    }
  };
  $('dialog-content').addEventListener('change',e=>{
    if(e.target.id==='issuing-country'){
      issuingCountry=e.target.value;documentKey='';
      const keys=Object.keys(documentCatalog[issuingCountry]?.documents||{});documentKey=keys.includes('id')?'id':(keys[0]||'');   // por defecto el documento de identidad; si el país no lo tiene, el pasaporte
      guide();$('issuing-country').focus();return;
    }
  });
  reset();
}
