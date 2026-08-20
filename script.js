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

async function loadBase64Webp(selector, url) {
  const targets = [...document.querySelectorAll(selector)];
  if (!targets.length) return;
  try {
    const response = await fetch(url, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const base64 = (await response.text()).trim();
    const src = 'data:image/webp;base64,' + base64;
    targets.forEach(img => img.src = src);
  } catch (error) {
    console.warn('HD product image fallback used', error);
  }
}

loadBase64Webp('[data-hd-curler]', 'assets/curler-hd.webp.b64');
loadBase64Webp('[data-hd-dryer]', 'assets/dryer-hd.webp.b64');
