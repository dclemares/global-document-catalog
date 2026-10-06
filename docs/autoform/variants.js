/* Hand-maintained on top of documents.js (which is generated): older models of a document whose reading lines are on another side,
   and residence permits that foreign guests can use in the property's country. Loaded after documents.js and layouts.js. */
(function(){
  const FRONT_MRZ_IMAGE='assets/catalog/generic-id-front-mrz.webp';
  const GENERIC_NOTE='Illustrative example: we do not have an image of this model and yours may look different. Look for the lines of letters, numbers and “<”.';
  const GENERIC_CREDIT='Generic catalog example · not your country’s design · fictitious data';
  const sample=nationality=>({firstName:'ALEX',surname:'DEMO SAMPLE',nationality,birthDate:'1985-03-14',documentNumber:'DEMO12345',expiryDate:'2031-01-01'});

  if(typeof documentLayouts!=='undefined')documentLayouts['generic-id-front-mrz']=[['photo',3.5,19,33,52],['text',39,24,25,12,2],['text',39,49,20,12,2],['text',58,49,20,12,2],['text',76,9,20,6,1],['mrz',4,73,92,24,2]];

  // Older model with the reading lines on the front (two lines of 36 characters, below the photo)
  const frontMrzModel=(code,label,hint)=>{
    const country=documentCatalog[code].name;
    return {label,hint,formType:'id',side:'front',sideLabel:'Front · photo side',title:'Photograph the photo side of your ID card',
      instruction:'On this model the reading lines are on the front, below the photo. The back isn\'t needed.',
      image:FRONT_MRZ_IMAGE,alt:`Example of an older ID card from ${country}, front`,mrz:[4,73,92,24],approx:true,lines:2,source:'',
      credit:GENERIC_CREDIT,sample:sample(country),generic:true,note:GENERIC_NOTE};
  };
  const models={
    FR:{id:{label:'ID card · since 2021',hint:'Bank-card size. Lines on the back.'},
        'id-paper':frontMrzModel('FR','ID card · before 2021','Laminated paper card. Lines on the front.')},
    RO:{id:{label:'ID card · electronic',hint:'With a chip. Lines on the back.'},
        'id-classic':frontMrzModel('RO','ID card · classic','Without a chip. Lines on the front.')},
    AE:{id:{label:'Emirates ID'}},
  };
  for(const [code,docs] of Object.entries(models)){
    const target=documentCatalog[code]?.documents;if(!target)continue;
    const ordered={};
    for(const [key,doc] of Object.entries(docs)){ordered[key]=target[key]?{...target[key],...doc}:doc;}
    for(const [key,doc] of Object.entries(target))if(!ordered[key])ordered[key]=doc;
    documentCatalog[code].documents=ordered;
  }

  // Residence permits: issued by the property's country to foreign residents. Same card format as an ID (lines on the back).
  const EU_PERMIT='Residence permit';
  const permitLabels={ES:['Residence card (TIE / NIE)','Foreigner identity card with your NIE.'],IT:['Residence permit (Permesso di soggiorno)'],
    PT:['Residence permit (Título de residência)'],FR:['Residence permit (Titre de séjour)'],DE:['Residence permit (Aufenthaltstitel)'],
    AE:['Emirates ID (resident)','The ID card for UAE residents.']};
  const permitCountries=['AE','AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','CH'];
  const freeMovement=new Set(permitCountries.filter(code=>code!=='AE'));   // EU, EEA and Switzerland: their citizens register without a residence card
  const residencePermit=(code,nationality)=>{
    const c=documentCatalog[code];if(!c||!permitCountries.includes(code))return null;
    if(freeMovement.has(code)&&freeMovement.has(nationality))return null;
    const [label,hint=`Issued by ${c.name} to foreign residents. Lines on the back.`]=permitLabels[code]||[EU_PERMIT];
    const own=code==='AE'&&c.documents.id;   // the Emirates ID is the same card for citizens and residents
    return {label,hint,formType:'id',side:'back',sideLabel:'Back · reverse side',title:'Photograph the back of your residence card',
      instruction:'Turn it over. The reading lines are at the bottom of the back.',
      image:own?own.image:'assets/catalog/generic-id-back.webp',imageOther:own?own.imageOther:'assets/catalog/generic-id-front.webp',
      alt:`Example residence card from ${c.name}, back`,mrz:[4,62,92,28],approx:true,lines:3,source:own?own.source:'',
      credit:own?own.credit:GENERIC_CREDIT,sample:sample(c.name),generic:!own,note:own?undefined:GENERIC_NOTE,issuer:code};
  };

  // Documents the guest can choose from: their nationality's own, plus the property country's residence permit for foreigners
  function documentsFor(nationality,propertyCountry){
    const own=Object.entries(documentCatalog[nationality]?.documents||{}).map(([key,doc])=>[key,{...doc,issuer:nationality}]);
    const permit=nationality&&propertyCountry&&propertyCountry!==nationality?residencePermit(propertyCountry,nationality):null;
    return permit?[...own,[`permit-${propertyCountry}`,permit]]:own;
  }
  window.documentsFor=documentsFor;
  window.resolveDocument=(nationality,key,propertyCountry)=>documentsFor(nationality,propertyCountry).find(([k])=>k===key)?.[1]??null;
})();
