const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const caption = document.getElementById('caption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


let images = Array.from(document.querySelectorAll('.gallery img'));
let currentIndex = 0;


// Open lightbox
gallery.addEventListener('click', (e)=>{
const img = e.target.closest('img');
if(!img) return;
currentIndex = parseInt(img.dataset.index,10);
openLightbox(currentIndex);
});


function openLightbox(i){
const node = images[i];
lbImage.src = node.src; lbImage.alt = node.alt;
caption.textContent = node.alt || `Image ${i+1}`;
lightbox.classList.remove('hidden');
}


function closeLightbox(){ lightbox.classList.add('hidden'); }


closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });


prevBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex-1+images.length)%images.length; openLightbox(currentIndex); });
nextBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex+1)%images.length; openLightbox(currentIndex); });


// Filtering
const filterBtns = document.querySelectorAll('.filters button');
filterBtns.forEach(b=>b.addEventListener('click', ()=>{
filterBtns.forEach(x=>x.classList.remove('active'));
b.classList.add('active');
const cat = b.dataset.filter;
document.querySelectorAll('.gallery .card').forEach(card=>{
const c = card.dataset.category;
card.style.display = (cat==='all' || c===cat) ? '' : 'none';
});
// refresh images array and data-index
images = Array.from(document.querySelectorAll('.gallery img'));
images.forEach((img, idx)=> img.dataset.index = idx);
}));


// initial index set
images.forEach((img, idx)=> img.dataset.index = idx);