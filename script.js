document.addEventListener("DOMContentLoaded",()=>{
  const slides=[...document.querySelectorAll(".slide")];
  const dotsWrap=document.querySelector(".dots");
  let current=0,timer;
  slides.forEach((_,i)=>{
    const b=document.createElement("button");
    b.setAttribute("aria-label","Slide "+(i+1));
    b.addEventListener("click",()=>go(i));
    dotsWrap.appendChild(b);
  });
  const dots=[...dotsWrap.children];
  function go(n){
    current=(n+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle("active",i===current));
    dots.forEach((d,i)=>d.classList.toggle("active",i===current));
  }
  document.querySelector(".prev").addEventListener("click",()=>go(current-1));
  document.querySelector(".next").addEventListener("click",()=>go(current+1));
  function auto(){clearInterval(timer);timer=setInterval(()=>go(current+1),6500)}
  go(0);auto();

  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector("#mainNav");
  toggle.addEventListener("click",()=>nav.classList.toggle("open"));
  document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const modal=document.querySelector("#searchModal");
  const openSearch=document.querySelector(".search-open");
  const closeSearch=document.querySelector(".search-close");
  const input=document.querySelector("#searchInput");
  openSearch.addEventListener("click",()=>{modal.classList.add("open");setTimeout(()=>input.focus(),100)});
  closeSearch.addEventListener("click",()=>modal.classList.remove("open"));
  modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
  document.querySelector("#searchBtn").addEventListener("click",()=>{
    const q=input.value.trim();
    if(q) alert("Chức năng tìm kiếm đang ở chế độ giao diện mẫu.\nTừ khóa: "+q);
  });

  const top=document.querySelector("#toTop");
  window.addEventListener("scroll",()=>{
    top.classList.toggle("show",window.scrollY>500);
    document.querySelector("#header").classList.toggle("scrolled",window.scrollY>10);
  });
  top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  const counters=document.querySelectorAll("[data-count]");
  const countObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target,target=Number(el.dataset.count);
      let start=0; const step=Math.max(1,Math.ceil(target/55));
      const run=()=>{start+=step;if(start>=target){el.textContent=target;return}el.textContent=start;requestAnimationFrame(run)};
      run();countObserver.unobserve(el);
    });
  },{threshold:.6});
  counters.forEach(c=>countObserver.observe(c));
});