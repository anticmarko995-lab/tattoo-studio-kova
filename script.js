const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = header.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  header.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
});

const filterButtons = [...document.querySelectorAll('.filter')];
const works = [...document.querySelectorAll('.work')];

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    works.forEach(work => {
      work.classList.toggle('is-hidden', selected !== 'all' && work.dataset.category !== selected);
    });
  });
});

const form = document.querySelector('.consultation-form');
const status = document.querySelector('.form-status');
const fileInput = document.querySelector('#reference');
const fileLabel = document.querySelector('.file-label');

fileInput?.addEventListener('change', () => {
  const count = fileInput.files.length;
  fileLabel.textContent = count ? `${count} ${count === 1 ? 'fajl izabran' : 'fajla izabrana'}` : 'Dodaj fajlove';
});

form?.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = '';
  status.classList.remove('is-error');
  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    const fieldValid = field.type === 'checkbox' ? field.checked : Boolean(field.value.trim());
    field.setAttribute('aria-invalid', String(!fieldValid));
    const error = field.closest('.field')?.querySelector('.error');
    if (error) error.textContent = fieldValid ? '' : 'Ovo polje je obavezno.';
    if (!fieldValid) valid = false;
  });

  if (!valid) {
    status.textContent = 'Proveri označena polja i pokušaj ponovo.';
    status.classList.add('is-error');
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  status.textContent = 'Hvala! Upit je uspešno popunjen. Kontaktiraćemo te u najkraćem roku.';
  form.reset();
  fileLabel.textContent = 'Dodaj fajlove';
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
