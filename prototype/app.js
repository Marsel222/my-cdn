const navButtons = [...document.querySelectorAll('[data-nav]')];
const pages = [...document.querySelectorAll('[data-page]')];

function showPage(name) {
  const target = pages.find((page) => page.dataset.page === name) || pages[0];
  pages.forEach((page) => page.classList.toggle('is-active', page === target));
  document.querySelectorAll('.rail-link[data-nav], .mobile-nav [data-nav]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.nav === target.dataset.page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${target.dataset.page}`);
}

navButtons.forEach((button) => button.addEventListener('click', () => showPage(button.dataset.nav)));
showPage(location.hash.slice(1) || 'home');
