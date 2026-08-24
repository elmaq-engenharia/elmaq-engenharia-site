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
  load('ceo-v21.js?v=27', () => {
    load('rafael-v22.js?v=28', () => {
      load('edson-v27.js?v=27', () => load('script-core-v20.js?v=27'));
    });
  });
})();
