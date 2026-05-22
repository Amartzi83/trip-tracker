import { useState, useEffect, useMemo } from "react";
import { Plane, Plus, ChevronLeft, MoreVertical, ArrowLeftRight, Globe, Receipt, TrendingUp, Coffee, UtensilsCrossed, ShoppingBag, Hotel, Bus, Wine, HeartPulse, Smartphone, Gift, Shield, Shirt, MapPin, Ticket, Camera, Music, Landmark, Palmtree, Eye, Pencil, Download, Share2, Settings, Trash2, UserPlus, Volume2, X, Clock, CreditCard, Wallet, Users, Copy, ExternalLink, ChevronRight, Compass, Utensils, Beer, Baby, ShoppingCart, TreePine, Waves, Gem, Map, Route, DollarSign, Navigation, Globe2, Star, Sun } from "lucide-react";

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
function dBtw(a,b){return Math.max(1,Math.ceil((new Date(b)-new Date(a))/864e5)+1)}
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
  const[trips,setTrips]=useState(()=>{try{const s=localStorage.getItem('tt_trips');if(s){const p=JSON.parse(s);if(p.length)return p;}}catch{}return[{id:"d1",name:"Athens & Islands",country:"Greece",budget:2000,currency:"USD",startDate:"2026-04-01",endDate:"2026-04-14",shared:[],expenses:[{id:"e1",amount:320,category:"flights",currency:"USD",note:"Round-trip",date:""},{id:"e2",amount:55,category:"insurance",currency:"USD",note:"Travel insurance",date:""},{id:"e3",amount:45,category:"food",currency:"EUR",note:"Dinner in Athens",date:"2026-04-02"},{id:"e4",amount:120,category:"accommodation",currency:"EUR",note:"Airbnb",date:"2026-04-02"},{id:"e5",amount:25,category:"tours",currency:"EUR",note:"Acropolis",date:"2026-04-03"},{id:"e6",amount:4.5,category:"coffee",currency:"EUR",note:"Cappuccino",date:"2026-04-03"},{id:"e7",amount:35,category:"groceries",currency:"EUR",note:"Super market",date:"2026-04-04"},{id:"e8",amount:60,category:"gifts",currency:"EUR",note:"Souvenirs",date:"2026-04-04"}]}];});
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
  useEffect(()=>{try{localStorage.setItem('tt_trips',JSON.stringify(trips))}catch{}},[trips]);
  useEffect(()=>{try{localStorage.setItem('tt_userName',userName)}catch{}},[userName]);
  useEffect(()=>{(async()=>{try{const r=await fetch("https://open.er-api.com/v6/latest/USD");const d=await r.json();if(d?.rates){setRates(d.rates);setRatesTime(new Date().toLocaleTimeString())}}catch{}})()},[]);
  useEffect(()=>{if(window.speechSynthesis){window.speechSynthesis.getVoices()}},[]);

  function cv(a,f,t){if(f===t)return a;return a/(rates[f]||1)*(rates[t]||1)}
  function speak(text,lang){if(!text)return;const lm={en:"en",he:"iw",th:"th",es:"es",fr:"fr",de:"de",it:"it",pt:"pt",ja:"ja",zh:"zh-CN",ko:"ko",ar:"ar",tr:"tr",ru:"ru",hi:"hi",vi:"vi",el:"el",nl:"nl"};const tl=lm[lang]||lang;
    const audio=new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(text.slice(0,200))}`);
    audio.play().catch(()=>{if(window.speechSynthesis){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=tl;u.rate=0.85;window.speechSynthesis.speak(u)}})}
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
  function delTrip(id){setTrips(p=>p.filter(t=>t.id!==id));if(activeTrip===id){setActiveTrip(null);setScreen("home")}}
  function addExpense(){if(!newExp.amount||!trip)return;setTrips(p=>p.map(t=>t.id===activeTrip?{...t,expenses:[...t.expenses,{id:gid(),amount:parseFloat(newExp.amount),category:newExp.category,currency:newExp.currency,note:newExp.note,date:newExp.hasDate?newExp.date:""}]}:t));setNewExp({amount:"",category:"food",currency:trip.currency,note:"",date:new Date().toISOString().slice(0,10),hasDate:true});setSub(null);show("Added!")}
  function updateExp(){if(!editExp)return;setTrips(p=>p.map(t=>t.id===activeTrip?{...t,expenses:t.expenses.map(e=>e.id===editExp.id?{...editExp,amount:parseFloat(editExp.amount),date:editExp.hasDate?editExp.date:""}:e)}:t));setEditExp(null);setSub(null)}
  function delExp(id){setTrips(p=>p.map(t=>t.id===activeTrip?{...t,expenses:t.expenses.filter(e=>e.id!==id)}:t))}
  function addFriend(){if(!shareEmail.trim()||!trip)return;const u={email:shareEmail.trim(),role:shareRole};setTrips(p=>p.map(t=>t.id===activeTrip?{...t,shared:[...(t.shared||[]),u]}:t));setShareEmail("");show(`Added ${u.email}`)}
  function removeFriend(email){setTrips(p=>p.map(t=>t.id===activeTrip?{...t,shared:(t.shared||[]).filter(u=>u.email!==email)}:t))}
  function saveEditTrip(){if(!editTripForm)return;setTrips(p=>p.map(t=>t.id===activeTrip?{...t,...editTripForm,budget:parseFloat(editTripForm.budget)||0}:t));setEditTripForm(null);setSub(null);show("Updated!")}
  function getCSV(){if(!trip)return"";const r=[["Date","Category","Amount","Currency",`Converted(${trip.currency})`,"Note","Type"]];trip.expenses.forEach(e=>{const c=CATS.find(x=>x.id===e.category);r.push([e.date||"General",c?.name||e.category,e.amount,e.currency,cv(e.amount,e.currency,trip.currency).toFixed(2),e.note,e.date?"Dated":"General"])});return r.map(r=>r.map(c=>`"${c}"`).join(",")).join("\n")}
  function getShareText(){if(!trip)return"";return`✈️ ${trip.name}\n📅 ${trip.startDate||"?"} → ${trip.endDate||"?"}\n💰 ${fC(totalSpent,trip.currency)}\n📊 Budget: ${trip.budget?fC(trip.budget,trip.currency):"N/A"}\n📝 ${trip.expenses.length} expenses`}

  // ─── Translate via MyMemory (free, no API key) ───
  async function doTranslate(text){
    if(!text.trim())return;
    setTrLoading(true);setTrResult("");
    try{
      const url=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${trFrom}|${trTo}`;
      const r=await fetch(url);
      const d=await r.json();
      const tr=d?.responseData?.translatedText||"";
      if(tr&&d.responseStatus===200){
        setTrResult(tr);
        const fl=LANGS.find(l=>l.code===trFrom)?.name;
        const tl=LANGS.find(l=>l.code===trTo)?.name;
        setTrHistory(h=>[{fl,tl,orig:text.trim(),trans:tr},...h].slice(0,20));
      }else{
        setTrResult(d?.responseDetails||"Could not translate. Try again.");
      }
    }catch{setTrResult("Connection error")}
    setTrLoading(false);
  }

  /* ═══════ STYLES ═══════ */
  const COUNTRY_GRADIENTS={"Greece":"linear-gradient(135deg,#0D5EAF,#009FDB)","India":"linear-gradient(135deg,#FF9933,#128807)","Thailand":"linear-gradient(135deg,#ED1C24,#241D4F)","Japan":"linear-gradient(135deg,#BC002D,#FFFFFF22)","Italy":"linear-gradient(135deg,#009246,#CE2B37)","Spain":"linear-gradient(135deg,#AA151B,#F1BF00)","France":"linear-gradient(135deg,#002395,#ED2939)","Turkey":"linear-gradient(135deg,#E30A17,#FFFFFF22)","Israel":"linear-gradient(135deg,#0038B8,#FFFFFF22)","UK":"linear-gradient(135deg,#00247D,#CF142B)","Germany":"linear-gradient(135deg,#000000,#DD0000)","USA":"linear-gradient(135deg,#3C3B6E,#B22234)","Portugal":"linear-gradient(135deg,#006600,#FF0000)","Netherlands":"linear-gradient(135deg,#AE1C28,#21468B)","Vietnam":"linear-gradient(135deg,#DA251D,#FFCD00)","Australia":"linear-gradient(135deg,#002868,#FFFFFF22)","Canada":"linear-gradient(135deg,#FF0000,#FFFFFF22)","Morocco":"linear-gradient(135deg,#C1272D,#006233)","Croatia":"linear-gradient(135deg,#FF0000,#171796)","Switzerland":"linear-gradient(135deg,#FF0000,#FFFFFF22)"};
  function getCountryGrad(c){return COUNTRY_GRADIENTS[c]||"linear-gradient(135deg,#1a1a3e,#0f2027)"}
  const css=`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    :root{--bg:#05060B;--surface:#0C0E15;--card:rgba(255,255,255,0.035);--card2:rgba(255,255,255,0.06);--border:rgba(255,255,255,0.06);--text:#F2F3F7;--text2:rgba(255,255,255,0.4);--accent:#00E5A0;--red:#FF4757;--blue:#5B7FFF;--gold:#FFD700}
    *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}input,select,textarea,button{font-family:'Inter',sans-serif}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,229,160,.15)}50%{box-shadow:0 0 40px rgba(0,229,160,.3)}}
    ::selection{background:var(--accent);color:#000}`;
  const I={width:"100%",padding:"14px 16px",borderRadius:14,border:"1px solid var(--border)",background:"rgba(255,255,255,0.035)",color:"var(--text)",fontSize:15,outline:"none",transition:"border-color .2s"};
  const B1={width:"100%",padding:"16px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#00E5A0,#00C9DB)",color:"#000",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"Inter",letterSpacing:"-0.3px",boxShadow:"0 4px 24px rgba(0,229,160,.2)"};
  const B2={...B1,background:"var(--card2)",color:"var(--text)",border:"1px solid var(--border)",boxShadow:"none"};
  const C={background:"var(--card)",borderRadius:22,padding:20,border:"1px solid var(--border)",backdropFilter:"blur(20px)"};
  const L={fontSize:10,color:"var(--text2)",marginBottom:8,display:"block",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:700};
  const BK={background:"none",border:"none",color:"var(--accent)",fontSize:14,cursor:"pointer",fontFamily:"Inter",fontWeight:700,display:"flex",alignItems:"center",gap:4};
  const toastEl=toast?<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#00E5A0,#00C9DB)",color:"#000",padding:"12px 28px",borderRadius:50,fontWeight:800,fontSize:13,zIndex:999,boxShadow:"0 8px 32px rgba(0,229,160,.3)"}}>{toast}</div>:null;

  /* ═══════ TAB BAR ═══════ */
  function TabBar(){
    const tabs=[{id:"entries",Icon:Receipt,l:"Entries"},{id:"stats",Icon:TrendingUp,l:"Stats"},{id:"xe",Icon:ArrowLeftRight,l:"XE"},{id:"translate",Icon:Globe,l:"Translate"},{id:"discover",Icon:Globe2,l:"Discover"}];
    return(<div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(5,6,11,0.92)",backdropFilter:"blur(24px) saturate(180%)",borderTop:"1px solid rgba(255,255,255,0.04)",display:"flex",zIndex:50,paddingBottom:"env(safe-area-inset-bottom)"}}>
      {tabs.map(({id,Icon,l})=><button key={id} onClick={()=>{setTab(id);setSub(null)}} style={{flex:1,padding:"10px 0 8px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:tab===id?"var(--accent)":"var(--text2)",transition:"all .2s",position:"relative"}}>
        {tab===id&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,borderRadius:1,background:"var(--accent)"}}/>}
        <Icon size={20} strokeWidth={tab===id?2.5:1.5}/><span style={{fontSize:9,fontWeight:tab===id?800:500,letterSpacing:"0.5px"}}>{l}</span>
      </button>)}
    </div>);
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
  /* HOME */
  if(screen==="home"){
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 40px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <div>
            <div style={{fontSize:10,color:"var(--text2)",fontWeight:700,letterSpacing:"1.5px",marginBottom:6,textTransform:"uppercase"}}>Welcome back</div>
            {editingName?<input autoFocus style={{...I,fontSize:26,fontWeight:900,padding:"4px 8px",width:220,background:"transparent",border:"1px solid var(--accent)"}} value={userName} onChange={e=>setUserName(e.target.value)} onBlur={()=>setEditingName(false)} onKeyDown={e=>{if(e.key==="Enter")setEditingName(false)}}/>
            :<h1 onClick={()=>setEditingName(true)} style={{fontSize:28,fontWeight:900,letterSpacing:"-0.7px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>{userName}<Plane size={24} style={{color:"var(--accent)",transform:"rotate(-20deg)"}}/></h1>}
          </div>
          <div style={{width:44,height:44,borderRadius:16,background:"linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--border)",backdropFilter:"blur(10px)"}}><Wallet size={18} color="var(--text2)"/></div>
        </div>

        <button onClick={()=>setScreen("addTrip")} style={{width:"100%",padding:"20px 24px",borderRadius:22,border:"none",background:"linear-gradient(135deg,rgba(255,71,87,0.12),rgba(255,71,87,0.04))",color:"var(--red)",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"Inter",marginBottom:28,display:"flex",alignItems:"center",justifyContent:"center",gap:14,letterSpacing:"-0.3px",boxShadow:"inset 0 0 0 1.5px rgba(255,71,87,0.25)",transition:"all .15s"}}>
          <div style={{width:40,height:40,borderRadius:14,background:"linear-gradient(135deg,#FF4757,#FF6B81)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(255,71,87,.25)"}}><Plus size={22} color="#fff" strokeWidth={3}/></div>Add New Trip
        </button>

        {trips.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:"var(--text2)"}}>
          <div style={{width:80,height:80,borderRadius:24,background:"var(--card)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",border:"1px solid var(--border)"}}><Globe size={36} strokeWidth={1} style={{opacity:.4}}/></div>
          <p style={{fontSize:18,fontWeight:800,color:"var(--text)",marginBottom:8,letterSpacing:"-0.3px"}}>No trips yet</p><p style={{fontSize:13}}>Create your first trip to start tracking expenses</p>
        </div>}

        {trips.map((t,ti)=>{
          const spent=t.expenses.reduce((s,e)=>s+cv(e.amount,e.currency,t.currency),0);
          const days=t.startDate&&t.endDate?dBtw(t.startDate,t.endDate):null;
          const perDay=days?spent/days:0;
          const pct=t.budget>0?Math.min((spent/t.budget)*100,100):0;
          const over=spent>t.budget&&t.budget>0;
          const grad=getCountryGrad(t.country);
          return(
            <div key={t.id} onClick={()=>{setActiveTrip(t.id);setScreen("trip");setTab("entries");setSub(null)}}
              style={{marginBottom:16,cursor:"pointer",position:"relative",animation:`fadeUp .4s ease ${ti*0.06}s both`,borderRadius:24,overflow:"hidden",border:"1px solid var(--border)"}}>
              <div style={{background:grad,padding:"20px 20px 32px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%)"}}/>
                <div style={{position:"relative",zIndex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:42,lineHeight:1,marginBottom:8,filter:"drop-shadow(0 2px 8px rgba(0,0,0,.3))"}}>{gF(t.country)}</div>
                      <div style={{fontWeight:900,fontSize:22,letterSpacing:"-0.5px",textShadow:"0 2px 8px rgba(0,0,0,.3)"}}>{t.name}</div>
                    </div>
                    <button onClick={e=>{e.stopPropagation();delTrip(t.id)}} style={{background:"rgba(0,0,0,0.3)",border:"none",borderRadius:10,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(10px)"}}><X size={14} color="#fff"/></button>
                  </div>
                </div>
              </div>
              <div style={{background:"var(--surface)",padding:"16px 20px 18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{display:"flex",gap:14,fontSize:12,color:"var(--text2)"}}>
                    <span style={{display:"flex",alignItems:"center",gap:4}}><Clock size={13}/>{t.startDate?`${t.startDate.slice(5)} → ${(t.endDate||"?").slice(5)}`:"No dates"}</span>
                    <span style={{display:"flex",alignItems:"center",gap:4}}><Receipt size={13}/>{t.expenses.length}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--text2)"}}><Users size={12}/>{userName}</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <div style={{fontSize:26,fontWeight:900,color:"var(--accent)",letterSpacing:"-0.8px"}}>{fC(spent,t.currency)}</div>
                  {perDay>0&&<div style={{fontSize:13,color:"var(--text2)",fontWeight:600}}>{fC(perDay,t.currency)}<span style={{opacity:.5,fontWeight:400}}> /day</span></div>}
                </div>
                {t.budget>0&&<div style={{marginTop:12}}>
                  <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${pct}%`,background:over?"linear-gradient(90deg,#FF4757,#FF6B81)":"linear-gradient(90deg,#00E5A0,#00C9DB)",transition:"width .5s",boxShadow:over?"0 0 12px rgba(255,71,87,.3)":"0 0 12px rgba(0,229,160,.2)"}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginTop:5,color:"var(--text2)"}}><span>{pct.toFixed(0)}% used</span><span style={{fontWeight:700,color:over?"var(--red)":"var(--accent)"}}>{over?"Over budget":fC(t.budget-spent,t.currency)+" left"}</span></div>
                </div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>);
  }

  /* ADD TRIP */
  if(screen==="addTrip"){
    return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px"}}><style>{css}</style>{toastEl}
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <button onClick={()=>setScreen("home")} style={BK}><ChevronLeft size={18}/>Back</button>
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

    if(sub==="exportView"){const csv=getCSV();return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
      <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
      <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><Download size={20} style={{color:"var(--accent)"}}/>Export</h2>
      <div style={{...C,marginBottom:16}}><textarea readOnly value={csv} style={{...I,minHeight:200,fontSize:11,fontFamily:"monospace",resize:"vertical"}} onClick={e=>e.target.select()}/><button style={{...B1,marginTop:14}} onClick={()=>copyTxt(csv)}><Copy size={16} style={{marginRight:6}}/>Copy CSV</button>
        <p style={{fontSize:11,color:"var(--text2)",marginTop:8,textAlign:"center"}}>Paste into Excel or Google Sheets</p></div>
    </div><TabBar/></div>);}

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

    if(sub==="settings"){return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"24px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
      <button onClick={()=>setSub(null)} style={BK}><ChevronLeft size={18}/>Back</button>
      <h2 style={{fontSize:22,fontWeight:800,margin:"16px 0 24px",display:"flex",alignItems:"center",gap:8}}><Settings size={20}/>Settings</h2>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={C}><label style={L}>Your Name</label><input style={I} value={userName} onChange={e=>setUserName(e.target.value)}/></div>
        <div style={C}><label style={L}>Default Currency</label><select style={I} value={trip.currency} onChange={e=>setTrips(p=>p.map(t=>t.id===activeTrip?{...t,currency:e.target.value}:t))}>{CURRS.map(c=><option key={c.code} value={c.code}>{c.symbol} {c.name}</option>)}</select></div>
        <div style={C}><div style={{...L,marginBottom:12}}>Trip Info</div>
          {[["Country",trip.country||"—"],["Dates",`${trip.startDate||"—"} → ${trip.endDate||"—"}`],["Budget",trip.budget?fC(trip.budget,trip.currency):"—"],["Expenses",""+trip.expenses.length],["Shared",`${(trip.shared||[]).length} people`]].map(([k,v],i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:i?"1px solid var(--border)":"none",fontSize:13}}><span style={{color:"var(--text2)"}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>)}</div>
        <button style={{...B2,color:"var(--red)",display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={()=>{delTrip(trip.id);setScreen("home");setSub(null)}}><Trash2 size={16}/>Delete Trip</button>
      </div></div><TabBar/></div>);}

    /* ═══ ENTRIES ═══ */
    if(tab==="entries"){
      const gr={};dated.forEach(e=>{if(!gr[e.date])gr[e.date]=[];gr[e.date].push(e)});
      return(<div style={{minHeight:"100vh",background:"var(--bg)",padding:"16px 16px 100px"}}><style>{css}</style>{toastEl}<div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <button onClick={()=>{setScreen("home");setActiveTrip(null);setMenuOpen(false)}} style={BK}><ChevronLeft size={18}/>Trips</button>
          <div style={{position:"relative"}}>
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:8}}><MoreVertical size={20} color="var(--text2)"/></button>
            {menuOpen&&<><div onClick={()=>setMenuOpen(false)} style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:60}}/><div style={{position:"absolute",top:"100%",right:0,width:230,background:"rgba(20,24,32,0.98)",border:"1px solid var(--border)",borderRadius:18,boxShadow:"0 12px 40px rgba(0,0,0,.6)",zIndex:70,overflow:"hidden",backdropFilter:"blur(30px)",animation:"fadeUp .15s"}}>
              {[{Icon:UserPlus,l:"Add Friend",a:()=>{setSub("addFriend");setMenuOpen(false)}},{Icon:Pencil,l:"Edit Trip",a:()=>{setEditTripForm({name:trip.name,country:trip.country,budget:trip.budget,currency:trip.currency,startDate:trip.startDate,endDate:trip.endDate});setSub("editTrip");setMenuOpen(false)}},{Icon:Download,l:"Export CSV",a:()=>{setSub("exportView");setMenuOpen(false)}},{Icon:Share2,l:"Share",a:()=>{setSub("shareView");setMenuOpen(false)}},{Icon:Settings,l:"Settings",a:()=>{setSub("settings");setMenuOpen(false)}}].map(({Icon,l,a},i)=>
                <button key={i} onClick={a} style={{width:"100%",padding:"14px 18px",background:"none",border:"none",borderTop:i?"1px solid var(--border)":"none",color:"var(--text)",cursor:"pointer",fontFamily:"Inter",fontSize:14,fontWeight:500,textAlign:"left",display:"flex",alignItems:"center",gap:12}}><Icon size={18} color="var(--text2)"/>{l}</button>)}
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
        <p style={{fontSize:11,color:"var(--text2)",marginBottom:18}}>Powered by MyMemory · Free · No API key needed</p>
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
