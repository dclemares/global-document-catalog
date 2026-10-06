/* Hand-maintained on top of documents.js (which is generated): older models of a document whose reading lines are on another side,
   and residence permits that foreign guests can use in the property's country. Loaded after documents.js and layouts.js. */
(function(){
  const FRONT_MRZ_IMAGE='assets/catalog/generic-id-front-mrz.webp';
  const GENERIC_NOTE='Illustrative example: we do not have an image of this model and yours may look different. Look for the lines of letters, numbers and “<”.';
  const OWN_CREDIT='Demo drawn from the PRADO reference · fictitious data · NOT VALID · DEMO';
  const GENERIC_CREDIT='Generic catalog example · not your country’s design · fictitious data';
  const sample=nationality=>({firstName:'ALEX',surname:'DEMO SAMPLE',nationality,birthDate:'1985-03-14',documentNumber:'DEMO12345',expiryDate:'2031-01-01'});

  if(typeof documentLayouts!=='undefined')Object.assign(documentLayouts,{
    'generic-id-front-mrz':[['photo',3.5,19,33,52],['text',39,24,25,12,2],['text',39,49,20,12,2],['text',58,49,20,12,2],['text',76,9,20,6,1],['mrz',4,73,92,24,2]],
    'FR-id-paper-front':[['text',3,14,52,4,1],['photo',2.8,19,26.2,52.8],['text',33,20,30,35,5],['sign',48,59,28,8],['mrz',4.4,77,91,19,2]],
    'ES-tie-back':[['photo',3.4,6.3,12,24.7],['text',18.6,5,40,49,7],['mrz',4,64,92,30.1,3]],
    'PT-titulo-back':[['photo',3.4,6.3,12,24.7],['text',18.6,5,45,44,6],['mrz',4,64,92,30.1,3]],
    'IT-permesso-back':[['photo',3.4,6.3,12,24.7],['text',18.6,5,45,44,6],['mrz',4,64,92,30.1,3]],
    'RO-id-classic-front':[['text',29,12,40,8,2],['photo',2,12,25.8,50.4],['text',29,21,25,50,7],['ghost',85.8,19,11.2,21.9],['mrz',4,75.8,92,19.3,2]],
  });

  // Older model with the reading lines on the front (two lines of 36 characters, below the photo)
  const frontMrzModel=(code,label,hint,source='',own=null)=>{
    const country=documentCatalog[code].name;
    return {label,hint,formType:'id',side:'front',sideLabel:'Front · photo side',title:'Photograph the photo side of your ID card',
      instruction:'On this model the reading lines are on the front, below the photo. The back isn\'t needed.',
      image:own?.image||FRONT_MRZ_IMAGE,alt:`Example of an older ID card from ${country}, front`,mrz:own?.mrz||[4,73,92,24],approx:true,lines:2,source,
      credit:own?OWN_CREDIT:GENERIC_CREDIT,sample:sample(country),generic:!own,note:own?undefined:GENERIC_NOTE};
  };
  const models={
    // PRADO FRA-BO-03001 (since 2021, lines on the back) and FRA-BO-02001/02002 (laminated, 1988-2021, lines on the front)
    FR:{id:{label:'ID card · since 2021',hint:'Bank-card size. Lines on the back.'},
        'id-paper':frontMrzModel('FR','ID card · before 2021','Laminated paper card. Lines on the front.',
          'https://www.consilium.europa.eu/prado/en/prado-documents/FRA/B/docs-per-category.html',
          {image:'assets/catalog/FR-id-paper-front.webp',mrz:[4,75,92,22]})},
    // PRADO ROU-BO-05001/05002/06001 (since 2021, with or without chip) and ROU-BO-01002 to 04001 (classic, 2001-2021, blank back)
    RO:{id:{label:'ID card · since 2021',hint:'Bank-card size with the flag. Lines on the back.'},
        'id-classic':frontMrzModel('RO','ID card · before 2021','Classic card. Lines on the front, under the photo.',
          'https://www.consilium.europa.eu/prado/en/prado-documents/ROU/B/docs-per-category.html',
          {image:'assets/catalog/RO-id-classic-front.webp',mrz:[3,74,94,23]})},
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
  const permitLabels={ES:['Residence card (TIE / NIE)','Foreigner identity card (TIE) with your NIE. Lines on the back.'],IT:['Residence permit (Permesso di soggiorno)','Plastic card. Lines on the back.'],
    PT:['Residence permit (Título de residência)','Plastic card. Lines on the back.'],
    AE:['Emirates ID (resident)','The ID card for UAE residents.']};
  // Only countries whose permit we checked against PRADO and drew; everywhere else the guest gets their ID and passport
  const permitCountries=['AE','ES','IT','PT'];
  const freeMovement=new Set(['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','CH']);   // EU, EEA and Switzerland: their citizens register without a residence card
  // PRADO ESP-HO-03001 (2020); the 2003 and 2011 models (ESP-HO-02001 to 02005) also have the three lines on the back
  const ownPermits={ES:{image:'assets/catalog/ES-tie-back.webp',imageOther:'assets/catalog/ES-tie-front.webp',mrz:[4,64,92,30],
    source:'https://www.consilium.europa.eu/prado/en/prado-documents/ESP/H/docs-per-category.html',credit:OWN_CREDIT},
    // PRADO ITA-HO-03008 (2021); the 2007 and 2013 cards (ITA-HO-03001/03003/03005/03006, ITA-HP-03001) also have the lines on the back
    IT:{image:'assets/catalog/IT-permesso-back.webp',imageOther:'assets/catalog/IT-permesso-front.webp',mrz:[4,64,92,30],
    source:'https://www.consilium.europa.eu/prado/en/prado-documents/ITA/H/docs-per-category.html',credit:OWN_CREDIT},
    // PRADO PRT-HO-08001 (2020); the 2008 card (PRT-HO-02001) also has the lines on the back
    PT:{image:'assets/catalog/PT-titulo-back.webp',imageOther:'assets/catalog/PT-titulo-front.webp',mrz:[4,64,92,30],
    source:'https://www.consilium.europa.eu/prado/en/prado-documents/PRT/H/docs-per-category.html',credit:OWN_CREDIT}};
  const residencePermit=(code,nationality)=>{
    const c=documentCatalog[code];if(!c||!permitCountries.includes(code))return null;
    if(freeMovement.has(code)&&freeMovement.has(nationality))return null;
    const [label,hint=`Issued by ${c.name} to foreign residents. Lines on the back.`]=permitLabels[code]||[EU_PERMIT];
    const own=code==='AE'?c.documents.id:ownPermits[code];   // the Emirates ID is the same card for citizens and residents
    return {label,hint,formType:'id',side:'back',sideLabel:'Back · reverse side',title:'Photograph the back of your residence card',
      instruction:'Turn it over. The reading lines are at the bottom of the back.',
      image:own?own.image:'assets/catalog/generic-id-back.webp',imageOther:own?own.imageOther:'assets/catalog/generic-id-front.webp',
      alt:`Example residence card from ${c.name}, back`,mrz:own?.mrz||[4,62,92,28],approx:true,lines:3,source:own?own.source:'',
      credit:own?own.credit:GENERIC_CREDIT,sample:sample(c.name),generic:!own,note:own?undefined:GENERIC_NOTE,issuer:code};
  };

  // Documents the guest can choose from: their nationality's own, plus the property country's residence permit for foreigners
  function documentsFor(nationality,propertyCountry){
    const own=Object.entries(documentCatalog[nationality]?.documents||{}).map(([key,doc])=>[key,{...doc,issuer:nationality}]);
    const permit=nationality&&propertyCountry&&propertyCountry!==nationality?residencePermit(propertyCountry,nationality):null;
    return permit?[...own,[`permit-${propertyCountry}`,permit]]:own;
  }
  // Documents guests may hold that have no reading lines, so they can't fill the form (driving licences everywhere, plus a few local ones)
  // Only documents still in use: ID cards without an MRZ stopped being valid on 3 August 2026 (Regulation (EU) 2019/1157)
  const noLinesByNationality={RO:['provisional ID card']};
  function withoutLinesFor(nationality,propertyCountry){
    if(!nationality)return [];
    const list=['driving licence',...(noLinesByNationality[nationality]||[])];
    if(propertyCountry==='ES'&&nationality!=='ES'&&freeMovement.has(nationality))list.push('green EU registration certificate (NIE)');
    if(propertyCountry==='IT'&&nationality!=='IT'&&!freeMovement.has(nationality))list.push('paper residence permit');
    return list;
  }
  window.documentsFor=documentsFor;
  window.withoutLinesFor=withoutLinesFor;
  window.resolveDocument=(nationality,key,propertyCountry)=>documentsFor(nationality,propertyCountry).find(([k])=>k===key)?.[1]??null;
})();
