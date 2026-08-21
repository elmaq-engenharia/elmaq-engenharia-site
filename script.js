(() => {
  'use strict';
  const load = (src, done) => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = false;
    s.onload = () => done && done();
    s.onerror = () => done && done();
    document.head.appendChild(s);
  };
  load('ceo-v21.js?v=21', () => load('script-core-v20.js?v=21'));
})();
