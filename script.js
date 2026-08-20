const button = document.querySelector('.menu-btn');
const menu = document.querySelector('#menu');
button.addEventListener('click', () => menu.classList.toggle('open'));
document.querySelectorAll('#menu a').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card,.story-copy,.service-grid>div').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(el);
});

async function loadChunkedWebp(selector, chunkUrls) {
  const targets = [...document.querySelectorAll(selector)];
  if (!targets.length) return;
  try {
    const parts = await Promise.all(chunkUrls.map(async url => {
      const response = await fetch(url, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return (await response.text()).trim();
    }));
    const src = 'data:image/webp;base64,' + parts.join('');
    targets.forEach(img => img.src = src);
  } catch (error) {
    console.warn('HD product image fallback used', error);
  }
}

loadChunkedWebp('[data-hd-multi]', [
  'assets/hd-multi-0.txt',
  'assets/hd-multi-1.txt',
  'assets/hd-multi-2.txt',
  'assets/hd-multi-3.txt'
]);