/* Virtual Chem Lab SMA · data unsur, pengurai rumus, Mr, penyetara reaksi, konfigurasi elektron (tanpa pustaka luar) */
(function(){
const C = window.CHEM = {};
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const NAMA = 'Hidrogen Helium Litium Berilium Boron Karbon Nitrogen Oksigen Fluorin Neon Natrium Magnesium Aluminium Silikon Fosforus Belerang Klorin Argon Kalium Kalsium Skandium Titanium Vanadium Kromium Mangan Besi Kobalt Nikel Tembaga Seng Galium Germanium Arsen Selenium Bromin Kripton Rubidium Stronsium Itrium Zirkonium Niobium Molibdenum Teknesium Rutenium Rodium Paladium Perak Kadmium Indium Timah Antimon Telurium Iodin Xenon Sesium Barium Lantanum Serium Praseodimium Neodimium Prometium Samarium Europium Gadolinium Terbium Disprosium Holmium Erbium Tulium Iterbium Lutesium Hafnium Tantalum Wolfram Renium Osmium Iridium Platina Emas Raksa Talium Timbal Bismut Polonium Astatin Radon Fransium Radium Aktinium Torium Protaktinium Uranium Neptunium Plutonium Amerisium Kurium Berkelium Kalifornium Einsteinium Fermium Mendelevium Nobelium Lawrensium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Kopernisium Nihonium Flerovium Moskovium Livermorium Tenesin Oganeson'.split(' ');
const MASS = [1.008,4.0026,6.94,9.0122,10.81,12.011,14.007,15.999,18.998,20.180,22.990,24.305,26.982,28.085,30.974,32.06,35.45,39.948,39.098,40.078,44.956,47.867,50.942,51.996,54.938,55.845,58.933,58.693,63.546,65.38,69.723,72.630,74.922,78.971,79.904,83.798,85.468,87.62,88.906,91.224,92.906,95.95,98,101.07,102.91,106.42,107.87,112.41,114.82,118.71,121.76,127.60,126.90,131.29,132.91,137.33,138.91,140.12,140.91,144.24,145,150.36,151.96,157.25,158.93,162.50,164.93,167.26,168.93,173.05,174.97,178.49,180.95,183.84,186.21,190.23,192.22,195.08,196.97,200.59,204.38,207.2,208.98,209,210,222,223,226,227,232.04,231.04,238.03,237,244,243,247,247,251,252,257,258,259,266,267,268,269,270,269,278,281,282,285,286,289,290,293,294,294];
// keelektronegatifan Pauling (null = tidak umum)
const EN = [2.20,null,0.98,1.57,2.04,2.55,3.04,3.44,3.98,null,0.93,1.31,1.61,1.90,2.19,2.58,3.16,null,0.82,1.00,1.36,1.54,1.63,1.66,1.55,1.83,1.88,1.91,1.90,1.65,1.81,2.01,2.18,2.55,2.96,3.00,0.82,0.95,1.22,1.33,1.6,2.16,1.9,2.2,2.28,2.20,1.93,1.69,1.78,1.96,2.05,2.1,2.66,2.6,0.79,0.89,1.10,1.12,1.13,1.14,1.13,1.17,1.2,1.2,1.1,1.22,1.23,1.24,1.25,1.1,1.27,1.3,1.5,2.36,1.9,2.2,2.20,2.28,2.54,2.00,1.62,2.33,2.02,2.0,2.2,null,0.7,0.9,1.1,1.3,1.5,1.38,1.36,1.28,1.3];
// energi ionisasi pertama (kJ/mol) dan jari-jari kovalen (pm), Z = 1–56
const IE = [1312,2372,520,900,801,1086,1402,1314,1681,2081,496,738,578,787,1012,1000,1251,1521,419,590,633,659,651,653,717,762,760,737,745,906,579,762,947,941,1140,1351,403,550,600,640,652,684,702,710,720,804,731,868,558,709,834,869,1008,1170,376,503];
const RAD = [31,28,128,96,84,76,71,66,57,58,166,141,121,111,107,105,102,106,203,176,170,160,153,139,139,132,126,124,132,122,122,120,119,120,120,116,220,195,190,175,164,154,147,146,142,139,145,144,142,139,139,138,139,140,244,215];
const CAT_N = {a:'Logam alkali',b:'Logam alkali tanah',t:'Logam transisi',p:'Logam pasca-transisi',m:'Metaloid',n:'Nonlogam',h:'Halogen',g:'Gas mulia',l:'Lantanida',c:'Aktinida',u:'Sifat belum pasti'};
C.CAT = CAT_N;
C.CATCOL = {a:'#f4a259',b:'#f6d365',t:'#9ec5fe',p:'#a7d7c5',m:'#c3b1e1',n:'#b8e986',h:'#7fd3e6',g:'#f7a8c4',l:'#f2c6a0',c:'#e8b4b8',u:'#d6d6d6'};
function cat(z){
  if(z===1) return 'n'; if([3,11,19,37,55,87].includes(z)) return 'a'; if([4,12,20,38,56,88].includes(z)) return 'b';
  if([2,10,18,36,54,86,118].includes(z)) return z===118?'u':'g'; if([9,17,35,53,85].includes(z)) return 'h'; if(z===117) return 'u';
  if([5,14,32,33,51,52].includes(z)) return 'm'; if([6,7,8,15,16,34].includes(z)) return 'n';
  if(z>=57&&z<=71) return 'l'; if(z>=89&&z<=103) return 'c';
  if([13,31,49,50,81,82,83,84].includes(z)) return 'p'; if(z>=109&&z<=116&&z!==112) return 'u';
  return 't';
}
function pos(z){ // golongan (1–18) dan periode; lantanida/aktinida golongan 3 (ditaruh di baris bawah)
  const P=[[1,2],[3,10],[11,18],[19,36],[37,54],[55,86],[87,118]];
  let per=P.findIndex(([a,b])=>z>=a&&z<=b)+1, s=P[per-1][0], i=z-s, g;
  if(per===1) g = z===1?1:18;
  else if(per<=3) g = i<2?i+1:i+11;
  else if(per<=5) g = i+1;
  else { if(i<2) g=i+1; else if(i<=16) g=3; else g=i-13; }
  return {g, per, f:(per>=6&&i>=2&&i<=16)};
}
C.E = SYM.map((s,k)=>{ const z=k+1, p=pos(z); return {z, s, n:NAMA[k], m:MASS[k], en:EN[k]??null, ie:IE[k]??null, r:RAD[k]??null, cat:cat(z), g:p.g, per:p.per, f:p.f}; });
C.bySym = {}; C.E.forEach(e=>C.bySym[e.s]=e);
C.el = x => typeof x==='number' ? C.E[x-1] : C.bySym[x];
// Ar sekolah (dibulatkan seperti di buku teks)
C.ArS = {H:1,He:4,Li:7,Be:9,B:11,C:12,N:14,O:16,F:19,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Cr:52,Mn:55,Fe:56,Co:59,Ni:59,Cu:63.5,Zn:65,Br:80,Ag:108,Sn:119,I:127,Ba:137,Au:197,Hg:201,Pb:207};
C.Ar = (s, school=true) => school && C.ArS[s]!=null ? C.ArS[s] : (C.bySym[s] ? Math.round(C.bySym[s].m*100)/100 : NaN);

/* pengurai rumus: "Ca(OH)2", "CuSO4.5H2O", "Fe2(SO4)3" -> {Ca:1,O:2,H:2} */
C.parse = str => {
  let s = String(str).replace(/\s+/g,'').replace(/[·•*]/g,'.').replace(/[₀-₉]/g,c=>String(c.charCodeAt(0)-8320)).replace(/\^?\d*[+−-]$/,'').replace(/\[/g,'(').replace(/\]/g,')');
  const parts = s.split('.'); const tot = {};
  for(let part of parts){
    let mult = 1; const m0 = part.match(/^(\d+)(.*)$/); if(m0){ mult=+m0[1]; part=m0[2]; }
    let i=0;
    const group = () => { const out={}; while(i<part.length && part[i]!==')'){
        if(part[i]==='('){ i++; const inner=group(); if(part[i]!==')') throw new Error('kurung'); i++; const n=num(); for(const k in inner) out[k]=(out[k]||0)+inner[k]*n; }
        else { const m=part.slice(i).match(/^[A-Z][a-z]?/); if(!m||!C.bySym[m[0]]) throw new Error('unsur'); i+=m[0].length; const n=num(); out[m[0]]=(out[m[0]]||0)+n; } }
      return out; };
    const num = () => { const m=part.slice(i).match(/^\d+/); if(m){ i+=m[0].length; return +m[0]; } return 1; };
    const g = group(); if(i!==part.length) throw new Error('sisa');
    for(const k in g) tot[k]=(tot[k]||0)+g[k]*mult;
  }
  if(!Object.keys(tot).length) throw new Error('kosong');
  return tot;
};
C.Mr = (str, school=true) => { const p=C.parse(str); let m=0; for(const k in p) m+=C.Ar(k,school)*p[k]; return Math.round(m*1000)/1000; };
C.MrSteps = (str, school=true) => { const p=C.parse(str); return Object.keys(p).map(k=>`${p[k]} × ${String(C.Ar(k,school)).replace('.',',')} (${k})`).join(' + '); };

/* penyetara reaksi: "Fe + O2 -> Fe2O3" -> {L:[...],R:[...],k:[4,3,2]} */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
C.balance = eq => {
  const [l,r] = String(eq).replace(/⟶|→|=>|=|⇌|<=>/g,'->').split('->'); if(r===undefined) throw new Error('panah');
  const L=l.split('+').map(x=>x.trim()).filter(Boolean), R=r.split('+').map(x=>x.trim()).filter(Boolean);
  const sp=L.concat(R), comp=sp.map(C.parse), els=[...new Set(comp.flatMap(o=>Object.keys(o)))];
  const n=sp.length;
  // matriks unsur × spesi (kanan bertanda negatif)
  let M = els.map(e=>sp.map((_,j)=>(comp[j][e]||0)*(j<L.length?1:-1)));
  // eliminasi Gauss dengan pecahan [p,q]
  const F=(p,q=1)=>{ if(q<0){p=-p;q=-q;} const g=gcd(p,q)||1; return [p/g,q/g]; };
  let A=M.map(row=>row.map(v=>F(v))); const rows=A.length; let piv=[], rI=0;
  const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]), mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]), div=(a,b)=>F(a[0]*b[1],a[1]*b[0]);
  for(let c=0;c<n&&rI<rows;c++){
    let p=-1; for(let k=rI;k<rows;k++) if(A[k][c][0]!==0){p=k;break;} if(p<0) continue;
    [A[rI],A[p]]=[A[p],A[rI]]; const pv=A[rI][c]; A[rI]=A[rI].map(v=>div(v,pv));
    for(let k=0;k<rows;k++) if(k!==rI && A[k][c][0]!==0){ const f=A[k][c]; A[k]=A[k].map((v,j)=>sub(v,mul(f,A[rI][j]))); }
    piv.push(c); rI++;
  }
  const free=[...Array(n).keys()].filter(c=>!piv.includes(c)); if(free.length!==1) throw new Error('tak tunggal');
  const fc=free[0]; let x=Array(n).fill(null); x[fc]=[1,1];
  piv.forEach((c,k)=>{ x[c]=F(-A[k][fc][0],A[k][fc][1]); });
  const den=x.reduce((a,v)=>a*v[1]/gcd(a,v[1]),1); let k=x.map(v=>v[0]*den/v[1]);
  if(k.some(v=>v<0)) k=k.map(v=>-v); if(k.some(v=>v<=0)) throw new Error('negatif');
  const g=k.reduce((a,b)=>gcd(a,b)); k=k.map(v=>v/g);
  return {L, R, k, els};
};
C.eqHTML = (L,R,k,arrow='→') => { const f=window.VML?VML.f:(x=>x); const t=(arr,off)=>arr.map((s,i)=>{ const c=k?k[i+off]:1; return (c>1?c:'')+f(s); }).join(' + '); return t(L,0)+' '+arrow+' '+t(R,L.length); };

/* konfigurasi elektron (aturan Aufbau + pengecualian umum) */
const ORD = ['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p','6s','4f','5d','6p','7s','5f','6d','7p'];
const CAP = {s:2,p:6,d:10,f:14};
const EXC = {24:{'4s':1,'3d':5},29:{'4s':1,'3d':10},41:{'5s':1,'4d':4},42:{'5s':1,'4d':5},44:{'5s':1,'4d':7},45:{'5s':1,'4d':8},46:{'5s':0,'4d':10},47:{'5s':1,'4d':10},78:{'6s':1,'5d':9},79:{'6s':1,'5d':10}};
C.config = z => {
  let left=z; const out=[];
  for(const o of ORD){ if(left<=0) break; const n=Math.min(CAP[o[1]],left); out.push([o,n]); left-=n; }
  if(EXC[z]){ const ex=EXC[z]; for(const o in ex){ const it=out.find(v=>v[0]===o); if(it) it[1]=ex[o]; else out.push([o,ex[o]]); } }
  return out.filter(v=>v[1]>0);
};
C.cfgStr = (z, html=true) => C.config(z).map(([o,n])=>html?`${o}<sup>${n}</sup>`:`${o}${n}`).join(' ');
C.NOBLE = [2,10,18,36,54,86];
C.cfgShort = z => { const ng=[...C.NOBLE].reverse().find(g=>g<z); if(!ng) return C.cfgStr(z); const base=C.config(ng).map(v=>v[0]); const rest=C.config(z).filter(([o,n],i)=>!(base.includes(o)&&C.config(ng).find(v=>v[0]===o)[1]===n)); return `[${C.bySym[SYM[ng-1]].s}] `+rest.map(([o,n])=>`${o}<sup>${n}</sup>`).join(' '); };
C.shells = z => { const sh=[]; C.config(z).forEach(([o,n])=>{ const k=+o[0]-1; sh[k]=(sh[k]||0)+n; }); return Array.from(sh,v=>v||0); };
C.valence = z => { const e=C.el(z); if(e.g<=2) return e.g; if(e.g>=13) return e.g-10; return null; };
C.golLabel = z => { const e=C.el(z); const R=['','IA','IIA','IIIB','IVB','VB','VIB','VIIB','VIIIB','VIIIB','VIIIB','IB','IIB','IIIA','IVA','VA','VIA','VIIA','VIIIA']; return e.f?(e.per===6?'Lantanida':'Aktinida'):R[e.g]; };
C.block = z => { if(C.el(z).f) return 'f'; const c=C.config(z); const last=c.slice().sort((a,b)=>ORD.indexOf(a[0])-ORD.indexOf(b[0])).pop(); return z===2?'s':last[0][1]; };
/* bilangan oksidasi: 'Cr2O7^2-' -> {p, known:{Cr:6,O:-2}, why, q} */
C.biloks = function(str){
  const m=str.trim().match(/^(.*?)(?:\^(\d*)([+-]))?$/); const body=m[1]; const q=m[3]?(m[3]==='+'?1:-1)*(m[2]?+m[2]:1):0;
  const p=C.parse(body), els=Object.keys(p), known={}, why={};
  if(els.length===1){ els.forEach(e=>{ known[e]=q/p[e]; why[e]=q?'ion monoatom/poliatom satu unsur':'unsur bebas'; }); return {p,known,why,q}; }
  const metals=els.filter(e=>{ const x=C.el(e); return ['a','b'].includes(x.cat)||e==='Al'; });
  els.forEach(e=>{ const x=C.el(e);
    if(e==='F'){ known[e]=-1; why[e]='F selalu −1'; }
    else if(x.cat==='a'){ known[e]=1; why[e]='golongan IA = +1'; }
    else if(x.cat==='b'){ known[e]=2; why[e]='golongan IIA = +2'; }
    else if(e==='Al'){ known[e]=3; why[e]='Al = +3'; } });
  if(p.H&&known.H===undefined){ if(metals.length&&els.length===2){ known.H=-1; why.H='hidrida logam: H = −1'; } else { known.H=1; why.H='H = +1'; } }
  if(p.O&&known.O===undefined){ if(p.F){ } else if(els.length===2&&(p.H===p.O||(metals.length&&p.O===2*1&&(C.el(metals[0]).cat==='a'&&p[metals[0]]===2||C.el(metals[0]).cat==='b'&&p[metals[0]]===1)))){ known.O=-1; why.O='peroksida: O = −1'; } else { known.O=-2; why.O='O = −2'; } }
  let unk=els.filter(e=>known[e]===undefined);
  if(unk.length>1){ const hal=unk.filter(e=>['Cl','Br','I'].includes(e)); if(hal.length&&!p.O){ hal.forEach(e=>{ known[e]=-1; why[e]='halogen tanpa O = −1'; }); unk=els.filter(e=>known[e]===undefined); } }
  if(unk.length===1){ const e=unk[0]; let s0=0; els.forEach(x=>{ if(x!==e) s0+=known[x]*p[x]; }); known[e]=(q-s0)/p[e]; why[e]=`dihitung: ${p[e]>1?p[e]+'×':''}${e} = ${q} − (${s0})`; }
  return {p,known,why,q,unk:els.filter(e=>known[e]===undefined)};
};
})();
