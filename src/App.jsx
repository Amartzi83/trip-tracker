import { useState, useEffect, useMemo, useRef } from "react";
import { Plane, Plus, ChevronLeft, MoreVertical, ArrowLeftRight, Globe, Receipt, TrendingUp, Coffee, UtensilsCrossed, ShoppingBag, Hotel, Bus, Wine, HeartPulse, Smartphone, Gift, Shield, Shirt, MapPin, Ticket, Camera, Music, Landmark, Palmtree, Eye, Pencil, Download, Share2, Settings, Trash2, UserPlus, Volume2, X, Clock, CreditCard, Wallet, Users, Copy, ExternalLink, ChevronRight, Compass, Utensils, Beer, Baby, ShoppingCart, TreePine, Waves, Gem, Map, Route, DollarSign, Navigation, Globe2, Star, Sun, FileText, Upload, Cloud, CalendarDays, Link2, Wind } from "lucide-react";

/* ═══════ DATA ═══════ */
const CATS=[
  {id:"food",name:"Food",icon:Utensils,color:"#FF6B6B",gradient:"linear-gradient(135deg,#FF6B6B,#ee5a24)"},
  {id:"groceries",name:"Groceries",icon:ShoppingCart,color:"#A3CB38",gradient:"linear-gradient(135deg,#A3CB38,#6ab04c)"},
  {id:"coffee",name:"Coffee",icon:Coffee,color:"#D4A574",gradient:"linear-gradient(135deg,#D4A574,#b87333)"},
  {id:"drinks",name:"Drinks",icon:Beer,color:"#F9CA24",gradient:"linear-gradient(135deg,#F9CA24,#f0932b)"},
  {id:"flights",name:"Flights",icon:Plane,color:"#686DE0",gradient:"linear-gradient(135deg,#686DE0,#4834d4)"},
  {id:"transport",name:"Transport",icon:Bus,color:"#22A6B3",gradient:"linear-gradient(135deg,#22A6B3,#0097e6)"},
  {id:"accommodation",name:"Stay",icon:Hotel,color:"#6C5CE7",gradient:"linear-gradient(135deg,#6C5CE7,#a55eea)"},
  {id:"tours",name:"Tours",icon:Landmark,color:"#E17055",gradient:"linear-gradient(135deg,#E17055,#d35400)"},
  {id:"activities",name:"Activities",icon:Compass,color:"#00B894",gradient:"linear-gradient(135deg,#00B894,#1abc9c)"},
  {id:"entertainment",name:"Fun",icon:Music,color:"#FD79A8",gradient:"linear-gradient(135deg,#FD79A8,#e84393)"},
  {id:"shopping",name:"Shopping",icon:ShoppingBag,color:"#E056A0",gradient:"linear-gradient(135deg,#E056A0,#c44569)"},
  {id:"gifts",name:"Gifts",icon:Gift,color:"#F8A5C2",gradient:"linear-gradient(135deg,#F8A5C2,#e66767)"},
  {id:"insurance",name:"Insurance",icon:Shield,color:"#74B9FF",gradient:"linear-gradient(135deg,#74B9FF,#3498db)"},
  {id:"laundry",name:"Laundry",icon:Shirt,color:"#81ECEC",gradient:"linear-gradient(135deg,#81ECEC,#00cec9)"},
  {id:"health",name:"Health",icon:HeartPulse,color:"#55E6C1",gradient:"linear-gradient(135deg,#55E6C1,#2ecc71)"},
  {id:"communication",name:"Comm",icon:Smartphone,color:"#A29BFE",gradient:"linear-gradient(135deg,#A29BFE,#6c5ce7)"},
  {id:"other",name:"Other",icon:Ticket,color:"#B2BEC3",gradient:"linear-gradient(135deg,#B2BEC3,#636e72)"},
];
const CURRS=[
  {code:"USD",symbol:"$",name:"US Dollar"},{code:"EUR",symbol:"€",name:"Euro"},{code:"GBP",symbol:"£",name:"Pound"},
  {code:"ILS",symbol:"₪",name:"Shekel"},{code:"THB",symbol:"฿",name:"Baht"},{code:"JPY",symbol:"¥",name:"Yen"},
  {code:"TRY",symbol:"₺",name:"Lira"},{code:"INR",symbol:"₹",name:"Rupee"},{code:"AUD",symbol:"A$",name:"AUD"},
  {code:"CAD",symbol:"C$",name:"CAD"},{code:"CHF",symbol:"Fr",name:"Franc"},{code:"SEK",symbol:"kr",name:"Krona"},
];
const FR={USD:1,EUR:0.926,GBP:0.793,ILS:3.704,THB:35.71,JPY:149.3,TRY:32.26,INR:83.33,AUD:1.538,CAD:1.351,CHF:0.88,SEK:10.5};
const FLAGS={"Greece":"🇬🇷","India":"🇮🇳","Thailand":"🇹🇭","Japan":"🇯🇵","Italy":"🇮🇹","Spain":"🇪🇸","France":"🇫🇷","Turkey":"🇹🇷","Israel":"🇮🇱","UK":"🇬🇧","Germany":"🇩🇪","USA":"🇺🇸","Brazil":"🇧🇷","Mexico":"🇲🇽","Portugal":"🇵🇹","Netherlands":"🇳🇱","Vietnam":"🇻🇳","Australia":"🇦🇺","Canada":"🇨🇦","Morocco":"🇲🇦","Egypt":"🇪🇬","Peru":"🇵🇪","Croatia":"🇭🇷","Hungary":"🇭🇺","Poland":"🇵🇱","Switzerland":"🇨🇭","South Korea":"🇰🇷","China":"🇨🇳","Singapore":"🇸🇬","Malaysia":"🇲🇾","Philippines":"🇵🇭","Iceland":"🇮🇸","Ireland":"🇮🇪","Austria":"🇦🇹","New Zealand":"🇳🇿","Czech":"🇨🇿","Indonesia":"🇮🇩","Cambodia":"🇰🇭","UAE":"🇦🇪"};
const LANGS=[{code:"en",name:"English",flag:"🇬🇧"},{code:"he",name:"Hebrew",flag:"🇮🇱"},{code:"th",name:"Thai",flag:"🇹🇭"},{code:"es",name:"Spanish",flag:"🇪🇸"},{code:"fr",name:"French",flag:"🇫🇷"},{code:"de",name:"German",flag:"🇩🇪"},{code:"it",name:"Italian",flag:"🇮🇹"},{code:"pt",name:"Portuguese",flag:"🇵🇹"},{code:"ja",name:"Japanese",flag:"🇯🇵"},{code:"zh",name:"Chinese",flag:"🇨🇳"},{code:"ko",name:"Korean",flag:"🇰🇷"},{code:"ar",name:"Arabic",flag:"🇸🇦"},{code:"tr",name:"Turkish",flag:"🇹🇷"},{code:"ru",name:"Russian",flag:"🇷🇺"},{code:"hi",name:"Hindi",flag:"🇮🇳"},{code:"vi",name:"Vietnamese",flag:"🇻🇳"},{code:"el",name:"Greek",flag:"🇬🇷"},{code:"nl",name:"Dutch",flag:"🇳🇱"}];
const PHRASES=["How much does this cost?","Where is the bathroom?","Can I have the bill?","Thank you very much","Do you speak English?","I need help","Where is the nearest hospital?","How do I get to the airport?","I have a reservation","One ticket please","Can you recommend a restaurant?","I'm allergic to...","No spicy please","Water please","Can I pay by card?","I'm lost","Call the police","Where is the bus station?","How far is it?","Good morning"];

function gid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function dBtw(a,b){return Math.max(1,Math.round((new Date(b)-new Date(a))/864e5))}
function gF(c){return FLAGS[c]||"🌍"}
function fC(a,c){const s=CURRS.find(x=>x.code===c);return(s?s.symbol:c)+a.toFixed(c==="JPY"?0:2)}

/* ═══════ PIE ═══════ */
function Pie({data,size=170}){
  if(!data.length)return null;const t=data.reduce((s,d)=>s+d.value,0);if(!t)return null;let cum=0;
  const sl=data.map(d=>{const a=(d.value/t)*360,st=cum;cum+=a;const sr=(st-90)*Math.PI/180,er=(st+a-90)*Math.PI/180,r=size/2-4,cx=size/2,cy=size/2;
    const p=a>=359.9?`M ${cx} ${cy-r} A ${r} ${r} 0 1 1 ${cx-.01} ${cy-r} Z`:`M ${cx} ${cy} L ${cx+r*Math.cos(sr)} ${cy+r*Math.sin(sr)} A ${r} ${r} 0 ${a>180?1:0} 1 ${cx+r*Math.cos(er)} ${cy+r*Math.sin(er)} Z`;
    return{...d,p,pct:((d.value/t)*100).toFixed(1)};});
  return(<div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
    <svg width={size} height={size}>{sl.map((s,i)=><path key={i} d={s.p} fill={s.color} stroke="var(--bg)" strokeWidth="2.5"/>)}<circle cx={size/2} cy={size/2} r={size/4.5} fill="var(--bg)"/></svg>
    <div style={{display:"flex",flexDirection:"column",gap:4}}>{sl.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
      <span style={{width:10,height:10,borderRadius:3,background:s.color,flexShrink:0}}/><span style={{opacity:.6}}>{s.label}</span><span style={{fontWeight:700}}>{s.pct}%</span></div>)}</div></div>);
}

/* ═══════ APP ═══════ */
export default function App(){
  const[trips,setTrips]=useState(()=>{try{const s=localStorage.getItem('tt_trips');if(s!==null){const p=JSON.parse(s);if(Array.isArray(p))return p;}}catch{}return[{id:"d1",name:"Athens & Islands",country:"Greece",budget:2000,currency:"USD",startDate:"2026-04-01",endDate:"2026-04-14",shared:[],expenses:[{id:"e1",amount:320,category:"flights",currency:"USD",note:"Round-trip",date:""},{id:"e2",amount:55,category:"insurance",currency:"USD",note:"Travel insurance",date:""},{id:"e3",amount:45,category:"food",currency:"EUR",note:"Dinner in Athens",date:"2026-04-02"},{id:"e4",amount:120,category:"accommodation",currency:"EUR",note:"Airbnb",date:"2026-04-02"},{id:"e5",amount:25,category:"tours",currency:"EUR",note:"Acropolis",date:"2026-04-03"},{id:"e6",amount:4.5,category:"coffee",currency:"EUR",note:"Cappuccino",date:"2026-04-03"},{id:"e7",amount:35,category:"groceries",currency:"EUR",note:"Super market",date:"2026-04-04"},{id:"e8",amount:60,category:"gifts",currency:"EUR",note:"Souvenirs",date:"2026-04-04"}]}];});
  const fbLoaded=useRef(false);
  const[githubToken,setGithubToken]=useState(()=>localStorage.getItem('tt_gh_token')||'');
  const[gistId,setGistId]=useState(()=>localStorage.getItem('tt_gist_id')||'');
  const[syncStatus,setSyncStatus]=useState('');
  const saveTimer=useRef(null);
  const[tokenDraft,setTokenDraft]=useState(()=>localStorage.getItem('tt_gh_token')||'');
  const[gistDraft,setGistDraft]=useState(()=>localStorage.getItem('tt_gist_id')||'');
  const[docCat,setDocCat]=useState("other");
  const fileInputRef=useRef(null);
  const[discoverDest,setDiscoverDest]=useState("");
  const[weatherCity,setWeatherCity]=useState("");
  const[eventsDest,setEventsDest]=useState("");
  const[pattayaWeather,setPattayaWeather]=useState(null);
  const[pattayaLoading,setPattayaLoading]=useState(false);
  const[activeTrip,setActiveTrip]=useState(null);
  const[screen,setScreen]=useState("home");
  const[tab,setTab]=useState("entries");
  const[sub,setSub]=useState(null);
  const[toast,setToast]=useState(null);
  const[userName,setUserName]=useState(()=>localStorage.getItem('tt_userName')||"Traveler");
  const[editingName,setEditingName]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[newTrip,setNewTrip]=useState({name:"",country:"",budget:"",currency:"USD",startDate:"",endDate:""});
  const[newExp,setNewExp]=useState({amount:"",category:"food",currency:"USD",note:"",date:new Date().toISOString().slice(0,10),hasDate:true});
  const[editExp,setEditExp]=useState(null);
  const[editTripForm,setEditTripForm]=useState(null);
  const[rates,setRates]=useState(FR);
  const[ratesTime,setRatesTime]=useState(null);
  const[convFrom,setConvFrom]=useState("USD");
  const[convTo,setConvTo]=useState("ILS");
  const[convAmt,setConvAmt]=useState("1");
  const[trFrom,setTrFrom]=useState("en");
  const[trTo,setTrTo]=useState("th");
  const[trText,setTrText]=useState("");
  const[trResult,setTrResult]=useState("");
  const[trLoading,setTrLoading]=useState(false);
  const[trHistory,setTrHistory]=useState([]);
  const[shareEmail,setShareEmail]=useState("");
  const[shareRole,setShareRole]=useState("viewer");

  const show=m=>{setToast(m);setTimeout(()=>setToast(null),2200)};

  // ── GitHub Gist helpers ──
  async function loadFromGist(token,id){
    if(!token||!id)return;
    try{
      const r=await fetch(`https://api.github.com/gists/${id}`,{headers:{'Authorization':`Bearer ${token}`,'Accept':'application/vnd.github.v3+json'}});
      if(!r.ok)return;
      const d=await r.json();
      const content=d.files?.['trip-tracker-data.json']?.content;
      if(content){const data=JSON.parse(content);if(Array.isArray(data.trips))setTrips(data.trips);if(data.userName)setUserName(data.userName);}
    }catch{}
  }
  async function saveToGist(tripsData,userNameData,token,id){
    if(!token)return;
    setSyncStatus('saving');
    const content=JSON.stringify({trips:tripsData,userName:userNameData},null,2);
    const body={description:'Trip Tracker Data',public:false,files:{'trip-tracker-data.json':{content}}};
    try{
      if(!id){
        const r=await fetch('https://api.github.com/gists',{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(body)});
        if(r.ok){const d=await r.json();setGistId(d.id);localStorage.setItem('tt_gist_id',d.id);setSyncStatus('saved');}else setSyncStatus('error');
      }else{
        const r=await fetch(`https://api.github.com/gists/${id}`,{method:'PATCH',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(body)});
        if(r.ok)setSyncStatus('saved');else setSyncStatus('error');
      }
    }catch{setSyncStatus('error');}
    setTimeout(()=>setSyncStatus(''),3000);
  }

  // ── Browser back-button support ──
  const historyReady=useRef(false);
  useEffect(()=>{
    // Set initial history state so back button has somewhere to go within the app
    window.history.replaceState({screen:"home",activeTrip:null,tab:"entries",sub:null},'');
    historyReady.current=true;
    function onPop(e){
      const s=e.state;
      if(!s)return;
      setScreen(s.screen||"home");
      setActiveTrip(s.activeTrip??null);
      setTab(s.tab||"entries");
      setSub(s.sub??null);
    }
    window.addEventListener('popstate',onPop);
    return()=>window.removeEventListener('popstate',onPop);
  },[]);
  // Push a new history entry every time screen changes (after mount)
  const prevScreenRef=useRef("home");
  useEffect(()=>{
    if(!historyReady.current)return;
    if(screen===prevScreenRef.current)return;
    prevScreenRef.current=screen;
    window.history.pushState({screen,activeTrip,tab,sub},'',window.location.pathname+window.location.search);
  },[screen]);

  // ── Load from Gist on mount (or fall back to localStorage) ──
  useEffect(()=>{
    (async()=>{
      await loadFromGist(githubToken,gistId);
      fbLoaded.current=true;
    })();
  },[]);

  // ── Save to localStorage + Gist (debounced 2s) on every change ──
  useEffect(()=>{
    if(!fbLoaded.current)return;
    try{localStorage.setItem('tt_trips',JSON.stringify(trips))}catch{}
    if(!githubToken)return;
    if(saveTimer.current)clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>saveToGist(trips,userName,githubToken,gistId),2000);
  },[trips]);
  useEffect(()=>{
    if(!fbLoaded.current)return;
    try{localStorage.setItem('tt_userName',userName)}catch{}
    if(!githubToken)return;
    if(saveTimer.current)clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>saveToGist(trips,userName,githubToken,gistId),2000);
  },[userName]);
  useEffect(()=>{if(screen==="syncSettings"){setTokenDraft(githubToken);setGistDraft(gistId);}},[screen]);

  useEffect(()=>{(async()=>{try{const r=await fetch("https://open.er-api.com/v6/latest/USD");const d=await r.json();if(d?.rates){setRates(d.rates);setRatesTime(new Date().toLocaleTimeString())}}catch{}})()},[]);
  useEffect(()=>{if(window.speechSynthesis){window.speechSynthesis.getVoices()}},[]);
  useEffect(()=>{
    if(screen!=="weatherScreen"&&screen!=="home")return;
    setPattayaLoading(true);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9236&longitude=100.8825&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia/Bangkok")
      .then(r=>r.json()).then(d=>{if(d?.current)setPattayaWeather(d.current);}).catch(()=>{}).finally(()=>setPattayaLoading(false));
  },[screen]);

  function cv(a,f,t){if(f===t)return a;return a/(rates[f]||1)*(rates[t]||1)}
  function speak(text,lang){
    if(!text||!window.speechSynthesis)return;
    const lm={en:"en-US",he:"he-IL",th:"th-TH",es:"es-ES",fr:"fr-FR",de:"de-DE",it:"it-IT",pt:"pt-PT",ja:"ja-JP",zh:"zh-CN",ko:"ko-KR",ar:"ar-SA",tr:"tr-TR",ru:"ru-RU",hi:"hi-IN",vi:"vi-VN",el:"el-GR",nl:"nl-NL"};
    const langCode=lm[lang]||lang;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=langCode;u.rate=0.85;
    const voices=window.speechSynthesis.getVoices();
    const voice=voices.find(v=>v.lang===langCode)||voices.find(v=>v.lang.startsWith(langCode.split('-')[0]));
    if(voice)u.voice=voice;
    window.speechSynthesis.speak(u);
  }
  function copyTxt(t){try{const a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();document.execCommand("copy");document.body.removeChild(a);show("Copied!");return true}catch{return false}}


  const trip=useMemo(()=>trips.find(t=>t.id===activeTrip),[trips,activeTrip]);
  const dated=useMemo(()=>trip?trip.expenses.filter(e=>e.date).sort((a,b)=>b.date.localeCompare(a.date)):[],[trip]);
  const undated=useMemo(()=>trip?trip.expenses.filter(e=>!e.date):[],[trip]);
  const totalSpent=useMemo(()=>trip?trip.expenses.reduce((s,e)=>s+cv(e.amount,e.currency,trip.currency),0):0,[trip,rates]);
  const totalDated=useMemo(()=>dated.reduce((s,e)=>s+cv(e.amount,e.currency,trip?.currency||"USD"),0),[dated,trip,rates]);
  const totalUndated=useMemo(()=>undated.reduce((s,e)=>s+cv(e.amount,e.currency,trip?.currency||"USD"),0),[undated,trip,rates]);
  const catBreak=useMemo(()=>{if(!trip)return[];const m={};trip.expenses.forEach(e=>{m[e.category]=(m[e.category]||0)+cv(e.amount,e.currency,trip.currency)});return CATS.filter(c=>m[c.id]).map(c=>({label:c.name,value:m[c.id],color:c.color}))},[trip,rates]);
  const dailyAvg=useMemo(()=>{if(!dated.length)return 0;const ds=dated.map(e=>e.date);return totalDated/dBtw(ds.reduce((a,b)=>a<b?a:b),ds.reduce((a,b)=>a>b?a:b))},[dated,totalDated]);

  // CRUD
  function createTrip(){const n=newTrip.name.trim()||"My Trip";const id=gid();setTrips(p=>[...p,{id,...newTrip,name:n,budget:parseFloat(newTrip.budget)||0,expenses:[],shared:[]}]);setNewTrip({name:"",country:"",budget:"",currency:"USD",startDate:"",endDate:""});setActiveTrip(id);setScreen("trip");setTab("entries");show("Trip created!")}
  function delTrip(id){setTrips(p=>p.filter(t=>t.id!==id));if(activeTrip===id){setActiveTrip(null);setScreen("myTrips")}}
  function addExpense(){if(!newExp.amount||!trip)return;setTrips(p=>p.map(t=>t.id===activeTrip?{...t,expenses:[...t.expenses,{id:gid(),amount:parseFloat(newExp.amount),category:newExp.category,currency:newExp.currency,note:newExp.note,date:newExp.hasDate?newExp.date:""}]}:t));setNewExp({amount:"",category:"food",currency:trip.currency,note:"",date:new Date().toISOString().slice(0,10),hasDate:true});setSub(null);show("Added!")}
  function updateExp(){if(!editExp)return;setTrips(p=>p.map(t=>t.id===activeTrip?{...t,expenses:t.expenses.map(e=>e.id===editExp.id?{...editExp,amount:parseFloat(editExp.amount),date:editExp.hasDate?editExp.date:""}:e)}:t));setEditExp(null);setSub(null)}
  function delExp(id){setTrips(p=>p.map(t=>t.id===activeTrip?{...t,expenses:t.expenses.filter(e=>e.id!==id)}:t))}
  function addFriend(){if(!shareEmail.trim()||!trip)return;const u={email:shareEmail.trim(),role:shareRole};setTrips(p=>p.map(t=>t.id===activeTrip?{...t,shared:[...(t.shared||[]),u]}:t));setShareEmail("");show(`Added ${u.email}`)}
  function removeFriend(email){setTrips(p=>p.map(t=>t.id===activeTrip?{...t,shared:(t.shared||[]).filter(u=>u.email!==email)}:t))}
  function saveEditTrip(){if(!editTripForm)return;setTrips(p=>p.map(t=>t.id===activeTrip?{...t,...editTripForm,budget:parseFloat(editTripForm.budget)||0}:t));setEditTripForm(null);setSub(null);show("Updated!")}
  function getCSV(){if(!trip)return"";const r=[["Date","Category","Amount","Currency",`Converted(${trip.currency})`,"Note","Type"]];trip.expenses.forEach(e=>{const c=CATS.find(x=>x.id===e.category);r.push([e.date||"General",c?.name||e.category,e.amount,e.currency,cv(e.amount,e.currency,trip.currency).toFixed(2),e.note,e.date?"Dated":"General"])});return r.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n")}
  function getShareText(){if(!trip)return"";return`✈️ ${trip.name}\n📅 ${trip.startDate||"?"} → ${trip.endDate||"?"}\n💰 ${fC(totalSpent,trip.currency)}\n📊 Budget: ${trip.budget?fC(trip.budget,trip.currency):"N/A"}\n📝 ${trip.expenses.length} expenses`}

  // ─── Translate via Google Translate (free, no API key) ───
  async function doTranslate(text){
    if(!text.trim())return;
    setTrLoading(true);setTrResult("");
    try{
      const url=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${trFrom}&tl=${trTo}&dt=t&q=${encodeURIComponent(text.trim())}`;
      const r=await fetch(url);
      if(r.ok){
        const d=await r.json();
        const tr=d?.[0]?.map(x=>x?.[0]).filter(Boolean).join('')||'';
        if(tr){
          setTrResult(tr);
          const fl=LANGS.find(l=>l.code===trFrom)?.name;
          const tl=LANGS.find(l=>l.code===trTo)?.name;
          setTrHistory(h=>[{fl,tl,orig:text.trim(),trans:tr},...h].slice(0,20));
          setTrLoading(false);return;
        }
      }
    }catch{}
    // Fallback: MyMemory
    try{
      const url=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${trFrom}|${trTo}`;
      const r=await fetch(url);
      const d=await r.json();
      const tr=d?.responseData?.translatedText||'';
      if(tr&&!tr.startsWith('MYMEMORY WARNING')){
        setTrResult(tr);
        const fl=LANGS.find(l=>l.code===trFrom)?.name;
        const tl=LANGS.find(l=>l.code===trTo)?.name;
        setTrHistory(h=>[{fl,tl,orig:text.trim(),trans:tr},...h].slice(0,20));
      }else{
        setTrResult("Could not translate. Check connection and try again.");
      }
    }catch{setTrResult("Connection error");}
    setTrLoading(false);
  }

  /* ═══════ STYLES ═══════ */
  const COUNTRY_GRADIENTS={"Greece":"linear-gradient(135deg,#0D5EAF,#009FDB)","India":"linear-gradient(135deg,#FF9933,#128807)","Thailand":"linear-gradient(135deg,#ED1C24,#241D4F)","Japan":"linear-gradient(135deg,#BC002D,#FFFFFF22)","Italy":"linear-gradient(135deg,#009246,#CE2B37)","Spain":"linear-gradient(135deg,#AA151B,#F1BF00)","France":"linear-gradient(135deg,#002395,#ED2939)","Turkey":"linear-gradient(135deg,#E30A17,#FFFFFF22)","Israel":"linear-gradient(135deg,#0038B8,#FFFFFF22)","UK":"linear-gradient(135deg,#00247D,#CF142B)","Germany":"linear-gradient(135deg,#000000,#DD0000)","USA":"linear-gradient(135deg,#3C3B6E,#B22234)","Portugal":"linear-gradient(135deg,#006600,#FF0000)","Netherlands":"linear-gradient(135deg,#AE1C28,#21468B)","Vietnam":"linear-gradient(135deg,#DA251D,#FFCD00)","Australia":"linear-gradient(135deg,#002868,#FFFFFF22)","Canada":"linear-gradient(135deg,#FF0000,#FFFFFF22)","Morocco":"linear-gradient(135deg,#C1272D,#006233)","Croatia":"linear-gradient(135deg,#FF0000,#171796)","Switzerland":"linear-gradient(135deg,#FF0000,#FFFFFF22)"};
  function getCountryGrad(c){return COUNTRY_GRADIENTS[c]||"linear-gradient(135deg,#1a1a3e,#0f2027)"}
  const css=`@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap');
    :root{--bg:#F4F7FE;--surface:#FFFFFF;--card:#FFFFFF;--card2:#F4F7FE;--border:#E8ECF7;--text:#1B2547;--text2:#7C849C;--accent:#1E5BD6;--red:#E63946;--blue:#3FB5E8;--gold:#F5B53E;--shadow:0 4px 16px rgba(40,60,140,0.06),0 1px 3px rgba(40,60,140,0.04);--shadow-lg:0 8px 24px rgba(40,60,140,0.10),0 2px 6px rgba(40,60,140,0.06)}
    *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Heebo',system-ui,sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}input,select,textarea,button{font-family:'Heebo',system-ui,sans-serif}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(30,91,214,.15)}50%{box-shadow:0 0 40px rgba(30,91,214,.3)}}
    ::selection{background:var(--accent);color:#fff}`;
  const I={width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid var(--border)",background:"#FFFFFF",color:"var(--text)",fontSize:15,outline:"none",transition:"border-color .2s"};
  const B1={width:"100%",padding:"16px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#1E5BD6,#163FA5)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"Heebo,system-ui",letterSpacing:"-0.3px",boxShadow:"0 4px 24px rgba(30,91,214,.25)"};
  const B2={...B1,background:"#FFFFFF",color:"var(--text)",border:"1.5px solid var(--border)",boxShadow:"var(--shadow)"};
  const C={background:"var(--card)",borderRadius:22,padding:20,border:"1px solid var(--border)",boxShadow:"var(--shadow)"};
  const L={fontSize:10,color:"var(--text2)",marginBottom:8,display:"block",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:700};
  const BK={background:"none",border:"none",color:"var(--accent)",fontSize:14,cursor:"pointer",fontFamily:"Heebo,system-ui",fontWeight:700,display:"flex",alignItems:"center",gap:4};
  const toastEl=toast?<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#1E5BD6,#163FA5)",color:"#fff",padding:"12px 28px",borderRadius:50,fontWeight:800,fontSize:13,zIndex:999,boxShadow:"0 8px 32px rgba(30,91,214,.3)"}}>{toast}</div>:null;

  /* ═══════ TAB BAR ═══════ */
  function TabBar(){
    const tabs=[{id:"entries",Icon:Receipt,l:"הוצאות"},{id:"stats",Icon:TrendingUp,l:"סטטיסטיקה"},{id:"xe",Icon:ArrowLeftRight,l:"המרה"},{id:"translate",Icon:Globe,l:"תרגום"},{id:"discover",Icon:Globe2,l:"גלה"}];
    return(<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFFFFF",borderTop:"1px solid var(--border)",display:"flex",zIndex:50,paddingBottom:"env(safe-area-inset-bottom)",boxShadow:"0 -2px 12px rgba(40,60,140,0.05)"}}>
      {tabs.map(({id,Icon,l})=><button key={id} onClick={()=>{setTab(id);setSub(null)}} style={{flex:1,padding:"10px 0 8px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:tab===id?"#1E5BD6":"#A8AEC0",transition:"all .2s"}}>
        <Icon size={20} strokeWidth={tab===id?2.5:1.5}/><span style={{fontSize:9,fontWeight:tab===id?800:500,letterSpacing:"0.3px"}}>{l}</span>
      </button>)}
    </div>);
  }

  /* ═══════ SPARKLE ═══════ */
  function Sparkle({size=10,top,left,right,bottom,opacity=0.55,color}){
    return(<svg width={size} height={size} viewBox="0 0 16 16" style={{position:"absolute",top,left,right,bottom,opacity,pointerEvents:"none"}}><path d="M8 0 C8.5 6 10 7.5 16 8 C10 8.5 8.5 10 8 16 C7.5 10 6 8.5 0 8 C6 7.5 7.5 6 8 0 Z" fill={color||"#B8C5E8"}/></svg>);
  }
  function SparkleBg(){
    const stars=[[22,130,14,0.5],[310,90,10,0.4],[160,200,8,0.45],[80,280,12,0.4],[340,340,14,0.5],[50,440,10,0.4],[280,480,16,0.45],[180,560,8,0.4],[30,640,12,0.45],[350,700,10,0.4],[110,760,14,0.5]];
    return(<div style={{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",overflow:"hidden"}}>{stars.map((s,i)=><Sparkle key={i} left={s[0]} top={s[1]} size={s[2]} opacity={s[3]}/>)}</div>);
  }

  /* ═══════ EXPENSE ROW ═══════ */
  function ExpRow({e,onClick}){
    const c=CATS.find(x=>x.id===e.category)||CATS[CATS.length-1];const Icon=c.icon;const conv=trip?cv(e.amount,e.currency,trip.currency):e.amount;
    return(<div onClick={onClick} style={{background:"var(--card)",borderRadius:18,padding:"14px 16px",border:"1px solid var(--border)",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,animation:"fadeUp .3s ease",transition:"transform .15s",backdropFilter:"blur(10px)"}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:44,height:44,borderRadius:14,background:c.gradient,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 16px ${c.color}30`}}><Icon size={20} color="#fff" strokeWidth={2}/></div>
        <div><div style={{fontWeight:700,fontSize:14,letterSpacing:"-0.2px"}}>{e.note||c.name}</div><div style={{fontSize:11,color:"var(--text2)",marginTop:2,fontWeight:500}}>{c.name}</div></div>
      </div>
      <div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:15,letterSpacing:"-0.3px"}}>{fC(e.amount,e.currency)}</div>
        {trip&&e.currency!==trip.currency&&<div style={{fontSize:11,color:"var(--text2)",fontWeight:500}}>≈{fC(conv,trip.currency)}</div>}</div>
    </div>);
  }

  /* ═══════════════════════════════════════════ */
  /* HOME — Sparkle grid dashboard */
  if(screen==="home"){
    const SECS=[
      {title:"טיולים",items:[
        {id:"myTrips",label:"הטיולים שלי",sub:"כל הטיולים שלך",Icon:Plane,color:"#686DE0",badge:trips.length||null,fn:()=>setScreen("myTrips")},
        {id:"newTrip",label:"טיול חדש",sub:"הוסף טיול חדש",Icon:Plus,color:"#FF4757",fn:()=>setScreen("addTrip")},
      ]},
      {title:"כלים",items:[
        {id:"xe",label:"המרת מטבעות",sub:"שערי חליפין",Icon:ArrowLeftRight,color:"#22A6B3",fn:()=>setScreen("xeScreen")},
        {id:"tr",label:"תרגום",sub:"Google Translate",Icon:Globe,color:"#00B894",fn:()=>setScreen("translateScreen")},
        {id:"disc",label:"גלה יעדים",sub:"חקר את היעד שלך",Icon:Globe2,color:"#E17055",fn:()=>setScreen("discoverScreen")},
      ]},
      {title:"אפליקציות שימושיות",items:[
        {id:"finance",label:"כספים ועמלות",sub:"שערים ועמלות בנק",Icon:CreditCard,color:"#f0932b",fn:()=>setScreen("financeScreen")},
        {id:"events",label:"אירועים וחגים",sub:"לוח אירועים",Icon:CalendarDays,color:"#e84393",fn:()=>setScreen("eventsScreen")},
        {id:"links",label:"קישורים שימושיים",sub:"כל כלי הטיול",Icon:Link2,color:"#6c5ce7",fn:()=>setScreen("linksScreen")},
        {id:"thaiApps",label:"אפליקציות לתאילנד",sub:"Grab · Bolt · Lazada",Icon:Smartphone,color:"#00B14F",fn:()=>setScreen("thaiAppsScreen")},
      ]},
    ];
    const heroTrip=trips.length>0?trips[trips.length-1]:null;
    const BG_IMGS=[
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1280&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1280&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1280&q=80&fit=crop&auto=format',
    ];
    const todayImg=BG_IMGS[Math.floor(Date.now()/86400000)%BG_IMGS.length];
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"0 0 48px",position:"relative",overflow:"hidden"}}><style>{css}</style>{toastEl}
      {/* Daily photo background */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:330,backgroundImage:`url(${todayImg})`,backgroundSize:"cover",backgroundPosition:"center 40%",zIndex:0}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.48) 0%,rgba(0,0,0,0.28) 40%,rgba(244,247,254,0.88) 82%,#F4F7FE 100%)"}}/>
      </div>
      <SparkleBg/>
      <div style={{maxWidth:480,margin:"0 auto",padding:"0 16px",position:"relative",zIndex:1}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"54px 0 20px"}}>
          <div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.85)",fontWeight:500,marginBottom:3}}>שלום, {editingName?"":`${userName} 👋`}</div>
            {editingName
              ?<input autoFocus style={{...I,fontSize:20,fontWeight:800,padding:"4px 8px",width:180}} value={userName} onChange={e=>setUserName(e.target.value)} onBlur={()=>setEditingName(false)} onKeyDown={e=>{if(e.key==="Enter")setEditingName(false)}}/>
              :<div onClick={()=>setEditingName(true)} style={{fontSize:15,fontWeight:700,color:"#fff",cursor:"pointer",textShadow:"0 1px 4px rgba(0,0,0,0.3)"}}>{new Date().toLocaleDateString("he-IL",{weekday:"long",day:"numeric",month:"long"})}</div>}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setScreen("syncSettings")} style={{width:40,height:40,borderRadius:13,background:"rgba(255,255,255,0.18)",backdropFilter:"blur(10px)",boxShadow:"0 2px 12px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,0.25)",cursor:"pointer",position:"relative"}}>
              <Settings size={18} color={githubToken?"#fff":"rgba(255,255,255,0.75)"}/>
              {syncStatus==='saving'&&<div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:"#F9CA24",animation:"pulse 1s infinite"}}/>}
              {syncStatus==='saved'&&<div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:"#7fff00"}}/>}
              {syncStatus==='error'&&<div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:"#ff4757"}}/>}
            </button>
            <div style={{width:40,height:40,borderRadius:13,background:"rgba(255,255,255,0.22)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",boxShadow:"0 2px 12px rgba(0,0,0,0.15)"}}>
              {userName.charAt(0)||"T"}
            </div>
          </div>
        </div>

        {/* Pattaya weather widget */}
        {(()=>{
          function wDescHome(code){
            if(code===0)return{desc:"שמיים בהירים",emoji:"☀️"};
            if(code<=2)return{desc:"בהיר חלקית",emoji:"🌤️"};
            if(code<=3)return{desc:"מעונן",emoji:"☁️"};
            if(code<=48)return{desc:"ערפל",emoji:"🌫️"};
            if(code<=55)return{desc:"טפטוף",emoji:"🌦️"};
            if(code<=65)return{desc:"גשם",emoji:"🌧️"};
            if(code<=82)return{desc:"גשמי מקלחות",emoji:"🌦️"};
            if(code<=95)return{desc:"סופת רעמים",emoji:"⛈️"};
            return{desc:"סופת רעמים",emoji:"⛈️"};
          }
          const wd=pattayaWeather?wDescHome(pattayaWeather.weather_code):{emoji:"🌡️",desc:""};
          return(
            <button onClick={()=>setScreen("weatherScreen")} style={{width:"100%",marginBottom:18,background:"rgba(255,255,255,0.18)",backdropFilter:"blur(14px)",border:"1px solid rgba(255,255,255,0.28)",borderRadius:18,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 16px rgba(0,0,0,0.1)",fontFamily:"Heebo,system-ui"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:26}}>{wd.emoji}</span>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",fontWeight:500,marginBottom:1}}>📍 פטאיה, תאילנד</div>
                  <div style={{fontSize:13,color:"#fff",fontWeight:600}}>{pattayaLoading?"טוען...":pattayaWeather?wd.desc:"—"}</div>
                </div>
              </div>
              {pattayaWeather&&<div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1}}>{Math.round(pattayaWeather.temperature_2m)}°</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>C</div>
                </div>
                <div style={{width:1,height:30,background:"rgba(255,255,255,0.25)"}}/>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>💧 {pattayaWeather.relative_humidity_2m}%</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>💨 {Math.round(pattayaWeather.wind_speed_10m)} km/h</div>
                </div>
                <ChevronRight size={14} color="rgba(255,255,255,0.6)"/>
              </div>}
            </button>
          );
        })()}

        {/* USD → THB rate widget */}
        {(()=>{
          const thb=rates['THB']||35.71;
          const val=Math.round(100*thb).toLocaleString();
          const rate=thb.toFixed(2);
          return(
            <button onClick={()=>setScreen("xeScreen")} style={{width:"100%",marginBottom:18,background:"var(--card)",borderRadius:18,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"var(--shadow)",border:"1px solid var(--border)",fontFamily:"Heebo,system-ui"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,borderRadius:13,background:"linear-gradient(135deg,#F5B53E,#f0932b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>💵</div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:"var(--text2)",fontWeight:500,marginBottom:1}}>שער המרה עדכני</div>
                  <div style={{fontSize:13,color:"var(--text)",fontWeight:700}}>1 USD = <span style={{color:"#f0932b"}}>{rate} ฿</span></div>
                </div>
              </div>
              <div style={{textAlign:"left",display:"flex",alignItems:"center",gap:8}}>
                <div>
                  <div style={{fontSize:11,color:"var(--text2)",fontWeight:500}}>100 דולר</div>
                  <div style={{fontSize:20,fontWeight:900,color:"var(--text)",letterSpacing:"-0.5px"}}>{val} <span style={{fontSize:13,color:"#f0932b",fontWeight:700}}>฿</span></div>
                </div>
                <ChevronRight size={14} color="var(--text2)"/>
              </div>
            </button>
          );
        })()}

        {/* Hero trip card */}
        {heroTrip&&(()=>{
          const t=heroTrip;
          const days=t.startDate&&t.endDate?Math.round((new Date(t.endDate)-new Date(t.startDate))/(1000*60*60*24)):null;
          const total=days||1;
          const now=new Date();
          const start=t.startDate?new Date(t.startDate):null;
          const end=t.endDate?new Date(t.endDate):null;
          const done=(!start||now<start)?0:(!end||now>end)?total:Math.min(total,Math.round((now-start)/(1000*60*60*24)));
          return(
            <div style={{marginBottom:28}}>
              <div onClick={()=>{setActiveTrip(t.id);setScreen("trip");setTab("entries");}} style={{background:"linear-gradient(135deg,#1E5BD6,#163FA5)",borderRadius:22,padding:"18px 20px 20px",color:"#fff",position:"relative",overflow:"hidden",cursor:"pointer",boxShadow:"0 8px 28px rgba(30,91,214,.3)"}}>
                <Sparkle right={16} top={14} size={14} opacity={0.7} color="#fff"/>
                <Sparkle right={44} top={32} size={9} opacity={0.5} color="#fff"/>
                <Sparkle left={20} bottom={18} size={11} opacity={0.5} color="#fff"/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:11,opacity:0.85,letterSpacing:"0.05em"}}>הטיול האחרון שלי</div>
                    <div style={{fontSize:24,fontWeight:800,marginTop:6,lineHeight:1.1,letterSpacing:"-0.01em"}}>{t.name}</div>
                    <div style={{fontSize:12,opacity:0.85,marginTop:6}}>{t.country||""}
                      {days?` · ${days} ימים`:""}
                      {start&&end&&now>=start&&now<=end?" · בטיול עכשיו!":""}
                    </div>
                  </div>
                  <div style={{width:44,height:44,borderRadius:14,background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Plane size={20} color="#fff"/>
                  </div>
                </div>
                {days&&days>0&&<div style={{marginTop:14,display:"flex",gap:3}}>
                  {Array.from({length:Math.min(total,20)}).map((_,i)=>(
                    <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<done?"#fff":"rgba(255,255,255,0.28)"}}/>
                  ))}
                </div>}
              </div>
            </div>
          );
        })()}

        {/* Sections */}
        {SECS.map((sec,si)=>(
          <div key={sec.title} style={{marginBottom:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,position:"relative"}}>
              <div style={{fontSize:18,fontWeight:800,color:"var(--text)",letterSpacing:"-0.01em",position:"relative"}}>
                <Sparkle right={-14} top={-2} size={10} opacity={0.7}/>
                <Sparkle right={-22} top={14} size={6} opacity={0.5}/>
                {sec.title}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {sec.items.map(item=>{const Icon=item.Icon;return(
                <button key={item.id} onClick={item.fn} style={{background:"var(--card)",borderRadius:22,border:"1px solid var(--border)",padding:"18px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"pointer",position:"relative",boxShadow:"var(--shadow)",minHeight:130,fontFamily:"Heebo,system-ui",transition:"transform .12s",textAlign:"right",overflow:"hidden"}}>
                  <Sparkle right={10} top={10} size={11} opacity={0.5}/>
                  <Sparkle right={26} top={26} size={6} opacity={0.4}/>
                  {item.badge!=null&&<div style={{position:"absolute",top:10,left:10,minWidth:22,height:22,borderRadius:11,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",padding:"0 6px"}}>{item.badge}</div>}
                  <div style={{width:52,height:52,borderRadius:14,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 6px 14px ${item.color}40`}}>
                    <Icon size={24} color="#fff" strokeWidth={1.8}/>
                  </div>
                  <div style={{marginTop:14}}>
                    <div style={{fontSize:14,fontWeight:700,color:"var(--text)",letterSpacing:"-0.01em"}}>{item.label}</div>
                    {item.sub&&<div style={{fontSize:11,color:"var(--text2)",marginTop:4,lineHeight:1.4}}>{item.sub}</div>}
                  </div>
                </button>
              );})}
            </div>
          </div>
        ))}
      </div>
    </div>);
  }

  /* MY TRIPS */
  if(screen==="myTrips"){
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"16px 0 24px"}}>
          <h2 style={{fontSize:24,fontWeight:900,letterSpacing:"-0.5px",display:"flex",alignItems:"center",gap:10}}><Plane size={22} style={{color:"var(--accent)"}}/>הטיולים שלי</h2>
          <button onClick={()=>setScreen("addTrip")} style={{width:40,height:40,borderRadius:14,border:"none",background:"linear-gradient(135deg,#FF4757,#FF6B81)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 16px rgba(255,71,87,.3)"}}><Plus size={20} color="#fff" strokeWidth={2.5}/></button>
        </div>
        {trips.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:"var(--text2)"}}>
          <div style={{width:80,height:80,borderRadius:24,background:"var(--card)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",border:"1px solid var(--border)"}}><Globe size={36} strokeWidth={1} style={{opacity:.4}}/></div>
          <p style={{fontSize:18,fontWeight:800,color:"var(--text)",marginBottom:8}}>אין טיולים עדיין</p>
          <p style={{fontSize:13}}>לחץ + ליצירת הטיול הראשון שלך</p>
        </div>}
        {trips.map((t,ti)=>{
          const spent=t.expenses.reduce((s,e)=>s+cv(e.amount,e.currency,t.currency),0);
          const perDay=t.startDate&&t.endDate?spent/dBtw(t.startDate,t.endDate):0;
          const pct=t.budget>0?Math.min((spent/t.budget)*100,100):0;
          const over=spent>t.budget&&t.budget>0;
          return(
            <div key={t.id} onClick={()=>{setActiveTrip(t.id);setScreen("trip");setTab("entries");setSub(null)}}
              style={{marginBottom:14,cursor:"pointer",animation:`fadeUp .4s ease ${ti*0.06}s both`,borderRadius:24,overflow:"hidden",border:"1px solid var(--border)"}}>
              <div style={{background:getCountryGrad(t.country),padding:"20px 20px 28px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.5))"}}/>
                <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:40,lineHeight:1,marginBottom:6}}>{gF(t.country)}</div>
                    <div style={{fontWeight:900,fontSize:20,letterSpacing:"-0.4px",textShadow:"0 2px 8px rgba(0,0,0,.3)"}}>{t.name}</div>
                  </div>
                  <button onClick={e=>{e.stopPropagation();delTrip(t.id)}} style={{background:"rgba(0,0,0,0.3)",border:"none",borderRadius:10,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={14} color="#fff"/></button>
                </div>
              </div>
              <div style={{background:"var(--card)",padding:"14px 20px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{display:"flex",gap:12,fontSize:12,color:"var(--text2)"}}>
                    <span style={{display:"flex",alignItems:"center",gap:4}}><Clock size={12}/>{t.startDate?`${t.startDate.slice(5)} → ${(t.endDate||"?").slice(5)}`:"ללא תאריכים"}{t.startDate&&t.endDate&&<span style={{marginLeft:4,background:"rgba(30,91,214,0.1)",borderRadius:6,padding:"1px 6px",fontWeight:700,color:"var(--accent)",fontSize:10}}>{dBtw(t.startDate,t.endDate)}d</span>}</span>
                    <span style={{display:"flex",alignItems:"center",gap:4}}><Receipt size={12}/>{t.expenses.length}</span>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <div style={{fontSize:24,fontWeight:900,color:"var(--accent)",letterSpacing:"-0.8px"}}>{fC(spent,t.currency)}</div>
                </div>
                {t.budget>0&&<div style={{marginTop:10}}>
                  <div style={{height:5,borderRadius:3,background:"var(--border)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${pct}%`,background:over?"linear-gradient(90deg,#E63946,#FF6B81)":"linear-gradient(90deg,#1E5BD6,#3FB5E8)"}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginTop:4,color:"var(--text2)"}}><span>{pct.toFixed(0)}% נוצל</span><span style={{fontWeight:600,color:over?"var(--red)":"var(--accent)"}}>{over?"חריגה מתקציב":fC(t.budget-spent,t.currency)+" נותר"}</span></div>
                </div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>);
  }

  /* STANDALONE XE */
  if(screen==="xeScreen"){
    const res=cv(parseFloat(convAmt)||0,convFrom,convTo);const rate=cv(1,convFrom,convTo);
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 22px",display:"flex",alignItems:"center",gap:8}}><ArrowLeftRight size={22} style={{color:"var(--accent)"}}/>המרת מטבעות</h2>
        <div style={{...C,marginBottom:16}}>
          <input style={{...I,fontSize:30,fontWeight:800,textAlign:"center",marginBottom:16,background:"transparent"}} type="number" step="0.01" value={convAmt} onChange={e=>setConvAmt(e.target.value)}/>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}>
            <div style={{flex:1}}><select style={I} value={convFrom} onChange={e=>setConvFrom(e.target.value)}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}</select></div>
            <button onClick={()=>{setConvFrom(convTo);setConvTo(convFrom)}} style={{width:40,height:40,borderRadius:14,border:"1px solid var(--border)",background:"var(--card)",color:"var(--accent)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowLeftRight size={18}/></button>
            <div style={{flex:1}}><select style={I} value={convTo} onChange={e=>setConvTo(e.target.value)}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}</select></div>
          </div>
          <div style={{background:"var(--bg)",borderRadius:16,padding:20,textAlign:"center",border:"1px solid var(--border)"}}>
            <div style={{fontSize:34,fontWeight:800,color:"var(--accent)",letterSpacing:"-1px"}}>{fC(res,convTo)}</div>
            <div style={{fontSize:12,color:"var(--text2)",marginTop:6}}>1 {convFrom} = {rate.toFixed(4)} {convTo}</div>
          </div>
          {ratesTime&&<div style={{fontSize:11,color:"var(--accent)",textAlign:"center",marginTop:10,fontWeight:600}}>✓ Live · {ratesTime}</div>}
        </div>
        <div style={C}><div style={{...L,marginBottom:12}}>Quick Rates</div>
          {CURRS.filter(c=>c.code!==convFrom).slice(0,8).map(c=>{const r=cv(1,convFrom,c.code);return(
            <div key={c.code} onClick={()=>setConvTo(c.code)} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--border)",cursor:"pointer",fontSize:13}}>
              <span style={{fontWeight:500}}>{c.symbol} {c.code}</span><span style={{fontWeight:700}}>{r.toFixed(c.code==="JPY"?2:4)}</span></div>)})}
        </div>
      </div>
    </div>);
  }

  /* STANDALONE TRANSLATE */
  if(screen==="translateScreen"){
    const fl=LANGS.find(l=>l.code===trFrom),tl2=LANGS.find(l=>l.code===trTo);
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 4px",display:"flex",alignItems:"center",gap:8}}><Globe size={22} style={{color:"var(--accent)"}}/>תרגום</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:18}}>מופעל ע"י Google Translate · חינמי</p>
        <div style={{...C,marginBottom:16}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}>
            <div style={{flex:1}}><select style={I} value={trFrom} onChange={e=>setTrFrom(e.target.value)}>{LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}</select></div>
            <button onClick={()=>{setTrFrom(trTo);setTrTo(trFrom);setTrResult("")}} style={{width:40,height:40,borderRadius:14,border:"1px solid var(--border)",background:"var(--card)",color:"var(--accent)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowLeftRight size={18}/></button>
            <div style={{flex:1}}><select style={I} value={trTo} onChange={e=>setTrTo(e.target.value)}>{LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}</select></div>
          </div>
          <textarea style={{...I,minHeight:70,resize:"vertical",marginBottom:12}} placeholder={`כתוב ב${fl?.name||""}...`} value={trText} onChange={e=>setTrText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();doTranslate(trText)}}}/>
          <button style={{...B1,opacity:trLoading?.6:1}} onClick={()=>doTranslate(trText)} disabled={trLoading}>{trLoading?"מתרגם...":"תרגם"}</button>
          {trResult&&<div style={{background:"var(--bg)",borderRadius:16,padding:16,marginTop:16,border:"1px solid var(--border)"}}>
            <div style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid var(--border)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:11,color:"var(--text2)"}}>{fl?.flag} {fl?.name}</span>
                <button onClick={()=>speak(trText,trFrom)} style={{background:"none",border:"1px solid var(--border)",borderRadius:10,padding:"4px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--accent)",fontFamily:"Inter"}}><Volume2 size={14}/>נגן</button></div>
              <div style={{fontSize:13,color:"var(--text2)"}}>{trText}</div></div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:11,color:"var(--accent)",fontWeight:700}}>{tl2?.flag} {tl2?.name}</span>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>copyTxt(trResult)} style={{background:"none",border:"1px solid var(--border)",borderRadius:10,padding:"5px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--text2)",fontFamily:"Inter"}}><Copy size={13}/>העתק</button>
                <button onClick={()=>speak(trResult,trTo)} style={{background:"var(--accent)",border:"none",borderRadius:10,padding:"6px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#000",fontWeight:700,fontFamily:"Inter"}}><Volume2 size={14}/>האזן</button>
              </div>
            </div>
            <div style={{fontSize:20,fontWeight:700,lineHeight:1.5,direction:"auto"}}>{trResult}</div>
          </div>}
        </div>
        <div style={C}><div style={{...L,marginBottom:12}}>משפטים שימושיים</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>{PHRASES.map((p,i)=><button key={i} onClick={()=>{setTrText(p);doTranslate(p)}} style={{textAlign:"left",padding:"10px 14px",borderRadius:12,border:"1px solid var(--border)",background:"var(--card)",color:"var(--text)",cursor:"pointer",fontSize:12,fontFamily:"Inter",fontWeight:500}}>{p}</button>)}</div>
        </div>
      </div>
    </div>);
  }

  /* STANDALONE DISCOVER */
  if(screen==="discoverScreen"){
    const dest=discoverDest||trips[0]?.country||"";
    const q=encodeURIComponent(dest);
    const DISC=[
      {name:"Google Maps",url:`https://www.google.com/maps/search/${q}`,Icon:Map,color:"#4285F4",desc:"ניווט וחקר"},
      {name:"TripAdvisor",url:`https://www.tripadvisor.com/Search?q=${q}`,Icon:Star,color:"#00A680",desc:"ביקורות ואטרקציות"},
      {name:"Booking.com",url:`https://www.booking.com/searchresults.html?ss=${q}`,Icon:Hotel,color:"#003580",desc:"מלונות ולינה"},
      {name:"Airbnb",url:`https://www.airbnb.com/s/${q}`,Icon:Palmtree,color:"#FF5A5F",desc:"דירות ולינה ייחודית"},
      {name:"טיסות",url:`https://www.google.com/travel/flights`,Icon:Plane,color:"#686DE0",desc:"מצא טיסות זולות"},
      {name:"מסעדות",url:`https://www.google.com/maps/search/restaurants+in+${q}`,Icon:Utensils,color:"#FF6B6B",desc:"האוכל הטוב ביותר"},
      {name:"אטרקציות",url:`https://www.google.com/maps/search/tourist+attractions+in+${q}`,Icon:Landmark,color:"#E17055",desc:"מה לראות"},
      {name:"YouTube",url:`https://www.youtube.com/results?search_query=${q}+travel+guide`,Icon:Camera,color:"#FF0000",desc:"מדריכי טיול"},
      {name:"מזג אוויר",url:`https://www.weather.com/weather/today/l/${q}`,Icon:Sun,color:"#FFC107",desc:"תחזית מקומית"},
      {name:"עלות מחיה",url:`https://www.numbeo.com/cost-of-living/in/${dest.replace(/ /g,"-")}`,Icon:DollarSign,color:"#55E6C1",desc:"מחירים ותקציב"},
      {name:"כיוונים",url:`https://www.google.com/maps/dir/?api=1&destination=${q}`,Icon:Navigation,color:"#A29BFE",desc:"קבל הוראות הגעה"},
      {name:"תרגום",url:`https://translate.google.com/?sl=auto&tl=he`,Icon:Globe,color:"#00B894",desc:"Google Translate"},
    ];
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 16px",display:"flex",alignItems:"center",gap:8}}><Globe2 size={22} style={{color:"var(--accent)"}}/>גלה יעדים</h2>
        <div style={{...C,marginBottom:20}}>
          <label style={L}>יעד</label>
          <input style={I} placeholder="לדוגמא: Greece, Tokyo, Barcelona..." value={discoverDest} onChange={e=>setDiscoverDest(e.target.value)}/>
        </div>
        {dest&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {DISC.map(({name,url,Icon,color,desc},i)=>(
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              style={{...C,padding:"16px 14px",textDecoration:"none",display:"flex",flexDirection:"column",gap:8,borderColor:`${color}22`,animation:`fadeUp .3s ease ${i*0.03}s both`}}>
              <div style={{width:40,height:40,borderRadius:13,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={20} color={color}/></div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{name}</div>
              <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.4}}>{desc}</div>
              <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:600}}>פתח <ExternalLink size={10}/></div>
            </a>
          ))}
        </div>}
        {!dest&&<div style={{textAlign:"center",padding:"40px 20px",color:"var(--text2)"}}>
          <Globe2 size={48} strokeWidth={1} style={{marginBottom:12,opacity:.25}}/>
          <p style={{fontWeight:600,color:"var(--text)",marginBottom:6}}>הכנס יעד לחיפוש</p>
          <p style={{fontSize:12}}>יפתחו קישורים לכל המידע על היעד</p>
        </div>}
      </div>
    </div>);
  }

  /* FINANCE SCREEN */
  if(screen==="financeScreen"){
    const FLINKS=[
      {name:"XE.com",url:"https://www.xe.com/currencyconverter/",Icon:ArrowLeftRight,color:"#F9CA24",desc:"שערי מטבע בזמן אמת"},
      {name:"Wise",url:"https://wise.com/gb/currency-converter/",Icon:TrendingUp,color:"#37A94E",desc:"העברות בשיעור הטוב ביותר"},
      {name:"בנק ישראל",url:"https://www.boi.org.il/en/markets-and-statistics/exchange-rates/",Icon:Landmark,color:"#0097e6",desc:"שערי מטבע רשמיים"},
      {name:"Mastercard FX",url:"https://www.mastercard.us/en-us/personal/get-support/convert-currency.html",Icon:CreditCard,color:"#EB001B",desc:"מחשבון עמלות Mastercard"},
      {name:"Visa FX",url:"https://usa.visa.com/support/consumer/travel-support/exchange-rate-calculator.html",Icon:CreditCard,color:"#1A1F71",desc:"מחשבון עמלות Visa"},
      {name:"Bloomberg FX",url:"https://www.bloomberg.com/markets/currencies",Icon:DollarSign,color:"#FF6600",desc:"שוק המטבעות העולמי"},
    ];
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 48px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 4px",display:"flex",alignItems:"center",gap:8}}><CreditCard size={22} style={{color:"var(--accent)"}}/>כספים ועמלות</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:20}}>שערי מטבע · עמלות בנק · כלי כספים</p>
        <div style={{...C,marginBottom:20,background:"rgba(249,202,36,.07)",borderColor:"rgba(249,202,36,.25)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#F9CA24",marginBottom:12}}>💳 עמלות בנקים ישראלים</div>
          {[["כרטיס אשראי רגיל","1.5–2% על עסקה"],["כרטיס פוקוס / מקס","~0.5–1%"],["כרטיס Wise","~0% עד מכסה חינמית"],['משיכת מזומן בחו"ל',"30–60 ₪ + ~1.5%"],["חיוב בש\"ח בחו\"ל (DCC)","הימנע — שער גרוע"]].map(([k,v],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderTop:i?"1px solid var(--border)":"none",fontSize:12}}>
              <span style={{color:"var(--text2)"}}>{k}</span><span style={{fontWeight:700,color:"var(--text)"}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,fontWeight:700,color:"var(--text2)",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:12}}>כלי שערי מטבע</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {FLINKS.map(({name,url,Icon,color,desc},i)=>(
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              style={{...C,padding:"16px 14px",textDecoration:"none",display:"flex",flexDirection:"column",gap:8,borderColor:`${color}22`}}>
              <div style={{width:40,height:40,borderRadius:13,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={20} color={color}/></div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{name}</div>
              <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.4}}>{desc}</div>
              <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:600}}>פתח <ExternalLink size={10}/></div>
            </a>
          ))}
        </div>
      </div>
    </div>);
  }

  /* WEATHER SCREEN */
  if(screen==="weatherScreen"){
    const wq=encodeURIComponent(weatherCity||"Tel Aviv");
    const WLINKS=[
      {name:"Weather.com",url:`https://weather.com/weather/today/l/${wq}`,Icon:Sun,color:"#FFC107",desc:"תחזית יומית מפורטת"},
      {name:"Windy",url:`https://www.windy.com/?${wq}`,Icon:Wind,color:"#55E6C1",desc:"מפת רוחות ומשקעים"},
      {name:"AccuWeather",url:`https://www.accuweather.com/he/search-locations?query=${wq}`,Icon:Cloud,color:"#FC7318",desc:"תחזית מדויקת לשבוע"},
      {name:"Time & Date",url:`https://www.timeanddate.com/weather/${wq}`,Icon:Clock,color:"#A29BFE",desc:"שעות שקיעה וזריחה"},
      {name:"Meteoblue",url:`https://www.meteoblue.com/weather/forecast/week/${wq}`,Icon:Globe2,color:"#0097e6",desc:"תחזית ל-14 ימים"},
      {name:"Google Weather",url:`https://www.google.com/search?q=weather+${wq}`,Icon:Globe,color:"#4285F4",desc:"תחזית מהירה בגוגל"},
    ];
    function wDesc(code){
      if(code===0)return{desc:"שמיים בהירים",emoji:"☀️"};
      if(code<=2)return{desc:"בהיר חלקית",emoji:"🌤️"};
      if(code<=3)return{desc:"מעונן",emoji:"☁️"};
      if(code<=48)return{desc:"ערפל",emoji:"🌫️"};
      if(code<=55)return{desc:"טפטוף קל",emoji:"🌦️"};
      if(code<=65)return{desc:"גשם",emoji:"🌧️"};
      if(code<=75)return{desc:"שלג",emoji:"🌨️"};
      if(code<=82)return{desc:"גשמי מקלחות",emoji:"🌦️"};
      if(code<=95)return{desc:"סופת רעמים",emoji:"⛈️"};
      return{desc:"סופת רעמים עם ברד",emoji:"⛈️"};
    }
    const pw=pattayaWeather;const wd=pw?wDesc(pw.weather_code):{};
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 16px",display:"flex",alignItems:"center",gap:8}}><Cloud size={22} style={{color:"var(--accent)"}}/>מזג אויר</h2>

        {/* Pattaya live weather card */}
        <div style={{background:"linear-gradient(135deg,#0984e3,#00b4d8)",borderRadius:22,padding:"20px 22px",marginBottom:20,color:"#fff",position:"relative",overflow:"hidden",boxShadow:"0 8px 28px rgba(9,132,227,.3)"}}>
          <Sparkle right={16} top={12} size={14} opacity={0.6} color="#fff"/>
          <Sparkle right={40} top={30} size={8} opacity={0.4} color="#fff"/>
          <Sparkle left={18} bottom={14} size={10} opacity={0.4} color="#fff"/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:11,opacity:0.85,letterSpacing:"0.06em",marginBottom:4}}>📍 פטאיה, תאילנד · עכשיו</div>
              {pattayaLoading&&<div style={{fontSize:28,fontWeight:800,opacity:0.6}}>טוען...</div>}
              {!pattayaLoading&&pw&&<>
                <div style={{fontSize:52,fontWeight:900,lineHeight:1,letterSpacing:"-2px"}}>{Math.round(pw.temperature_2m)}°<span style={{fontSize:28,fontWeight:500}}>C</span></div>
                <div style={{fontSize:14,marginTop:6,opacity:0.9,fontWeight:600}}>{wd.emoji} {wd.desc}</div>
              </>}
              {!pattayaLoading&&!pw&&<div style={{fontSize:14,opacity:0.75}}>לא ניתן לטעון</div>}
            </div>
            {pw&&<div style={{display:"flex",flexDirection:"column",gap:10,alignItems:"flex-end"}}>
              <div style={{background:"rgba(255,255,255,0.2)",borderRadius:14,padding:"10px 14px",textAlign:"center",backdropFilter:"blur(8px)"}}>
                <div style={{fontSize:10,opacity:0.8,marginBottom:2}}>מורגש</div>
                <div style={{fontSize:18,fontWeight:800}}>{Math.round(pw.apparent_temperature)}°</div>
              </div>
              <div style={{background:"rgba(255,255,255,0.2)",borderRadius:14,padding:"10px 14px",textAlign:"center",backdropFilter:"blur(8px)"}}>
                <div style={{fontSize:10,opacity:0.8,marginBottom:2}}>לחות</div>
                <div style={{fontSize:18,fontWeight:800}}>{pw.relative_humidity_2m}%</div>
              </div>
              <div style={{background:"rgba(255,255,255,0.2)",borderRadius:14,padding:"10px 14px",textAlign:"center",backdropFilter:"blur(8px)"}}>
                <div style={{fontSize:10,opacity:0.8,marginBottom:2}}>רוח</div>
                <div style={{fontSize:18,fontWeight:800}}>{Math.round(pw.wind_speed_10m)}<span style={{fontSize:10}}>km/h</span></div>
              </div>
            </div>}
          </div>
          {pw&&<div style={{marginTop:14,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.2)",display:"flex",gap:16,fontSize:11,opacity:0.8}}>
            <a href="https://www.windy.com/?12.92,100.88,11" target="_blank" rel="noopener noreferrer" style={{color:"#fff",display:"flex",alignItems:"center",gap:4,textDecoration:"none",fontWeight:600}}>Windy <ExternalLink size={10}/></a>
            <a href="https://www.timeanddate.com/weather/thailand/pattaya" target="_blank" rel="noopener noreferrer" style={{color:"#fff",display:"flex",alignItems:"center",gap:4,textDecoration:"none",fontWeight:600}}>תחזית מלאה <ExternalLink size={10}/></a>
          </div>}
        </div>

        <div style={{...C,marginBottom:20}}>
          <label style={L}>חפש עיר אחרת</label>
          <input style={I} placeholder="לדוגמא: Athens, Bangkok, Paris..." value={weatherCity} onChange={e=>setWeatherCity(e.target.value)}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {WLINKS.map(({name,url,Icon,color,desc},i)=>(
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              style={{...C,padding:"16px 14px",textDecoration:"none",display:"flex",flexDirection:"column",gap:8,borderColor:`${color}22`}}>
              <div style={{width:40,height:40,borderRadius:13,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={20} color={color}/></div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{name}</div>
              <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.4}}>{desc}</div>
              <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:600}}>פתח <ExternalLink size={10}/></div>
            </a>
          ))}
        </div>
      </div>
    </div>);
  }

  /* EVENTS SCREEN */
  if(screen==="eventsScreen"){
    const eq=encodeURIComponent(eventsDest||"Israel");
    const ELINKS=[
      {name:"Time & Date",url:`https://www.timeanddate.com/holidays/${eq}`,Icon:CalendarDays,color:"#A29BFE",desc:"חגים לאומיים לפי מדינה"},
      {name:"Public Holidays",url:`https://publicholidays.com/search/?q=${eq}`,Icon:Star,color:"#F9CA24",desc:"חגים ציבוריים בעולם"},
      {name:"Eventbrite",url:`https://www.eventbrite.com/d/${eq}/events/`,Icon:Ticket,color:"#F05537",desc:"אירועים מקומיים"},
      {name:"Songkick",url:`https://www.songkick.com/search?query=${eq}`,Icon:Music,color:"#F80046",desc:"הופעות וקונצרטים"},
      {name:"Facebook Events",url:`https://www.facebook.com/events/search/?q=${eq}`,Icon:Users,color:"#1877F2",desc:"אירועים בפייסבוק"},
      {name:"Timeout",url:`https://www.timeout.com/search?q=${eq}`,Icon:Clock,color:"#FF5A5F",desc:"מה לעשות בעיר"},
    ];
    const THAI_HOLIDAYS=[
      {date:"2026-01-01",name:"ראש השנה האזרחי",thai:"วันปีใหม่",type:"national",emoji:"🎆",desc:"עסקים סגורים"},
      {date:"2026-02-22",name:"מאקהה בוצ'ה",thai:"วันมาฆบูชา",type:"buddhist",emoji:"🕯️",desc:"ירח מלא · אסור מכירת אלכוהול"},
      {date:"2026-04-06",name:"יום צ'קרי",thai:"วันจักรี",type:"national",emoji:"👑",desc:"יום השושלת המלכותית"},
      {date:"2026-04-13",name:"סונגקראן — יום א׳",thai:"วันสงกรานต์",type:"festival",emoji:"💦",desc:"ראש השנה התאי · מלחמת מים"},
      {date:"2026-04-14",name:"סונגקראן — יום ב׳",thai:"วันสงกרานต์",type:"festival",emoji:"💦",desc:"חגיגות מרכזיות ברחובות"},
      {date:"2026-04-15",name:"סונגקראן — יום ג׳",thai:"วันสงกรานต์",type:"festival",emoji:"💦",desc:"יום משפחה · תחיליות"},
      {date:"2026-05-01",name:"יום העבודה",thai:"วันแรงงาน",type:"national",emoji:"⚒️",desc:"עסקים רבים סגורים"},
      {date:"2026-05-04",name:"יום ההכתרה",thai:"วันฉัตรมงคล",type:"national",emoji:"👑",desc:"הכתרת המלך ואג'ירלונגקורן"},
      {date:"2026-05-22",name:"וויסאקהה בוצ'ה",thai:"วันวิสาขบูชา",type:"buddhist",emoji:"🪷",desc:"יום הולדת הבודהה · ירח מלא · אסור אלכוהול"},
      {date:"2026-06-03",name:"יום הולדת המלכה",thai:"วันเฉลิมพระชนมพรรษาราชินี",type:"national",emoji:"👸",desc:"יום הולדת המלכה סותידה"},
      {date:"2026-07-20",name:"אסאהנהה בוצ'ה",thai:"วันอาสาฬหบูชา",type:"buddhist",emoji:"🕯️",desc:"הדרשה הראשונה של הבודהה · אסור אלכוהול"},
      {date:"2026-07-21",name:"כאו פאנסא",thai:"วันเข้าพรรษา",type:"buddhist",emoji:"🧘",desc:"תחילת עונת הצום הבודהיסטי · 3 חודשים"},
      {date:"2026-07-28",name:"יום הולדת המלך",thai:"วันเฉลิมพระชนมพรรษา ร.10",type:"national",emoji:"👑",desc:"יום הולדת המלך ואג'ירלונגקורן"},
      {date:"2026-08-12",name:"יום האם הלאומי",thai:"วันแม่แห่งชาติ",type:"national",emoji:"🌺",desc:"יום הולדת המלכה-אם סיריקיט"},
      {date:"2026-10-13",name:"יום זיכרון למלך בומיבול",thai:"วันนวมินทรมหาราช",type:"national",emoji:"🖤",desc:"יום פטירת המלך רמה ה-9"},
      {date:"2026-10-19",name:"אוק פאנסא",thai:"วันออกพรรษา",type:"buddhist",emoji:"🏮",desc:"סיום עונת הצום הבודהיסטי"},
      {date:"2026-10-23",name:"יום צ'ולאלונגקורן",thai:"วันปิยมหาราช",type:"national",emoji:"🌹",desc:"יום פטירת המלך רמה ה-5"},
      {date:"2026-11-29",name:"לוי קראטונג",thai:"วันลอยกระทง",type:"festival",emoji:"🏮",desc:"פסטיבל סירות הנרות · ירח מלא · יפהפה!"},
      {date:"2026-12-05",name:"יום האב הלאומי",thai:"วันพ่อแห่งชาติ",type:"national",emoji:"👴",desc:"יום הולדת המלך בומיבול"},
      {date:"2026-12-10",name:"יום החוקה",thai:"วันรัฐธรรมนูญ",type:"national",emoji:"📜",desc:"יום החוקה התאית"},
      {date:"2026-12-31",name:"ערב ראש השנה",thai:"วันสิ้นปี",type:"festival",emoji:"🎉",desc:"חגיגות ואירועים ברחבי תאילנד"},
    ];
    const today=new Date();today.setHours(0,0,0,0);
    const typeColor={national:"#1E5BD6",buddhist:"#E17055",festival:"#e84393"};
    const typeName={national:"לאומי",buddhist:"בודהיסטי",festival:"פסטיבל"};
    const upcomingIdx=THAI_HOLIDAYS.findIndex(h=>new Date(h.date)>=today);
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 48px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 4px",display:"flex",alignItems:"center",gap:8}}><CalendarDays size={22} style={{color:"var(--accent)"}}/>אירועים וחגים</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:20}}>תאילנד 2026 · חגים לאומיים, בודהיסטיים ופסטיבלים</p>

        {/* Thailand 2026 holidays list */}
        <div style={{...C,marginBottom:24,padding:"0 0 4px"}}>
          <div style={{padding:"16px 18px 12px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:18}}>🇹🇭</span>
            <div>
              <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>חגים ומועדים בתאילנד 2026</div>
              <div style={{fontSize:10,color:"var(--text2)",marginTop:1}}>{THAI_HOLIDAYS.filter(h=>new Date(h.date)>=today).length} מועדים קרובים</div>
            </div>
            <div style={{marginRight:"auto",display:"flex",gap:6}}>
              {[["national","לאומי"],["buddhist","בודהיסטי"],["festival","פסטיבל"]].map(([t,l])=>(
                <span key={t} style={{fontSize:9,padding:"2px 6px",borderRadius:999,background:`${typeColor[t]}18`,color:typeColor[t],fontWeight:700}}>{l}</span>
              ))}
            </div>
          </div>
          {THAI_HOLIDAYS.map((h,i)=>{
            const hDate=new Date(h.date);const isPast=hDate<today;const isNext=i===upcomingIdx;
            const d=hDate.toLocaleDateString("he-IL",{day:"numeric",month:"long"});
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",borderBottom:i<THAI_HOLIDAYS.length-1?"1px solid var(--border)":"none",opacity:isPast?0.42:1,background:isNext?"rgba(30,91,214,0.04)":"transparent",position:"relative"}}>
                {isNext&&<div style={{position:"absolute",right:0,top:0,bottom:0,width:3,borderRadius:"0 4px 4px 0",background:"var(--accent)"}}/>}
                <div style={{fontSize:22,flexShrink:0,width:28,textAlign:"center"}}>{h.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                    <span style={{fontWeight:700,fontSize:13,color:isPast?"var(--text2)":"var(--text)"}}>{h.name}</span>
                    {isNext&&<span style={{fontSize:9,padding:"2px 7px",borderRadius:999,background:"var(--accent)",color:"#fff",fontWeight:800}}>הבא</span>}
                    {isPast&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:999,background:"var(--border)",color:"var(--text2)",fontWeight:600}}>עבר</span>}
                  </div>
                  <div style={{fontSize:10,color:"var(--text2)",marginTop:1,display:"flex",gap:6,alignItems:"center"}}>
                    <span>{h.thai}</span>
                    <span style={{width:2,height:2,borderRadius:"50%",background:"var(--border)",display:"inline-block"}}/>
                    <span>{h.desc}</span>
                  </div>
                </div>
                <div style={{flexShrink:0,textAlign:"left"}}>
                  <div style={{fontSize:11,fontWeight:700,color:isPast?"var(--text2)":typeColor[h.type]}}>{d}</div>
                  <div style={{fontSize:9,padding:"2px 6px",borderRadius:999,background:`${typeColor[h.type]}18`,color:typeColor[h.type],fontWeight:700,marginTop:3,textAlign:"center"}}>{typeName[h.type]}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{fontSize:11,fontWeight:700,color:"var(--text2)",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:12}}>חיפוש אירועים נוספים</div>
        <div style={{...C,marginBottom:16}}>
          <label style={L}>מדינה / עיר</label>
          <input style={I} placeholder="לדוגמא: Israel, Thailand, Japan..." value={eventsDest} onChange={e=>setEventsDest(e.target.value)}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {ELINKS.map(({name,url,Icon,color,desc},i)=>(
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              style={{...C,padding:"16px 14px",textDecoration:"none",display:"flex",flexDirection:"column",gap:8,borderColor:`${color}22`}}>
              <div style={{width:40,height:40,borderRadius:13,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={20} color={color}/></div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{name}</div>
              <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.4}}>{desc}</div>
              <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:600}}>פתח <ExternalLink size={10}/></div>
            </a>
          ))}
        </div>
      </div>
    </div>);
  }

  /* THAI APPS SCREEN */
  if(screen==="thaiAppsScreen"){
    const APPS=[
      {cat:"🚗 תחבורה",sub:"הזמנת רכב, מוניות ואופנועים",color:"#00B14F",items:[
        {name:"Grab",domain:"grab.com",url:"https://www.grab.com/th/",color:"#00B14F",desc:"הכי פופולרי · מוניות, אופנוע GrabBike, אוכל"},
        {name:"Bolt",domain:"bolt.eu",url:"https://bolt.eu/en-th/",color:"#34D186",desc:"בדרך כלל זול מ-Grab · ממשק נוח"},
        {name:"Tada",domain:"tada.global",url:"https://tada.global/",color:"#1A1A2E",desc:"ללא עמלות לנהגים · מחיר הוגן יותר"},
        {name:"inDrive",domain:"indrive.com",url:"https://indrive.com/en/home/",color:"#41B658",desc:"מתמקחים על המחיר ישירות עם הנהג"},
      ]},
      {cat:"🍜 אוכל ומשלוחים",sub:"משלוחים הביתה ומסעדות",color:"#FF4B4B",items:[
        {name:"Bolt Food",domain:"food.bolt.eu",url:"https://food.bolt.eu/",color:"#34D186",desc:"משלוחים מהירים · מבצעים תכופים"},
        {name:"LINE MAN",domain:"lineman.me",url:"https://www.lineman.me/en",color:"#00B900",desc:"הכי נפוץ בתאילנד · עובד מעולה"},
        {name:"Hungry Hub",domain:"hungryhub.com",url:"https://www.hungryhub.com/",color:"#FF4B4B",desc:"מסעדות פרימיום · סטים וBAF · עושה הפתעות"},
      ]},
      {cat:"💆 בריאות וספא",sub:"עיסויים, ספא וטיפולים",color:"#9B59B6",items:[
        {name:"GoWobi",domain:"gowobi.com",url:"https://www.gowobi.com/",color:"#9B59B6",desc:"הזמנת ספא ועיסויים מראש · עם ביקורות"},
      ]},
      {cat:"🛒 קניות",sub:"שופינג אונליין עד הדלת",color:"#F57224",items:[
        {name:"Lazada",domain:"lazada.co.th",url:"https://www.lazada.co.th/",color:"#F57224",desc:"אמזון של דרום-מזרח אסיה · משלוח מהיר"},
        {name:"Shopee",domain:"shopee.co.th",url:"https://shopee.co.th/",color:"#EE4D2D",desc:"מחירים נמוכים · מבצעים יומיים"},
      ]},
    ];
    function AppLogo({domain,color,name}){
      const[err,setErr]=useState(false);
      if(err)return(<div style={{width:44,height:44,borderRadius:14,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,color}}>{name[0]}</div>);
      return(<img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} onError={()=>setErr(true)} style={{width:44,height:44,borderRadius:14,objectFit:"contain",background:"#fff",border:"1px solid var(--border)",padding:4}} alt={name}/>);
    }
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 48px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 4px",display:"flex",alignItems:"center",gap:8}}><Smartphone size={22} style={{color:"#00B14F"}}/>אפליקציות לתאילנד</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:24}}>האפליקציות הכי שימושיות לטיול בתאילנד</p>
        {APPS.map((sec,si)=>(
          <div key={si} style={{marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <div style={{width:36,height:36,borderRadius:12,background:`${sec.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{sec.cat.split(" ")[0]}</div>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:"var(--text)"}}>{sec.cat.slice(3)}</div>
                <div style={{fontSize:11,color:"var(--text2)"}}>{sec.sub}</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {sec.items.map((app,ai)=>(
                <a key={ai} href={app.url} target="_blank" rel="noopener noreferrer"
                  style={{...C,padding:"14px 16px",textDecoration:"none",display:"flex",alignItems:"center",gap:14,borderColor:`${app.color}22`}}>
                  <AppLogo domain={app.domain} color={app.color} name={app.name}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{app.name}</div>
                    <div style={{fontSize:11,color:"var(--text2)",marginTop:2,lineHeight:1.4}}>{app.desc}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:app.color,fontWeight:700,flexShrink:0}}>
                    פתח<ExternalLink size={12}/>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
        <div style={{...C,padding:"14px 16px",background:"rgba(30,91,214,0.04)",borderColor:"rgba(30,91,214,0.15)"}}>
          <div style={{fontSize:12,fontWeight:700,color:"var(--accent)",marginBottom:6}}>💡 טיפ</div>
          <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.6}}>הורד את Grab לפני הנסיעה — היא עובדת גם בלי SIM מקומי דרך WiFi. Bolt בדרך כלל זולה ב-10–20% מ-Grab.</div>
        </div>
      </div>
    </div>);
  }

  /* LINKS SCREEN */
  if(screen==="linksScreen"){
    const LSECS=[
      {title:"✈️ טיסות",items:[
        {name:"Skyscanner",url:"https://www.skyscanner.net",Icon:Plane,color:"#0770E3",desc:"השוואת טיסות"},
        {name:"Google Flights",url:"https://www.google.com/travel/flights",Icon:Plane,color:"#4285F4",desc:"חיפוש גוגל"},
        {name:"Kiwi.com",url:"https://www.kiwi.com",Icon:Route,color:"#00B7FF",desc:"שילוב חברות"},
        {name:"Wizzair",url:"https://wizzair.com",Icon:Plane,color:"#C6027B",desc:"טיסות זולות מ-TLV"},
      ]},
      {title:"🏨 לינה",items:[
        {name:"Booking.com",url:"https://www.booking.com",Icon:Hotel,color:"#003580",desc:"מלונות ודירות"},
        {name:"Airbnb",url:"https://www.airbnb.com",Icon:Palmtree,color:"#FF5A5F",desc:"דירות ייחודיות"},
        {name:"Agoda",url:"https://www.agoda.com",Icon:Hotel,color:"#5D3AB0",desc:"מלונות באסיה"},
        {name:"Hostelworld",url:"https://www.hostelworld.com",Icon:Users,color:"#F15D00",desc:"הוסטלים"},
      ]},
      {title:"🚂 תחבורה",items:[
        {name:"Rome2rio",url:"https://www.rome2rio.com",Icon:Route,color:"#FC4440",desc:"כל אמצעי תחבורה"},
        {name:"Trainline",url:"https://www.thetrainline.com",Icon:Navigation,color:"#00A693",desc:"רכבות אירופה"},
        {name:"Rentalcars",url:"https://www.rentalcars.com",Icon:Map,color:"#FF7526",desc:"השכרת רכב"},
        {name:"FlixBus",url:"https://www.flixbus.com",Icon:Bus,color:"#73D700",desc:"אוטובוסים אירופה"},
      ]},
      {title:"🛡️ שונות",items:[
        {name:"World Nomads",url:"https://www.worldnomads.com",Icon:Shield,color:"#00A878",desc:"ביטוח נסיעות"},
        {name:"Numbeo",url:"https://www.numbeo.com/cost-of-living/",Icon:DollarSign,color:"#55E6C1",desc:"עלות מחיה"},
        {name:"VisaHQ",url:"https://www.visahq.com",Icon:FileText,color:"#C8001B",desc:"דרישות ויזה"},
        {name:"TripAdvisor",url:"https://www.tripadvisor.com",Icon:Star,color:"#00A680",desc:"ביקורות ואטרקציות"},
      ]},
    ];
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 48px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>בית</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 4px",display:"flex",alignItems:"center",gap:8}}><Link2 size={22} style={{color:"var(--accent)"}}/>קישורים שימושיים</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:24}}>כל הכלים החיוניים לטיול · ללא הרשמה</p>
        {LSECS.map((sec,si)=>(
          <div key={si} style={{marginBottom:28}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--text2)",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:12}}>{sec.title}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {sec.items.map(({name,url,Icon,color,desc},i)=>(
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{...C,padding:"16px 14px",textDecoration:"none",display:"flex",flexDirection:"column",gap:8,borderColor:`${color}22`}}>
                  <div style={{width:40,height:40,borderRadius:13,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={20} color={color}/></div>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{name}</div>
                  <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.4}}>{desc}</div>
                  <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:600}}>פתח <ExternalLink size={10}/></div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>);
  }

  /* SYNC SETTINGS */
  if(screen==="syncSettings"){
    const isConn=!!githubToken;
    async function handleSave(){
      const t=tokenDraft.trim(),g=gistDraft.trim();
      setGithubToken(t);setGistId(g);
      localStorage.setItem('tt_gh_token',t);localStorage.setItem('tt_gist_id',g);
      if(!t){show("Disconnected");setScreen("home");return;}
      if(g){await loadFromGist(t,g);show("✓ Loaded from cloud!");}
      else{await saveToGist(trips,userName,t,'');show("✓ Connected!");}
      setScreen("home");
    }
    function handleDisconn(){
      setGithubToken('');setGistId('');setTokenDraft('');setGistDraft('');
      localStorage.removeItem('tt_gh_token');localStorage.removeItem('tt_gist_id');
      show("Disconnected");setScreen("home");
    }
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>Back</button>
        <h2 style={{fontSize:26,fontWeight:800,margin:"20px 0 8px",letterSpacing:"-0.5px",display:"flex",alignItems:"center",gap:10}}><Settings size={24} style={{color:"var(--accent)"}}/>Cloud Sync</h2>
        <p style={{fontSize:13,color:"var(--text2)",marginBottom:28}}>Save your data to a private GitHub Gist — syncs across all your devices</p>
        <div style={{...C,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:14,background:isConn?"rgba(0,229,160,.08)":"rgba(255,255,255,.03)",border:`1px solid ${isConn?"rgba(0,229,160,.3)":"var(--border)"}`,marginBottom:20}}>
            <div style={{width:9,height:9,borderRadius:"50%",background:isConn?"var(--accent)":"var(--text2)",flexShrink:0,boxShadow:isConn?"0 0 8px var(--accent)":"none"}}/>
            <span style={{fontSize:13,fontWeight:600,color:isConn?"var(--accent)":"var(--text2)"}}>{isConn?"Connected — GitHub Gist active":"Not connected"}</span>
          </div>
          <label style={L}>GitHub Personal Access Token</label>
          <input style={{...I,fontFamily:"monospace",fontSize:13,marginBottom:6}} type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" value={tokenDraft} onChange={e=>setTokenDraft(e.target.value)}/>
          <p style={{fontSize:11,color:"var(--text2)",marginBottom:16}}>Requires only the <strong style={{color:"var(--accent)"}}>gist</strong> scope</p>
          <label style={L}>Gist ID</label>
          <div style={{display:"flex",gap:8,marginBottom:6}}>
            <input style={{...I,fontFamily:"monospace",fontSize:12,flex:1}} placeholder="Auto-created on first save" value={gistDraft} onChange={e=>setGistDraft(e.target.value)}/>
            {gistDraft&&<button onClick={()=>copyTxt(gistDraft)} style={{width:44,borderRadius:14,border:"1px solid var(--border)",background:"var(--card)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Copy size={15} color="var(--text2)"/></button>}
          </div>
          <p style={{fontSize:11,color:"var(--text2)",marginBottom:20}}>Auto-filled after first sync · leave empty to create new</p>
          <button style={B1} onClick={handleSave}>Save &amp; Sync</button>
          {isConn&&<button style={{...B2,marginTop:10,color:"var(--red)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={handleDisconn}><X size={15}/>Disconnect</button>}
        </div>
        <div style={C}>
          <div style={{...L,marginBottom:14}}>How to get a GitHub token</div>
          {[["1","Open github.com/settings/tokens"],["2","Click 'Generate new token (classic)'"],["3","Name it: Trip Tracker"],["4","Check the 'gist' scope only"],["5","Click Generate — copy the token"],["6","Paste above → Save & Sync"]].map(([n,t])=>(
            <div key={n} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
              <div style={{width:22,height:22,borderRadius:7,background:"rgba(0,229,160,.15)",color:"var(--accent)",fontWeight:800,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{n}</div>
              <span style={{fontSize:12,color:"var(--text2)",lineHeight:1.6,paddingTop:2}}>{t}</span>
            </div>))}
          <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" style={{...B2,display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:10,textDecoration:"none",boxSizing:"border-box"}}><ExternalLink size={15}/>Open GitHub Tokens</a>
        </div>
      </div>
    </div>);
  }

  /* ADD TRIP */
  if(screen==="addTrip"){
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("myTrips")} style={BK}><ChevronLeft size={18}/>Back</button>
        <h2 style={{fontSize:26,fontWeight:800,margin:"20px 0 28px",letterSpacing:"-0.5px",display:"flex",alignItems:"center",gap:10}}><Plane size={24} style={{color:"var(--accent)"}}/>New Trip</h2>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          <div><label style={L}>Trip Name</label><input style={I} placeholder="Athens & Islands" value={newTrip.name} onChange={e=>setNewTrip(p=>({...p,name:e.target.value}))}/></div>
          <div><label style={L}>Country</label><input style={I} placeholder="Greece" value={newTrip.country} onChange={e=>setNewTrip(p=>({...p,country:e.target.value}))}/></div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1}}><label style={L}>Budget</label><input style={I} type="number" placeholder="2000" value={newTrip.budget} onChange={e=>setNewTrip(p=>({...p,budget:e.target.value}))}/></div>
            <div style={{width:110}}><label style={L}>Currency</label><select style={I} value={newTrip.currency} onChange={e=>setNewTrip(p=>({...p,currency:e.target.value}))}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}</select></div>
          </div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1}}><label style={L}>Start</label><input style={I} type="date" value={newTrip.startDate} onChange={e=>setNewTrip(p=>({...p,startDate:e.target.value}))}/></div>
            <div style={{flex:1}}><label style={L}>End</label><input style={I} type="date" value={newTrip.endDate} onChange={e=>setNewTrip(p=>({...p,endDate:e.target.value}))}/></div>
          </div>
          <button style={B1} onClick={createTrip}>Create Trip</button>
        </div>
      </div>
    </div>);
  }

  /* ═══════ TRIP SCREEN ═══════ */
  if(screen==="trip"&&trip){

    if(sub==="addExpense"||sub==="editExpense"){
      const isE=sub==="editExpense";const exp=isE?editExp:newExp;const setE=isE?setEditExp:setNewExp;
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <button onClick={()=>{setSub(null);setEditExp(null)}} style={BK}><ChevronLeft size={18}/>Back</button>
          <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}>{isE?<Pencil size={20}/>:<CreditCard size={20} style={{color:"var(--accent)"}}/>}{isE?"Edit":"New"} Expense</h2>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"flex",gap:12}}>
              <div style={{flex:1}}><label style={L}>Amount</label><input style={{...I,fontSize:28,fontWeight:800,textAlign:"center"}} type="number" step="0.01" placeholder="0.00" value={exp.amount} onChange={e=>setE(p=>({...p,amount:e.target.value}))} autoFocus/></div>
              <div style={{width:100}}><label style={L}>Currency</label><select style={I} value={exp.currency} onChange={e=>setE(p=>({...p,currency:e.target.value}))}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol}</option>)}</select></div>
            </div>
            <div><label style={L}>Category</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{CATS.map(c=>{const Icon=c.icon;return<button key={c.id} onClick={()=>setE(p=>({...p,category:c.id}))} style={{padding:"8px 12px",borderRadius:12,border:exp.category===c.id?`2px solid ${c.color}`:"1px solid var(--border)",background:exp.category===c.id?c.color+"15":"var(--card)",color:"var(--text)",cursor:"pointer",fontSize:11,fontFamily:"Inter",fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
                <Icon size={14} color={c.color}/>{c.name}</button>})}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>setE(p=>({...p,hasDate:!p.hasDate}))} style={{width:44,height:24,borderRadius:12,background:exp.hasDate?"var(--accent)":"var(--border)",border:"none",cursor:"pointer",position:"relative",transition:"background .2s"}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:2,left:exp.hasDate?22:2,transition:"left .2s"}}/></button>
              <span style={{fontSize:13,color:"var(--text2)",fontWeight:500}}>{exp.hasDate?"Date assigned":"General"}</span>
            </div>
            {exp.hasDate&&<input style={I} type="date" value={exp.date||""} onChange={e=>setE(p=>({...p,date:e.target.value}))}/>}
            <div><label style={L}>Note</label><input style={I} placeholder="What was it for?" value={exp.note} onChange={e=>setE(p=>({...p,note:e.target.value}))}/></div>
            <button style={B1} onClick={isE?updateExp:addExpense}>{isE?"Save":"Add Expense"}</button>
            {isE&&<button style={{...B2,color:"var(--red)"}} onClick={()=>{delExp(editExp.id);setEditExp(null);setSub(null)}}><Trash2 size={16} style={{marginRight:6}}/>Delete</button>}
          </div>
        </div>
      </div>);
    }

    if(sub==="addFriend"){const fr=trip.shared||[];return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
      <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
      <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><UserPlus size={20} style={{color:"var(--accent)"}}/>Add Friend</h2>
      <div style={{...C,marginBottom:16}}><label style={L}>Email</label><input style={I} type="email" placeholder="friend@email.com" value={shareEmail} onChange={e=>setShareEmail(e.target.value)}/>
        <div style={{display:"flex",gap:10,marginTop:14}}>{[["viewer","View Only",Eye],["editor","Can Edit",Pencil]].map(([r,l,Icon])=><button key={r} onClick={()=>setShareRole(r)} style={{flex:1,padding:12,borderRadius:14,border:shareRole===r?"2px solid var(--accent)":"1px solid var(--border)",background:shareRole===r?"rgba(0,229,160,.08)":"var(--card)",color:"var(--text)",cursor:"pointer",fontFamily:"Inter",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon size={16}/>{l}</button>)}</div>
        <button style={{...B1,marginTop:14}} onClick={addFriend}>Add to Trip</button></div>
      {fr.length>0&&<div style={C}><div style={{...L,marginBottom:14}}>Shared with</div>{fr.map((u,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderTop:i>0?"1px solid var(--border)":"none"}}>
        <div><div style={{fontWeight:600,fontSize:14}}>{u.email}</div><div style={{fontSize:12,color:"var(--text2)",display:"flex",alignItems:"center",gap:4,marginTop:2}}>{u.role==="editor"?<Pencil size={12}/>:<Eye size={12}/>}{u.role==="editor"?"Editor":"Viewer"}</div></div>
        <button onClick={()=>removeFriend(u.email)} style={{background:"none",border:"none",color:"var(--red)",cursor:"pointer"}}><X size={16}/></button></div>)}</div>}
    </div><TabBar/></div>);}

    if(sub==="editTrip"){const f=editTripForm||{name:trip.name,country:trip.country,budget:trip.budget,currency:trip.currency,startDate:trip.startDate,endDate:trip.endDate};if(!editTripForm)setEditTripForm(f);
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>{setSub(null);setEditTripForm(null)}} style={BK}><ChevronLeft size={18}/>Back</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><Pencil size={20}/>Edit Trip</h2>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={L}>Name</label><input style={I} value={f.name} onChange={e=>setEditTripForm(p=>({...p,name:e.target.value}))}/></div>
          <div><label style={L}>Country</label><input style={I} value={f.country} onChange={e=>setEditTripForm(p=>({...p,country:e.target.value}))}/></div>
          <div style={{display:"flex",gap:12}}><div style={{flex:1}}><label style={L}>Budget</label><input style={I} type="number" value={f.budget} onChange={e=>setEditTripForm(p=>({...p,budget:e.target.value}))}/></div>
            <div style={{width:110}}><label style={L}>Currency</label><select style={I} value={f.currency} onChange={e=>setEditTripForm(p=>({...p,currency:e.target.value}))}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}</select></div></div>
          <div style={{display:"flex",gap:12}}><div style={{flex:1}}><label style={L}>Start</label><input style={I} type="date" value={f.startDate} onChange={e=>setEditTripForm(p=>({...p,startDate:e.target.value}))}/></div>
            <div style={{flex:1}}><label style={L}>End</label><input style={I} type="date" value={f.endDate} onChange={e=>setEditTripForm(p=>({...p,endDate:e.target.value}))}/></div></div>
          <button style={B1} onClick={saveEditTrip}>Save Changes</button></div>
      </div><TabBar/></div>);}

    if(sub==="exportView"){
      const csv=getCSV();
      function dlCSV(){
        const bom='﻿';
        const blob=new Blob([bom+csv],{type:'text/csv;charset=utf-8;'});
        const url=URL.createObjectURL(blob);
        const a=document.createElement('a');
        a.href=url;
        a.download=`${(trip.name||'trip').replace(/[^a-z0-9]/gi,'_')}_expenses.csv`;
        document.body.appendChild(a);a.click();document.body.removeChild(a);
        URL.revokeObjectURL(url);
        show("Downloaded!");
      }
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
        <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><Download size={20} style={{color:"var(--accent)"}}/>Export</h2>
        <div style={{...C,marginBottom:16}}>
          <button style={{...B1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10}} onClick={dlCSV}><Download size={18}/>Download CSV File</button>
          <p style={{fontSize:11,color:"var(--text2)",marginTop:4,textAlign:"center"}}>Open in Excel, Google Sheets or Numbers</p>
        </div>
        <div style={{...C}}>
          <label style={L}>Preview</label>
          <textarea readOnly value={csv} style={{...I,minHeight:180,fontSize:10,fontFamily:"monospace",resize:"vertical"}} onClick={e=>e.target.select()}/>
        </div>
      </div><TabBar/></div>);
    }

    if(sub==="shareView"){const text=getShareText();return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
      <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
      <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><Share2 size={20} style={{color:"var(--accent)"}}/>Share</h2>
      <div style={{...C,marginBottom:16}}><div style={{background:"var(--bg)",borderRadius:14,padding:16,whiteSpace:"pre-line",fontSize:14,lineHeight:1.8,marginBottom:14}}>{text}</div>
        <button style={B1} onClick={()=>copyTxt(text)}><Copy size={16} style={{marginRight:6}}/>Copy</button></div>
      <div style={{...C}}><div style={{...L,marginBottom:12}}>Share via</div><div style={{display:"flex",gap:10}}>
        <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,...B2,padding:12,textAlign:"center",textDecoration:"none",fontSize:13}}>WhatsApp</a>
        <a href={`mailto:?subject=${encodeURIComponent(trip.name)}&body=${encodeURIComponent(text)}`} style={{flex:1,...B2,padding:12,textAlign:"center",textDecoration:"none",fontSize:13}}>Email</a>
        <a href={`https://t.me/share/url?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,...B2,padding:12,textAlign:"center",textDecoration:"none",fontSize:13}}>Telegram</a>
      </div></div>
    </div><TabBar/></div>);}

    if(sub==="docs"){
      const DOC_CATS=[
        {id:"flight",name:"Flight",Icon:Plane,color:"#686DE0"},
        {id:"insurance",name:"Insurance",Icon:Shield,color:"#74B9FF"},
        {id:"visa",name:"Visa",Icon:MapPin,color:"#00B894"},
        {id:"hotel",name:"Hotel",Icon:Hotel,color:"#6C5CE7"},
        {id:"transport",name:"Transport",Icon:Bus,color:"#22A6B3"},
        {id:"other",name:"Other",Icon:FileText,color:"#B2BEC3"},
      ];
      const docs=trip.docs||[];
      function handleFile(e){
        const f=e.target.files[0];if(!f)return;
        if(f.size>5*1024*1024){show("File too large (max 5MB)");e.target.value='';return;}
        const r=new FileReader();
        r.onload=ev=>{
          setTrips(p=>p.map(t=>t.id===activeTrip?{...t,docs:[...(t.docs||[]),{id:gid(),name:f.name,mimeType:f.type,size:f.size,data:ev.target.result,cat:docCat,addedAt:new Date().toISOString().slice(0,10)}]}:t));
          show("Document added!");
          e.target.value='';
        };
        r.readAsDataURL(f);
      }
      function viewDoc(doc){const a=document.createElement('a');a.href=doc.data;a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();document.body.removeChild(a);}
      function dlDoc(doc){const a=document.createElement('a');a.href=doc.data;a.download=doc.name;document.body.appendChild(a);a.click();document.body.removeChild(a);}
      function delDoc(id){setTrips(p=>p.map(t=>t.id===activeTrip?{...t,docs:(t.docs||[]).filter(d=>d.id!==id)}:t));show("Deleted");}
      function fSz(b){if(!b)return'';if(b<1024)return b+'B';if(b<1048576)return(b/1024).toFixed(0)+'KB';return(b/1048576).toFixed(1)+'MB'}
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
          <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}>
            <FileText size={20} style={{color:"var(--accent)"}}/>Documents{docs.length>0&&<span style={{fontSize:13,color:"var(--text2)",fontWeight:500,marginLeft:4}}>· {docs.length}</span>}
          </h2>
          <div style={{...C,marginBottom:16}}>
            <label style={L}>Category</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
              {DOC_CATS.map(c=>{const Icon=c.Icon;return(
                <button key={c.id} onClick={()=>setDocCat(c.id)} style={{padding:"8px 12px",borderRadius:12,border:docCat===c.id?`2px solid ${c.color}`:"1px solid var(--border)",background:docCat===c.id?c.color+"18":"var(--card)",color:"var(--text)",cursor:"pointer",fontSize:11,fontFamily:"Inter",fontWeight:600,display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
                  <Icon size={14} color={c.color}/>{c.name}</button>);})}
            </div>
            <input ref={fileInputRef} type="file" onChange={handleFile} style={{display:"none"}}/>
            <button style={{...B1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={()=>fileInputRef.current?.click()}>
              <Upload size={18}/>Choose File to Upload
            </button>
            <p style={{fontSize:11,color:"var(--text2)",textAlign:"center",marginTop:8}}>PDF, images, any format · Max 5MB per file</p>
          </div>
          {docs.length===0?<div style={{textAlign:"center",padding:"50px 20px",color:"var(--text2)"}}>
            <FileText size={52} strokeWidth={1} style={{marginBottom:14,opacity:.25}}/>
            <p style={{fontWeight:700,fontSize:15,color:"var(--text)",marginBottom:6}}>No documents yet</p>
            <p style={{fontSize:12}}>Upload flight tickets, insurance, visa & more</p>
          </div>:docs.map(doc=>{
            const cat=DOC_CATS.find(c=>c.id===doc.cat)||DOC_CATS[DOC_CATS.length-1];
            const isImg=doc.mimeType?.startsWith('image/');
            return(<div key={doc.id} style={{...C,marginBottom:10,display:"flex",alignItems:"center",gap:12,padding:"14px 16px"}}>
              {isImg?(
                <img src={doc.data} alt={doc.name} style={{width:48,height:48,borderRadius:12,objectFit:"cover",flexShrink:0}}/>
              ):(
                <div style={{width:48,height:48,borderRadius:14,background:`${cat.color}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <FileText size={22} color={cat.color}/>
                </div>
              )}
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,flexWrap:"wrap"}}>
                  <span style={{fontSize:10,background:`${cat.color}20`,color:cat.color,padding:"2px 8px",borderRadius:6,fontWeight:700}}>{cat.name}</span>
                  <span style={{fontSize:11,color:"var(--text2)"}}>{fSz(doc.size)}</span>
                  {doc.addedAt&&<span style={{fontSize:11,color:"var(--text2)"}}>· {doc.addedAt}</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <button onClick={()=>viewDoc(doc)} style={{width:34,height:34,borderRadius:11,border:"1px solid var(--border)",background:"var(--card)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}} title="Open"><Eye size={14} color="var(--accent)"/></button>
                <button onClick={()=>dlDoc(doc)} style={{width:34,height:34,borderRadius:11,border:"1px solid var(--border)",background:"var(--card)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}} title="Download"><Download size={14} color="var(--text2)"/></button>
                <button onClick={()=>delDoc(doc.id)} style={{width:34,height:34,borderRadius:11,border:"1px solid rgba(255,71,87,.2)",background:"rgba(255,71,87,.06)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}} title="Delete"><Trash2 size={14} color="var(--red)"/></button>
              </div>
            </div>);
          })}
        </div>
      <TabBar/></div>);
    }

    if(sub==="settings"){return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
      <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
      <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><Settings size={20}/>Settings</h2>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={C}><label style={L}>Your Name</label><input style={I} value={userName} onChange={e=>setUserName(e.target.value)}/></div>
        <div style={C}><label style={L}>Default Currency</label><select style={I} value={trip.currency} onChange={e=>setTrips(p=>p.map(t=>t.id===activeTrip?{...t,currency:e.target.value}:t))}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.name}</option>)}</select></div>
        <div style={C}><div style={{...L,marginBottom:12}}>Trip Info</div>
          {[["Country",trip.country||"—"],["Dates",`${trip.startDate||"—"} → ${trip.endDate||"—"}`],["Budget",trip.budget?fC(trip.budget,trip.currency):"—"],["Expenses",""+trip.expenses.length],["Shared",`${(trip.shared||[]).length} people`]].map(([k,v],i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:i?"1px solid var(--border)":"none",fontSize:13}}><span style={{color:"var(--text2)"}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>)}</div>
        <button style={{...B2,color:"var(--red)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={()=>{delTrip(trip.id);setScreen("myTrips");setSub(null)}}><Trash2 size={16}/>Delete Trip</button>
      </div></div><TabBar/></div>);}

    /* ═══ ENTRIES ═══ */
    if(tab==="entries"){
      const gr={};dated.forEach(e=>{if(!gr[e.date])gr[e.date]=[];gr[e.date].push(e)});
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"16px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <button onClick={()=>{setScreen("myTrips");setActiveTrip(null);setMenuOpen(false)}} style={BK}><ChevronLeft size={18}/>Trips</button>
          <div style={{position:"relative"}}>
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:8}}><MoreVertical size={20} color="var(--text2)"/></button>
            {menuOpen&&<><div onClick={()=>setMenuOpen(false)} style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:60}}/><div style={{position:"absolute",top:"100%",right:0,width:230,background:"rgba(20,24,32,0.98)",border:"1px solid var(--border)",borderRadius:18,boxShadow:"0 12px 40px rgba(0,0,0,.6)",zIndex:70,overflow:"hidden",backdropFilter:"blur(30px)",animation:"fadeUp .15s"}}>
              {[{Icon:UserPlus,l:"Add Friend",a:()=>{setSub("addFriend");setMenuOpen(false)}},{Icon:Pencil,l:"Edit Trip",a:()=>{setEditTripForm({name:trip.name,country:trip.country,budget:trip.budget,currency:trip.currency,startDate:trip.startDate,endDate:trip.endDate});setSub("editTrip");setMenuOpen(false)}},{Icon:FileText,l:"Documents",a:()=>{setSub("docs");setMenuOpen(false)}},{Icon:Download,l:"Export CSV",a:()=>{setSub("exportView");setMenuOpen(false)}},{Icon:Share2,l:"Share",a:()=>{setSub("shareView");setMenuOpen(false)}},{Icon:Settings,l:"Settings",a:()=>{setSub("settings");setMenuOpen(false)}}].map(({Icon,l,a},i)=>
                <button key={i} onClick={a} style={{width:"100%",padding:"14px 18px",background:"none",border:"none",borderTop:i?"1px solid var(--border)":"none",color:"#fff",cursor:"pointer",fontFamily:"Heebo,system-ui",fontSize:14,fontWeight:500,textAlign:"left",display:"flex",alignItems:"center",gap:12}}><Icon size={18} color="rgba(255,255,255,0.55)"/>{l}</button>)}
            </div></>}</div></div>

        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22}}>
          <span style={{fontSize:40,lineHeight:1}}>{gF(trip.country)}</span>
          <div style={{flex:1}}><h2 style={{fontSize:22,fontWeight:800,letterSpacing:"-0.4px"}}>{trip.name}</h2><p style={{fontSize:12,color:"var(--text2)",display:"flex",alignItems:"center",gap:4,marginTop:2}}><Clock size={12}/>{trip.startDate} → {trip.endDate||"?"}</p></div>
        </div>

        <div style={{...C,marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
            <div><div style={{fontSize:11,color:"var(--text2)",fontWeight:600,letterSpacing:"0.5px"}}>TOTAL SPENT</div><div style={{fontSize:30,fontWeight:800,color:"var(--accent)",letterSpacing:"-1px",marginTop:4}}>{fC(totalSpent,trip.currency)}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"var(--text2)",fontWeight:600,letterSpacing:"0.5px"}}>DAILY AVG</div><div style={{fontSize:18,fontWeight:700,marginTop:4}}>{fC(dailyAvg,trip.currency)}</div></div>
          </div>
          {trip.budget>0&&<div style={{marginTop:14}}><div style={{height:6,borderRadius:3,background:"var(--border)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${Math.min((totalSpent/trip.budget)*100,100)}%`,background:totalSpent>trip.budget?"var(--red)":"var(--accent)",transition:"width .4s"}}/></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginTop:5,color:"var(--text2)"}}><span>{fC(totalSpent,trip.currency)} of {fC(trip.budget,trip.currency)}</span><span style={{fontWeight:600,color:totalSpent>trip.budget?"var(--red)":"var(--accent)"}}>{totalSpent>trip.budget?"Over!":fC(trip.budget-totalSpent,trip.currency)+" left"}</span></div></div>}
        </div>

        {undated.length>0&&<div style={{marginBottom:18}}><div style={{fontSize:12,fontWeight:700,color:"var(--accent)",marginBottom:10,padding:"0 4px",display:"flex",alignItems:"center",gap:6,letterSpacing:"0.3px"}}><MapPin size={14}/>GENERAL · {fC(totalUndated,trip.currency)}</div>
          {undated.map(e=><ExpRow key={e.id} e={e} onClick={()=>{setEditExp({...e,hasDate:!!e.date});setSub("editExpense")}}/>)}</div>}

        {Object.keys(gr).sort((a,b)=>b.localeCompare(a)).map(date=>{const dt=gr[date].reduce((s,e)=>s+cv(e.amount,e.currency,trip.currency),0);return(<div key={date} style={{marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,padding:"0 4px"}}><span style={{fontSize:13,fontWeight:700,color:"var(--text2)"}}>{new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</span><span style={{fontSize:12,fontWeight:600,color:"var(--text2)"}}>{fC(dt,trip.currency)}</span></div>
          {gr[date].map(e=><ExpRow key={e.id} e={e} onClick={()=>{setEditExp({...e,hasDate:true});setSub("editExpense")}}/>)}</div>)})}

        {trip.expenses.length===0&&<div style={{textAlign:"center",padding:50,color:"var(--text2)"}}><Receipt size={48} strokeWidth={1} style={{marginBottom:12,opacity:.3}}/><p style={{fontWeight:600}}>No expenses yet</p></div>}

        <button onClick={()=>{setNewExp({amount:"",category:"food",currency:trip.currency,note:"",date:new Date().toISOString().slice(0,10),hasDate:true});setSub("addExpense")}}
          style={{position:"fixed",bottom:80,right:20,width:56,height:56,borderRadius:18,border:"none",background:"var(--accent)",color:"#000",fontSize:24,cursor:"pointer",boxShadow:"0 6px 24px rgba(0,229,160,.3)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:40}}><Plus size={24} strokeWidth={3}/></button>
      </div><TabBar/></div>);
    }

    /* ═══ STATS ═══ */
    if(tab==="stats"){
      const byD={};dated.forEach(e=>{byD[e.date]=(byD[e.date]||0)+cv(e.amount,e.currency,trip.currency)});const ds=Object.keys(byD).sort();const mx=Math.max(...Object.values(byD),1);
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"16px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:22,display:"flex",alignItems:"center",gap:8}}><TrendingUp size={22} style={{color:"var(--accent)"}}/>Statistics</h2>
        <div style={{...C,marginBottom:16}}><Pie data={catBreak}/></div>
        {ds.length>0&&<div style={{...C,marginBottom:16}}><div style={{...L,marginBottom:14}}>Daily Spending</div>
          {ds.map(d=><div key={d} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:11,color:"var(--text2)",width:60,textAlign:"right",flexShrink:0}}>{d.slice(5)}</span>
            <div style={{flex:1,height:22,background:"var(--border)",borderRadius:6,overflow:"hidden"}}><div style={{height:"100%",width:`${(byD[d]/mx)*100}%`,background:"linear-gradient(90deg,var(--accent),#00B894)",borderRadius:6}}/></div>
            <span style={{fontSize:12,fontWeight:600,width:70,textAlign:"right"}}>{fC(byD[d],trip.currency)}</span></div>)}</div>}
        <div style={{...C,marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{l:"Total",v:fC(totalSpent,trip.currency),c:"var(--accent)"},{l:"Daily",v:fC(dailyAvg,trip.currency),c:"var(--blue)"},{l:"Dated",v:fC(totalDated,trip.currency),c:"#F9CA24"},{l:"General",v:fC(totalUndated,trip.currency),c:"#FD79A8"},{l:"Entries",v:trip.expenses.length,c:"#A29BFE"},{l:"Categories",v:catBreak.length,c:"#55E6C1"}].map((s,i)=>
              <div key={i} style={{padding:14,background:"var(--bg)",borderRadius:14,textAlign:"center",border:"1px solid var(--border)"}}>
                <div style={{fontSize:11,color:"var(--text2)",marginBottom:4,fontWeight:600}}>{s.l}</div>
                <div style={{fontSize:19,fontWeight:800,color:s.c}}>{s.v}</div></div>)}</div>
        </div>
        <button style={B1} onClick={()=>setSub("exportView")}><Download size={16} style={{marginRight:6}}/>Export to Excel</button>
      </div><TabBar/></div>);
    }

    /* ═══ XE ═══ */
    if(tab==="xe"){
      const res=cv(parseFloat(convAmt)||0,convFrom,convTo);const rate=cv(1,convFrom,convTo);
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"16px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:22,display:"flex",alignItems:"center",gap:8}}><ArrowLeftRight size={22} style={{color:"var(--accent)"}}/>Exchange</h2>
        <div style={{...C,marginBottom:16}}>
          <input style={{...I,fontSize:30,fontWeight:800,textAlign:"center",marginBottom:16,background:"transparent"}} type="number" step="0.01" value={convAmt} onChange={e=>setConvAmt(e.target.value)}/>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}>
            <div style={{flex:1}}><select style={I} value={convFrom} onChange={e=>setConvFrom(e.target.value)}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}</select></div>
            <button onClick={()=>{setConvFrom(convTo);setConvTo(convFrom)}} style={{width:40,height:40,borderRadius:14,border:"1px solid var(--border)",background:"var(--card)",color:"var(--accent)",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowLeftRight size={18}/></button>
            <div style={{flex:1}}><select style={I} value={convTo} onChange={e=>setConvTo(e.target.value)}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}</select></div>
          </div>
          <div style={{background:"var(--bg)",borderRadius:16,padding:20,textAlign:"center",border:"1px solid var(--border)"}}>
            <div style={{fontSize:34,fontWeight:800,color:"var(--accent)",letterSpacing:"-1px"}}>{fC(res,convTo)}</div>
            <div style={{fontSize:12,color:"var(--text2)",marginTop:6}}>1 {convFrom} = {rate.toFixed(4)} {convTo}</div>
          </div>
          {ratesTime&&<div style={{fontSize:11,color:"var(--accent)",textAlign:"center",marginTop:10,fontWeight:600}}>✓ Live · {ratesTime}</div>}
        </div>
        <div style={C}><div style={{...L,marginBottom:12}}>Quick Rates</div>
          {CURRS.filter(c=>c.code!==convFrom).slice(0,8).map(c=>{const r=cv(1,convFrom,c.code);return(
            <div key={c.code} onClick={()=>setConvTo(c.code)} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--border)",cursor:"pointer",fontSize:13}}>
              <span style={{fontWeight:500}}>{c.symbol} {c.code}</span><span style={{fontWeight:700}}>{r.toFixed(c.code==="JPY"?2:4)}</span></div>)})}
        </div>
      </div><TabBar/></div>);
    }

    /* ═══ TRANSLATE ═══ */
    if(tab==="translate"){
      const fl=LANGS.find(l=>l.code===trFrom),tl=LANGS.find(l=>l.code===trTo);
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"16px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:4,display:"flex",alignItems:"center",gap:8}}><Globe size={22} style={{color:"var(--accent)"}}/>Translate</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:18}}>Powered by Google Translate · Free · No API key needed</p>
        <div style={{...C,marginBottom:16}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}>
            <div style={{flex:1}}><select style={I} value={trFrom} onChange={e=>setTrFrom(e.target.value)}>{LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}</select></div>
            <button onClick={()=>{setTrFrom(trTo);setTrTo(trFrom);setTrResult("")}} style={{width:40,height:40,borderRadius:14,border:"1px solid var(--border)",background:"var(--card)",color:"var(--accent)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowLeftRight size={18}/></button>
            <div style={{flex:1}}><select style={I} value={trTo} onChange={e=>setTrTo(e.target.value)}>{LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}</select></div>
          </div>
          <textarea style={{...I,minHeight:70,resize:"vertical",marginBottom:12}} placeholder={`Type in ${fl?.name||""}...`} value={trText} onChange={e=>setTrText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();doTranslate(trText)}}}/>
          <button style={{...B1,opacity:trLoading?.6:1}} onClick={()=>doTranslate(trText)} disabled={trLoading}>{trLoading?"Translating...":"Translate"}</button>
          {trResult&&<div style={{background:"var(--bg)",borderRadius:16,padding:16,marginTop:16,border:"1px solid var(--border)"}}>
            <div style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid var(--border)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:11,color:"var(--text2)"}}>{fl?.flag} {fl?.name}</span>
                <button onClick={()=>speak(trText,trFrom)} style={{background:"none",border:"1px solid var(--border)",borderRadius:10,padding:"4px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--accent)",fontFamily:"Inter"}}><Volume2 size={14}/>Play</button></div>
              <div style={{fontSize:13,color:"var(--text2)"}}>{trText}</div></div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:11,color:"var(--accent)",fontWeight:700}}>{tl?.flag} {tl?.name}</span>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>copyTxt(trResult)} style={{background:"none",border:"1px solid var(--border)",borderRadius:10,padding:"5px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--text2)",fontFamily:"Inter"}}><Copy size={13}/>Copy</button>
                <button onClick={()=>speak(trResult,trTo)} style={{background:"var(--accent)",border:"none",borderRadius:10,padding:"6px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#000",fontWeight:700,fontFamily:"Inter"}}><Volume2 size={14}/>Listen</button>
              </div>
            </div>
            <div style={{fontSize:20,fontWeight:700,lineHeight:1.5,direction:"auto"}}>{trResult}</div>
          </div>}
        </div>
        <div style={C}><div style={{...L,marginBottom:12}}>Quick Phrases</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>{PHRASES.map((p,i)=><button key={i} onClick={()=>{setTrText(p);doTranslate(p)}} style={{textAlign:"left",padding:"10px 14px",borderRadius:12,border:"1px solid var(--border)",background:"var(--card)",color:"var(--text)",cursor:"pointer",fontSize:12,fontFamily:"Inter",fontWeight:500}}>{p}</button>)}</div>
        </div>
      </div><TabBar/></div>);
    }

    /* ═══ DISCOVER ═══ */
    if(tab==="discover"){
      const dest=trip.country||"";
      const q=encodeURIComponent(dest);
      const DISC=[
        {name:"Google Maps",url:`https://www.google.com/maps/search/${q}`,Icon:Map,color:"#4285F4",desc:"Navigate & explore"},
        {name:"TripAdvisor",url:`https://www.tripadvisor.com/Search?q=${q}`,Icon:Star,color:"#00A680",desc:"Reviews & top attractions"},
        {name:"Booking.com",url:`https://www.booking.com/searchresults.html?ss=${q}`,Icon:Hotel,color:"#003580",desc:"Hotels & stays"},
        {name:"Airbnb",url:`https://www.airbnb.com/s/${q}`,Icon:Palmtree,color:"#FF5A5F",desc:"Apartments & unique stays"},
        {name:"Flights",url:`https://www.google.com/travel/flights`,Icon:Plane,color:"#686DE0",desc:"Find cheap flights"},
        {name:"Restaurants",url:`https://www.google.com/maps/search/restaurants+in+${q}`,Icon:Utensils,color:"#FF6B6B",desc:"Best food nearby"},
        {name:"Attractions",url:`https://www.google.com/maps/search/tourist+attractions+in+${q}`,Icon:Landmark,color:"#E17055",desc:"Must-see sights"},
        {name:"YouTube",url:`https://www.youtube.com/results?search_query=${q}+travel+guide`,Icon:Camera,color:"#FF0000",desc:"Video travel guides"},
        {name:"Weather",url:`https://www.weather.com/weather/today/l/${q}`,Icon:Sun,color:"#FFC107",desc:"Local weather forecast"},
        {name:"Translate",url:`https://translate.google.com/?sl=auto&tl=en`,Icon:Globe,color:"#00B894",desc:"Google Translate"},
        {name:"Cost of Living",url:`https://www.numbeo.com/cost-of-living/in/${dest.replace(/ /g,"-")}`,Icon:DollarSign,color:"#55E6C1",desc:"Budget & prices guide"},
        {name:"Directions",url:`https://www.google.com/maps/dir/?api=1&destination=${q}`,Icon:Navigation,color:"#A29BFE",desc:"Get directions"},
      ];
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"16px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:4,display:"flex",alignItems:"center",gap:8}}><Globe2 size={22} style={{color:"var(--accent)"}}/>Discover {dest}</h2>
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:20}}>Travel resources · No sign-in required</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {DISC.map(({name,url,Icon,color,desc},i)=>(
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              style={{...C,padding:"16px 14px",textDecoration:"none",display:"flex",flexDirection:"column",gap:8,borderColor:`${color}22`,animation:`fadeUp .3s ease ${i*0.03}s both`}}>
              <div style={{width:40,height:40,borderRadius:13,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon size={20} color={color}/>
              </div>
              <div style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{name}</div>
              <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.4}}>{desc}</div>
              <div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:600}}>Open <ExternalLink size={10}/></div>
            </a>
          ))}
        </div>
      </div><TabBar/></div>);
    }
  }

  return null;
}
