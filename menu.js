const SOC=[["telegram","Telegram","TG","#229ED9"],["whatsapp","WhatsApp","WA","#1FA855"],["max","Max","M","#7B5CFF"],["vk","ВКонтакте","VK","#0077FF"],["instagram","Instagram","IG","#D6275F"],["ok","Одноклассники","OK","#D9660A"],["tiktok","TikTok","TT","#111111"],["like","Лайк","L","#E0264C"]];
const THEMES=[["cream","Светлый"],["forest","Изумруд"],["wine","Бордо"],["noir","Чёрный с жёлтым"]];
const DEFAULT={theme:"forest",name:"Новое заведение",tagline:"Спасибо, что выбрали нас",logo:"",gift:"",booking:"",tips:"",wifiName:"",wifiPass:"",site:"",links:{telegram:"",whatsapp:"",max:"",vk:"",instagram:"",ok:"",tiktok:"",like:""},yandex:"",gis:""};
const $=(t,a={},...k)=>{const e=document.createElement(t);for(const[n,v]of Object.entries(a)){if(n==="class")e.className=v;else if(n.startsWith("on"))e.addEventListener(n.slice(2),v);else e.setAttribute(n,v)}e.append(...k.filter(x=>x!=null&&x!==false));return e};
const safe=u=>/^(https?:\/\/|tel:)\S+$/i.test((u||"").trim())?u.trim():"";
const ch=()=>$("span",{class:"ch","aria-hidden":"true"},"›");
const link=(h,...k)=>$("a",{class:"row",href:h,target:"_blank",rel:"noopener noreferrer"},...k);
const tile=(t,c)=>$("span",{class:"tile",style:"background:"+c},t);
async function copy(t){try{await navigator.clipboard.writeText(t);return true}catch(e){try{const a=$("textarea");a.value=t;document.body.append(a);a.select();const ok=document.execCommand("copy");a.remove();return ok}catch(e2){return false}}}

function buildRating(C){
  const after=$("div",{class:"after"});
  const btns=[1,2,3,4,5].map(n=>$("button",{class:"star",type:"button","aria-label":"Оценка "+n+" из 5",onclick:()=>pick(n)},"★"));
  function pick(n){
    btns.forEach((b,i)=>b.classList.toggle("on",i<n));
    const ys=safe(C.yandex),gs=safe(C.gis),items=[$("p",{},n>=4?"Спасибо! Нам очень приятно.":"Спасибо за оценку! Расскажите, как нам стать лучше.")];
    if(ys||gs)items.push($("p",{},"Оставьте отзыв там, где вам удобнее:"));
    if(ys)items.push(link(ys,"Яндекс Карты",ch()));
    if(gs)items.push(link(gs,"2ГИС",ch()));
    after.replaceChildren(...items);
  }
  return $("section",{class:"card rate"},$("h2",{},"Оцените визит"),$("p",{},"Нажмите на звезду — это займёт секунду"),$("div",{class:"stars",role:"group","aria-label":"Оценка"},...btns),after);
}

function buildMenu(C){
  const L=C.links||{},m=$("main",{class:"wrap"});
  m.append($("div",{class:"head"},$("div",{class:"logo","aria-hidden":"true"},(C.logo||C.name||"?").trim().slice(0,2)),$("h1",{},C.name||""),C.tagline?$("p",{class:"tag"},C.tagline):null));
  if(C.gift)m.append($("div",{class:"gift"},$("b",{"aria-hidden":"true"},"🎁"),$("span",{},C.gift)));
  const big=[];
  if(safe(C.booking))big.push($("a",{class:"card big",href:safe(C.booking),target:"_blank",rel:"noopener noreferrer"},$("i",{"aria-hidden":"true"},"📅"),"Записаться"));
  if(safe(C.tips))big.push($("a",{class:"card big",href:safe(C.tips),target:"_blank",rel:"noopener noreferrer"},$("i",{"aria-hidden":"true"},"💛"),"Чаевые"));
  if(big.length)m.append($("div",{class:"grid"},...big));
  if(C.wifiName){
    const sub=$("small",{},C.wifiPass?"Нажмите, чтобы скопировать пароль":"Открытая сеть");
    m.append($("button",{class:"row",type:"button",onclick:async()=>{if(!C.wifiPass)return;sub.textContent=(await copy(C.wifiPass))?"Пароль скопирован ✓":"Пароль: "+C.wifiPass}},tile("Wi-Fi","#4B5563"),$("span",{class:"t"},"Подключиться к Wi-Fi: "+C.wifiName,sub)));
  }
  if(safe(C.site))m.append(link(safe(C.site),tile("WWW","#4B5563"),$("span",{class:"t"},"Наш сайт"),ch()));
  SOC.forEach(([k,label,g,col])=>{const u=safe(L[k]);if(u)m.append(link(u,tile(g,col),$("span",{class:"t"},label),ch()))});
  m.append(buildRating(C));
  return m;
}
