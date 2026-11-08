/* Navigasi bersama Virtual Chem Lab SMA: Beranda · Tryout · Rumus · Lab Unsur · pilih kelas */
(function(){
  try{
    var s=document.currentScript, src=(s&&s.getAttribute('src'))||'../shared/nav.js';
    var base=src.replace(/shared\/nav\.js.*$/,'');
    if(!document.querySelector('link[data-vnav]')){ var l=document.createElement('link'); l.rel='stylesheet'; l.href=base+'shared/nav.css'; l.setAttribute('data-vnav','1'); document.head.appendChild(l); }
    var path=location.pathname.replace(/\\/g,'/'), m=path.match(/\/(kimia-kelas-\d+|tryout|rumus|lab-unsur|bank-soal|kurikulum)\//), cur=m?m[1]:'home';
    var G=[['kimia-kelas-10','Kelas X'],['kimia-kelas-11','Kelas XI'],['kimia-kelas-12','Kelas XII']];
    var n=document.createElement('nav'); n.className='vnav'; n.setAttribute('aria-label','Navigasi Virtual Chem Lab SMA');
    var h='<div class="vin"><a class="vmark'+(cur==='home'?' on':'')+'" href="'+base+'index.html"><b>VCL</b><span class="vlbl">Kimia SMA</span></a>'+
      '<a class="'+(cur==='tryout'?'on':'')+'" href="'+base+'tryout/index.html">📝 Tryout</a>'+
      '<a class="'+(cur==='bank-soal'?'on':'')+'" href="'+base+'bank-soal/index.html">🗂 Bank Soal</a>'+
      '<a class="'+(cur==='rumus'?'on':'')+'" href="'+base+'rumus/index.html">📘 Rumus</a>'+
      '<a class="'+(cur==='kurikulum'?'on':'')+'" href="'+base+'kurikulum/index.html">🧭 Kurikulum</a>'+
      '<a class="'+(cur==='lab-unsur'?'on':'')+'" href="'+base+'lab-unsur/index.html">⚛️ Lab Unsur</a>'+
      '<select aria-label="Pindah ke kelas"><option value="">'+(cur.indexOf('kelas')>0?'Kelas lain…':'Pilih kelas…')+'</option>';
    for(var i=0;i<G.length;i++) h+='<option value="'+G[i][0]+'"'+(G[i][0]===cur?' selected':'')+'>'+G[i][1]+'</option>';
    h+='</select></div>'; n.innerHTML=h;
    document.body.insertBefore(n,document.body.firstChild);
    n.querySelector('select').addEventListener('change',function(){ if(this.value) location.href=base+this.value+'/index.html'; });
  }catch(e){}
})();
