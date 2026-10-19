// Pinned Ionic initializer; see vendor/ionic/VERSION for provenance.
import { i as initialize } from './vendor/ionic/p-HthJZjZ6.js';
import { defineCustomElement as defineContent } from './vendor/ionic/ion-segment-content.js';
import { defineCustomElement as defineView } from './vendor/ionic/ion-segment-view.js';
import { defineCustomElement as defineButton } from './vendor/ionic/ion-segment-button.js';
import { defineCustomElement as defineSegment } from './vendor/ionic/ion-segment.js';

initialize({mode:'ios'});
defineContent();
defineView();
defineButton();
const panel = document.getElementById('reader-panel');
const selector = document.getElementById('device-selector');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Ionic's public method accepts an explicit smooth-scroll flag.
const setContent = panel.setContent.bind(panel);
panel.setContent = (id, smooth = true) => setContent(id, smooth && !reducedMotion.matches);
defineSegment();

function updateReader() {
  const value = selector.value || 'iphone';
  panel.querySelectorAll('ion-segment-content').forEach(page => {
    const selected = page.dataset.platform === value;
    page.inert = !selected;
    page.setAttribute('aria-hidden', String(!selected));
    if (selected) panel.style.height = `${page.querySelector('.reader-grid').getBoundingClientRect().height}px`;
  });
}
selector.addEventListener('ionChange', updateReader);
const resize = new ResizeObserver(updateReader);
panel.querySelectorAll('.reader-grid').forEach(grid => resize.observe(grid));
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) panel.setContent(`reader-${selector.value}`, false);
});
updateReader();

document.querySelectorAll('a[href="#reader"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const reader = document.getElementById('reader');
    history.pushState(null, '', '#reader');
    reader.focus({preventScroll:true});
    reader.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  });
});
