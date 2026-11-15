/* Placenta Vida — carrito, menú, animaciones y formularios (todo termina en WhatsApp) */
var PV_WA = '17879053889';
var PV_PRODUCTS = [
  {id:'solo',   cat:'paquete',  n:'Solo Pills',        p:175, img:'img/kit/pills.webp',      d:'Encapsulación de tu placenta. Cápsulas veganas, sin gluten y Non-GMO.'},
  {id:'peace',  cat:'paquete',  n:'Pills & Peace',     p:195, img:'img/kit/foto-flores.webp',d:'Pills + foto de tu placenta con flores + arte del cordón.'},
  {id:'care',   cat:'paquete',  n:'Pills & Care',      p:235, img:'img/kit/balsamo.webp',    d:'Pills + bálsamo + placenta print + foto con flores + cordón.'},
  {id:'love',   cat:'paquete',  n:'Pills & Love',      p:245, img:'img/kit/tintura.webp',    d:'Pills + tintura + bálsamo + print + foto con flores + cordón.', top:true},
  {id:'reina',  cat:'paquete',  n:'Esencia de Reina',  p:255, img:'img/kit/brownies.webp',   d:'Pills + bálsamo + print + foto con flores + cordón + brownies.'},
  {id:'lux',    cat:'paquete',  n:'Lux Box',           p:375, img:'img/kit/galletas.webp',   d:'La experiencia completa: todo lo anterior + galletas de lactancia + prenda de recuerdo en caja de regalo.'},
  {id:'balm',   cat:'producto', n:'Bálsamo de placenta',p:26, img:'img/kit/balsamo.webp',    d:'Nuestro favorito. Para tu piel y la de tu bebé.'},
  {id:'tint',   cat:'producto', n:'Tintura de placenta',p:22, img:'img/kit/tintura.webp',    d:'1 oz. Para continuar tu plan posparto. Dura años.'},
  {id:'print',  cat:'producto', n:'Placenta print (canvas)',p:35, img:'img/kit/print.webp',  d:'Obra de arte con pintura no tóxica en tus colores. En papel acrílico: $25.'},
  {id:'foto',   cat:'producto', n:'Foto con flores',   p:35,  img:'img/kit/foto-flores.webp',d:'Tu placenta decorada con flores naturales de temporada.'},
  {id:'cordon', cat:'producto', n:'Arte del cordón',   p:35,  img:'img/kit/cordon.webp',     d:'Tu cordón umbilical convertido en recuerdo, natural o metálico.'},
  {id:'brown',  cat:'producto', n:'Placenta Brownies', p:35,  img:'img/kit/brownies.webp',   d:'12 pedazos, con o sin placenta. Nutella o walnuts.'},
  {id:'pickup', cat:'servicio', n:'Recogido de placenta',p:50, img:'img/g/183.webp',         d:'24/7 en toda la isla. Hospitales, partos en casa o puntos acordados.'}
];
(function(){
  var base = document.body.getAttribute('data-base') || '';
  function wa(msg){ window.open('https://wa.me/'+PV_WA+'?text='+encodeURIComponent(msg),'_blank'); }
  window.PV_wa = wa;

  // Menú
  var burger=document.querySelector('.burger'), menu=document.querySelector('.menu');
  if(burger) burger.addEventListener('click',function(){ menu.classList.toggle('open'); });
  var page=document.body.getAttribute('data-page');
  document.querySelectorAll('.menu a[data-p]').forEach(function(a){ if(a.getAttribute('data-p')===page) a.classList.add('on'); });

  // Animaciones al aparecer
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.1});
    document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  } else document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });

  // Carrito
  var cart=[];
  try{ cart=JSON.parse(localStorage.getItem('pv_cart')||'[]'); }catch(e){ cart=[]; }
  function save(){ try{ localStorage.setItem('pv_cart',JSON.stringify(cart)); }catch(e){} }
  function find(id){ for(var i=0;i<PV_PRODUCTS.length;i++) if(PV_PRODUCTS[i].id===id) return PV_PRODUCTS[i]; }
  var drawer=document.querySelector('.cart'), bg=document.querySelector('.cart-bg'), list=document.querySelector('.cart .items'), totEl=document.querySelector('.cart .tot b'), countEl=document.querySelector('.cart-count'), toast=document.querySelector('.toast');
  function render(){
    if(!drawer) return;
    var n=0,t=0,h='';
    cart.forEach(function(it){ var p=find(it.id); if(!p) return; n+=it.q; t+=it.q*p.p;
      h+='<div class="citem"><img src="'+base+p.img+'" alt=""><div><div class="n">'+p.n+'</div><div class="p">$'+p.p+' × '+it.q+'</div></div><button class="rm" data-id="'+p.id+'">Quitar</button></div>'; });
    list.innerHTML = h || '<p class="empty">Tu carrito está vacío.</p>';
    totEl.textContent='$'+t;
    countEl.textContent=n; countEl.classList.toggle('on',n>0);
    list.querySelectorAll('.rm').forEach(function(b){ b.addEventListener('click',function(){ cart=cart.filter(function(x){return x.id!==b.dataset.id;}); save(); render(); }); });
  }
  function open(){ drawer.classList.add('open'); bg.classList.add('open'); }
  function close(){ drawer.classList.remove('open'); bg.classList.remove('open'); }
  window.PV_add=function(id,q){ q=q||1; var f=cart.filter(function(x){return x.id===id;})[0]; if(f) f.q+=q; else cart.push({id:id,q:q}); save(); render();
    if(toast){ toast.textContent='✓ '+find(id).n+' añadido al carrito'; toast.classList.add('on'); setTimeout(function(){toast.classList.remove('on');},2200); } };
  document.querySelectorAll('[data-add]').forEach(function(b){ b.addEventListener('click',function(){ window.PV_add(b.getAttribute('data-add')); }); });
  var cb=document.querySelector('.cart-btn'); if(cb) cb.addEventListener('click',open);
  if(bg) bg.addEventListener('click',close);
  var x=document.querySelector('.cart .x'); if(x) x.addEventListener('click',close);
  var chk=document.querySelector('.cart .checkout');
  if(chk) chk.addEventListener('click',function(){
    if(!cart.length){ wa('Hola Liz, quiero información de Placenta Vida.'); return; }
    var t=0, lines=cart.map(function(it){ var p=find(it.id); t+=p.p*it.q; return '- '+p.n+(it.q>1?' ×'+it.q:'')+' ($'+(p.p*it.q)+')'; });
    wa('Hola Liz, quiero hacer esta orden en Placenta Vida:\n\n'+lines.join('\n')+'\n\nTotal estimado: $'+t+'\nMi fecha probable de parto es: ');
  });
  render();

  // Formularios a WhatsApp
  document.querySelectorAll('form[data-wa]').forEach(function(f){
    f.addEventListener('submit',function(e){ e.preventDefault(); var d=new FormData(f), parts=[];
      d.forEach(function(v,k){ if(v) parts.push(k+': '+v); });
      wa((f.getAttribute('data-wa')||'Hola Liz')+'\n\n'+parts.join('\n')); });
  });

  // Testimonios
  var slides=[].slice.call(document.querySelectorAll('.slide')), dots=document.querySelector('.dots .list'), cur=0, timer;
  if(slides.length){
    slides.forEach(function(s,i){ var b=document.createElement('button'); b.setAttribute('aria-label','Testimonio '+(i+1)); b.addEventListener('click',function(){go(i);}); dots.appendChild(b); });
    function go(i){ cur=(i+slides.length)%slides.length; slides.forEach(function(s,j){ s.classList.toggle('on',j===cur); }); [].forEach.call(dots.children,function(d,j){ d.classList.toggle('on',j===cur); }); clearInterval(timer); timer=setInterval(function(){go(cur+1);},8000); }
    var pv=document.querySelector('.dots .prev'), nx=document.querySelector('.dots .next');
    if(pv) pv.addEventListener('click',function(){go(cur-1);}); if(nx) nx.addEventListener('click',function(){go(cur+1);});
    go(0);
  }
})();
