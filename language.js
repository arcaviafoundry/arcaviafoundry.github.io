const languageButton = document.querySelector('.language-toggle');
const translations = [
  ['data-en', 'textContent'],
  ['data-en-label', 'aria-label'],
  ['data-en-alt', 'alt'],
].flatMap(([attribute, target]) =>
  Array.from(document.querySelectorAll('[' + attribute + ']'), (element) => ({
    element,
    target,
    tr: target === 'textContent' ? element.textContent : element.getAttribute(target),
    en: element.getAttribute(attribute),
  })),
);

function renderLanguage(language) {
  const english = language === 'en';
  document.documentElement.lang = language;
  document.title = english ? 'Arcavia Foundry · Mobile Games' : 'Arcavia Foundry · Mobil Oyunlar';
  for (const translation of translations) {
    const value = translation[language];
    if (translation.target === 'textContent') {
      translation.element.textContent = value;
    } else {
      translation.element.setAttribute(translation.target, value);
    }
  }
  for (const link of document.querySelectorAll('[data-store]')) {
    const url = new URL(link.href);
    url.searchParams.set('hl', language);
    link.href = url.href;
  }
  languageButton.textContent = english ? 'TR' : 'EN';
  languageButton.lang = english ? 'tr' : 'en';
  languageButton.setAttribute('aria-label', english ? 'Türkçeye geç' : 'Switch to English');
}

languageButton.hidden = false;
languageButton.addEventListener('click', () => {
  renderLanguage(document.documentElement.lang === 'tr' ? 'en' : 'tr');
});
