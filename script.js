(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
/* Acordeones */
document.addEventListener('click',function(ev){
  var btn=ev.target.closest('.acc-btn');if(!btn)return;
  var acc=btn.parentElement,open=!acc.classList.contains('open');
  acc.classList.toggle('open',open);btn.setAttribute('aria-expanded',open);
});
/* Menú móvil y scroll suave */
var menu=$('#menu'),burger=$('#burger');
burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
$$('#menu a, .btn[href^="#"], .brand').forEach(function(a){
  a.addEventListener('click',function(ev){
    var t=$(a.getAttribute('href'));if(!t)return;ev.preventDefault();
    t.scrollIntoView({behavior:'smooth',block:'start'});menu.classList.remove('open');burger.setAttribute('aria-expanded',false);
  });
});
/* Enlace activo + botón volver arriba */
var links=$$('#menu a'),secs=links.map(function(a){return $(a.getAttribute('href'))});
var toTop=$('#toTop');
function onScroll(){
  var y=window.scrollY+120,cur=0;
  secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});
  links.forEach(function(a,i){a.classList.toggle('active',i===cur)});
  toTop.classList.toggle('show',window.scrollY>500);
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
/* Filtro de diarios */
$$('.chip').forEach(function(c){
  c.addEventListener('click',function(){
    $$('.chip').forEach(function(x){x.classList.remove('active')});c.classList.add('active');
    var f=c.getAttribute('data-filter');
    $$('.diary').forEach(function(d){d.hidden=!(f==='all'||d.getAttribute('data-author')===f)});
  });
});
/* Lightbox */
var lb=$('#lightbox'),lbImg=$('img',lb),lbCap=$('figcaption',lb);
function openLB(img){
  var cap=img.closest('figure');cap=cap?$('figcaption',cap):null;
  lbImg.src=img.src;lbImg.alt=img.alt;lbCap.textContent=cap?cap.textContent:img.alt;lb.hidden=false;document.body.style.overflow='hidden';
}
function closeLB(){lb.hidden=true;lbImg.removeAttribute('src');document.body.style.overflow=''}
document.addEventListener('click',function(ev){
  var img=ev.target.closest('img[data-lightbox]');if(img){openLB(img);return}
  if(ev.target===lb||ev.target.closest('.lb-close'))closeLB();
});
document.addEventListener('keydown',function(ev){
  if(ev.key==='Escape'&&!lb.hidden)closeLB();
  var ph=ev.target.closest&&ev.target.closest('.image-placeholder');
  if(ph&&(ev.key==='Enter'||ev.key===' ')&&!ph.classList.contains('filled')){ev.preventDefault();pick(ph)}
});
/* Galerías: añadir imagen en cada marcador */
var input=document.createElement('input');input.type='file';input.accept='image/*';input.hidden=true;document.body.appendChild(input);
var target=null;
function pick(ph){target=ph;input.value='';input.click()}
document.addEventListener('click',function(ev){
  var ph=ev.target.closest('.image-placeholder');
  if(ph&&!ph.classList.contains('filled')&&!ev.target.closest('img'))pick(ph);
});
input.addEventListener('change',function(){
  var f=input.files[0];if(!f||!target)return;
  var img=new Image();img.src=URL.createObjectURL(f);img.alt='Imagen añadida a la galería';img.setAttribute('data-lightbox','');
  target.textContent='';target.appendChild(img);target.classList.add('filled');target.removeAttribute('role');target.removeAttribute('tabindex');
  target=null;
});
})();
