const DATA= {
    packages:'assets/data/packages.json',destinations:'assets/data/destinations.json',site:'assets/data/site.json'
};
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
async function loadJSON(path) {
    const res=await fetch(path);
    if(!res.ok)throw new Error(path);
    return res.json()
}
function header() {
    const path=location.pathname.split('/').pop()||'index.html';
    const links=[['index.html','Home'],['destinations.html','Destinations'],['packages.html','Tour Packages'],['services.html','Services'],['gallery.html','Gallery'],['blog.html','Blog'],['about.html','About'],['contact.html','Contact']];
    return `<div class="announcement">CEBU IS CALLING · Explore. Check. Choose. Then, let’s go!</div><div class="brand-area"><a class="brand-link" href="index.html"><img class="lapugo-logo" src="assets/images/lapugo-logo.png" alt="LapuGo Travel & Tours"></a><p class="brand-tagline">Lakaw Ta, Go Beyond!</p></div><div class="nav-wrap"><div class="container nav"><button class="menu-toggle" aria-label="Open menu">☰</button><ul class="nav-links">${links.map(([href,label])=>`<li><a class="${path===href?'active':''}" href="${href}">$ {
        label
    }
    </a></li>`).join('')}</ul><div class="nav-actions"><a class="btn btn-secondary" href="booking.html">Book a Trip</a></div></div></div>`
}
function footer() {
    return `<footer class="footer"><div class="container"><div class="footer-grid"><div><img src="assets/images/lapugo-logo.png" alt="LapuGo" style="width:170px;background:#fff;padding:8px;border-radius:12px"><p>Making Cebu island adventures easier, more exciting, and more convenient.</p></div><div><h3>Explore</h3><p><a href="destinations.html">Destinations</a></p><p><a href="packages.html">Tour Packages</a></p><p><a href="services.html">Services</a></p></div><div><h3>Plan</h3><p><a href="booking.html">Booking / Inquiry</a></p><p><a href="about.html">About LapuGo</a></p><p><a href="blog.html">Travel Blog</a></p></div><div><h3>Contact</h3><p>Cebu, Philippines</p><p><a href="mailto:hello@lapugotravelandtours.com">hello@lapugotravelandtours.com</a></p><p><a href="contact.html">Send an inquiry →</a></p></div></div><div class="footer-bottom"><span>© 2026 LapuGo Travel & Tours. Student website prototype.</span><span>Lakaw Ta, Go Beyond!</span></div></div></footer>`
}
function layout() {
    const h=$('#site-header');
    const f=$('#site-footer');
    if(h)h.innerHTML=header();
    if(f)f.innerHTML=footer();
    const toggle=$('.menu-toggle'),links=$('.nav-links');
    toggle?.addEventListener('click',()=>links.classList.toggle('open'));
}
function money(n) {
    return new Intl.NumberFormat('en-PH', {
        style:'currency',currency:'PHP',maximumFractionDigits:0
    }).format(n)
}
function packageCard(p) {
    return `<article class="card"><div class="card-media"><img loading="lazy" src="${p.image}" alt="${p.title}"></div><div class="card-body"><span class="pill">${p.tag}</span><h3>${p.title}</h3><p>${p.description}</p><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><span class="price">${money(p.price)} <small>/ person</small></span><a class="btn btn-primary" href="package.html?id=${p.id}">View</a></div></div></article>`
}
function destinationCard(d) {
    return `<article class="card destination-card" data-type="${d.type.toLowerCase()}"><div class="card-media"><img loading="lazy" src="${d.image}" alt="${d.name}"></div><div class="card-body"><span class="pill">${d.type}</span><h3>${d.name}</h3><p>${d.desc}</p><a class="btn btn-outline" href="booking.html?destination=${encodeURIComponent(d.name)}">Plan this stop</a></div></article>`
}
async function home() {
    const ps=await loadJSON(DATA.packages);
    const ds=await loadJSON(DATA.destinations);
    $('#featured-packages').innerHTML=ps.map(packageCard).join('');
    $('#featured-destinations').innerHTML=ds.slice(0,3).map(destinationCard).join('');
}
async function destinations() {
    const ds=await loadJSON(DATA.destinations);
    const grid=$('#destination-grid');
    const search=$('#destination-search');
    const filters=$$('.filter-btn');
    function render() {
        const q=search.value.toLowerCase();
        const active=$('.filter-btn.active')?.dataset.filter||'all';
        grid.innerHTML=ds.filter(d=>(active==='all'||d.type.toLowerCase().includes(active))&&(`${d.name} ${d.desc} ${d.type}`.toLowerCase().includes(q))).map(destinationCard).join('')||'<p>No destinations found.</p>'
    }
    filters.forEach(b=>b.onclick=()=> {
        filters.forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        render()
    });
    search.oninput=render;
    render()
}
async function packages() {
    const ps=await loadJSON(DATA.packages);
    const grid=$('#package-grid');
    const search=$('#package-search');
    const initial=new URLSearchParams(location.search).get('q')||'';
    search.value=initial;
    function render() {
        const q=search.value.toLowerCase();
        grid.innerHTML=ps.filter(p=>`${p.title} ${p.tag} ${p.description}`.toLowerCase().includes(q)).map(packageCard).join('')||'<p>No packages found.</p>'
    }
    search.oninput=render;
    render()
}
async function packageDetail() {
    const id=new URLSearchParams(location.search).get('id')||'oslob-moalboal';
    const ps=await loadJSON(DATA.packages);
    const p=ps.find(x=>x.id===id)||ps[0];
    $('#package-detail').innerHTML=`<section class="package-detail"><div class="container"><div class="package-hero"><div class="package-cover"><img src="${p.image}" alt="${p.title}"></div><div class="package-info"><span class="pill">${p.tag}</span><h1>${p.title}</h1><p>${p.description}</p><div class="package-price">${money(p.price)} <small style="font-size:.8rem;color:var(--muted)">per person</small></div><p><strong>Duration:</strong> ${p.duration}</p><a class="btn btn-primary" href="booking.html?package=${encodeURIComponent(p.title)}">Request this trip</a></div></div><section><div class="section-head"><div><span class="kicker">Your day</span><h2>Itinerary</h2></div><p>Follow the planned route while keeping the experience comfortable and easy to understand.</p></div><div class="timeline">${p.itinerary.map(([a,b])=>`<div class="timeline-item"><div class="time">$ {
        b
    }
    </div><div><strong>$ {
        a
    }
    </strong></div></div>`).join('')}</div></section><section class="band"><div class="container"><div class="section-head"><div><span class="kicker" style="color:var(--sky)">Experience</span><h2>Highlights</h2></div></div><ul class="feature-list">${p.highlights.map(x=>`<li>$ {
        x
    }
    </li>`).join('')}</ul></div></section><section><div class="include-grid"><div><span class="kicker">Included</span><h2>What’s included</h2><ul class="check-list">${p.includes.map(x=>`<li>$ {
        x
    }
    </li>`).join('')}</ul></div><div><span class="kicker">Good to know</span><h2>Not included</h2><ul class="check-list">${p.excludes.map(x=>`<li>$ {
        x
    }
    </li>`).join('')}</ul><div class="notice"><strong>Pickup / drop-off:</strong><br>${p.dropoffs}</div></div></div></section><section><div class="section-head"><div><span class="kicker">Visual itinerary</span><h2>See the places</h2></div></div><div class="grid grid-3">${p.gallery.map(g=>`<div class="card"><div class="card-media"><img src="${g.image}" alt="${g.title}"></div><div class="card-body"><h3>$ {
        g.title
    }
    </h3></div></div>`).join('')}</div></section></div></section>`
}
function booking() {
    const params=new URLSearchParams(location.search);
    const pkg=params.get('package')||'';
    const dest=params.get('destination')||'';
    $('#package-name').value=pkg;
    $('#destination-name').value=dest;
    $('#booking-form').addEventListener('submit',e=> {
        e.preventDefault();
        const data=Object.fromEntries(new FormData(e.currentTarget));
        localStorage.setItem('lapugoInquiry',JSON.stringify( {
            ...data,submittedAt:new Date().toISOString()
        }));
        showToast('Inquiry saved. LapuGo will get back to you soon!');
        e.currentTarget.reset();
        $('#package-name').value=pkg;
        $('#destination-name').value=dest
    })
}
function contact() {
    const form=$('#contact-form');
    form?.addEventListener('submit',e=> {
        e.preventDefault();
        showToast('Thanks! Your message has been prepared for LapuGo.');
        form.reset()
    })
}
function services() {
}
async function gallery() {
    const ps=await loadJSON(DATA.packages);
    const imgs=ps.flatMap(p=>p.gallery);
    $('#gallery-grid').innerHTML=imgs.concat(imgs).map((g,i)=>`<figure class="gallery-item"><img loading="lazy" src="${g.image}" alt="${g.title}"><figcaption class="gallery-caption">${g.title}</figcaption></figure>`).join('')
}
function blog() {
}
function faq() {
    $$('.faq-q').forEach(q=>q.onclick=()=>q.parentElement.classList.toggle('open'));
}
function showToast(msg) {
    const t=$('.toast');
    t.textContent=msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),3200)
}
async function init() {
    layout();
    const page=document.body.dataset.page;
    try {
        if(page==='home')await home();
        if(page==='destinations')await destinations();
        if(page==='packages')await packages();
        if(page==='package')await packageDetail();
        if(page==='booking')booking();
        if(page==='contact')contact();
        if(page==='gallery')await gallery();
        if(page==='faq')faq()
    }
    catch(e) {
        console.error(e);
        showToast('Something went wrong loading this page.')
    }
}
document.addEventListener('DOMContentLoaded',init);
