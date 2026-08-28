function toggleFaq(el){
  var item=el.parentElement,isActive=item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(function(x){x.classList.remove('active');});
  if(!isActive) item.classList.add('active');
}
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var targetId=this.getAttribute('href');
    var t=document.querySelector(targetId);
    if(t){
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});
const revealObserver=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){if(entry.isIntersecting) entry.target.classList.add('visible');});
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){revealObserver.observe(el);});
const processObserver=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting) entry.target.classList.add('active');
    else entry.target.classList.remove('active');
  });
},{threshold:0.4,rootMargin:'-100px 0px -100px 0px'});
document.querySelectorAll('.process-card').forEach(function(card){processObserver.observe(card);});
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',function(){
  if(window.pageYOffset>100){
    navbar.style.background='rgba(10,10,10,0.95)';
    navbar.style.backdropFilter='blur(30px)';
  }else{
    navbar.style.background='rgba(10,10,10,0.85)';
    navbar.style.backdropFilter='blur(20px)';
  }
});
const hamburger=document.getElementById('nav-hamburger');
const mobileMenu=document.getElementById('mobile-menu');
const menuOverlay=document.getElementById('menu-overlay');
const mobileClose=document.getElementById('mobile-close');
function closeMenu(){
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function openMenu(){
  hamburger.classList.add('active');
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
  hamburger.setAttribute('aria-expanded','true');
  mobileMenu.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
hamburger.addEventListener('click',function(){
  mobileMenu.classList.contains('open')?closeMenu():openMenu();
});
mobileClose.addEventListener('click',closeMenu);
menuOverlay.addEventListener('click',closeMenu);
document.querySelectorAll('.mobile-link,.mobile-cta').forEach(function(link){
  link.addEventListener('click',function(){
    closeMenu();
    var href=this.getAttribute('href');
    if(href && href.indexOf('#')===0){
      var target=document.querySelector(href);
      if(target) setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'start'});},300);
    }
  });
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&mobileMenu.classList.contains('open')) closeMenu();
});


(function(){
  // Desktop dropdown (hover + click, with hover-intent close delay)
  var item = document.getElementById('nav-services-item');
  if(item){
    var btn = item.querySelector('.nav-dropdown-toggle');
    var closeTimer;
    function openMenu(){ clearTimeout(closeTimer); item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    function closeMenu(){ item.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function scheduleClose(){ clearTimeout(closeTimer); closeTimer = setTimeout(closeMenu, 180); }

    item.addEventListener('mouseenter', openMenu);
    item.addEventListener('mouseleave', scheduleClose);
    btn.addEventListener('focus', openMenu);
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if(item.classList.contains('open')) closeMenu(); else openMenu();
    });
    document.addEventListener('click', function(e){
      if(!item.contains(e.target)){ closeMenu(); }
    });
    item.querySelectorAll('.nav-dropdown a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
  }
  // Mobile expandable
  var mItem = document.getElementById('mobile-services-item');
  if(mItem){
    var mBtn = mItem.querySelector('.mobile-dropdown-toggle');
    mBtn.addEventListener('click', function(){
      var open = mItem.classList.toggle('open');
      mBtn.setAttribute('aria-expanded', open);
    });
  }
})();



/* ============================================================
   2) TRUSTED BY — Infinite Logo Marquee
   ============================================================ */

(function () {

    var clientsHost = document.getElementById("pfClientsTrack");

    if (!clientsHost) {
        console.warn("Trusted By container (#pfClientsTrack) not found.");
        return;
    }

    if (
        typeof window.GLOCK === "undefined" ||
        !Array.isArray(window.GLOCK.clients) ||
        window.GLOCK.clients.length === 0
    ) {
        console.warn("No client data found.");
        clientsHost.innerHTML =
            '<div class="pf-empty">Client logos unavailable.</div>';
        return;
    }

    function esc(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    var html = "";

    window.GLOCK.clients.forEach(function (client) {

        html += `
            <span class="pf-client" title="${esc(client.name)}">
                <img
                    src="${esc(client.logo)}"
                    alt="${esc(client.name)}"
                    loading="lazy"
                    draggable="false"
                >
            </span>
        `;

    });

    /* Duplicate for seamless scrolling */
    clientsHost.innerHTML = html + html;

})();

 