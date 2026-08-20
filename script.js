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
