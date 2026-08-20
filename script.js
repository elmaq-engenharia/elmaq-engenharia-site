document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener('click',e=>{const id=link.getAttribute('href');const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}})});

const contactCard=document.querySelector('.contact-card');
if(contactCard){
  const linkedinUrl='https://www.linkedin.com/company/elmaq-engenharia-industial-artefatos-de-concreto/';
  const linkedinBlock=document.createElement('div');
  linkedinBlock.className='linkedin-block';
  linkedinBlock.innerHTML=`
    <div class="linkedin-copy">
      <span class="linkedin-kicker">Presença institucional</span>
      <h3>Conecte-se com a ELMAQ no LinkedIn</h3>
      <p>Acompanhe novidades, projetos, máquinas e soluções de engenharia.</p>
      <a class="btn linkedin-btn" href="${linkedinUrl}" target="_blank" rel="noopener">Abrir LinkedIn da ELMAQ</a>
    </div>
    <a class="linkedin-qr" href="${linkedinUrl}" target="_blank" rel="noopener" aria-label="Abrir LinkedIn da ELMAQ pelo QR Code">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAAHCAQAAAABUY/ToAAAD4klEQVR4nO2cS4rjMBBAX40NWcqQA+Qo8g36SE0fqW9gHSUHaLCWAZmahUr5dc8sBod8prQwsaOHJChK9ZNE+beWfv0jCE466aSTTjrppJOPR4q1HhmzCGR7hXx6tF7jnWfr5EOSUVVVZ9ApFEg7eyUNQNoVZKRTVVW9JO8xWycfksymX2Sk06qM0q4A4SDAIgCYblppTCdfg+yv3jUNX72mESALSt4o9lhrTCdfi7yWIcgblThvi0BXiPMWifN2zTGdfC2yyVBQIIMQvtrmFWYEurPe5wHJ51qnkzcnk4iIDEDcbxTolLjvIc7WUUaW6patNaaTL0JWPXTSL5qGDjXbZ2nyEg5iqmqNMZ18RVLGFgGqX9MAOgVVCAWd8kapIpV7ZLzzbJ18RFInQGSnKmMotoMladHGMRzEAo0n3fSM63TyFqTZ1OmtQPw0+RDCQZTw1Su5+vsouau+mtxvtk4+IkmNPetsv2rEeqox6QJx7lR17uo3CNZfp+dap5M3J9NgSTP9qJ7XIjJWoTmIjKEg73Pb88Z7z9bJhyKPeqhTM6KBmiqLWqjKiFCs8xSOquq51unkrUmRXUHGLKITYELTUvY60XY6M6zvO1snH5PM/ZkzLyMATS3J+36jzUMr643p5GuQLcaYt0jc9wXoFPJWBUDiZ1eEUJD4abFIvd9snXxE8swvM6drBqoghWYKRbWYkflqbg85+Z2sgencQxo6rUIDzbpOA0AtLNp4DZqTV+3ML1MtND1EUzwzVfHYR48POfkzKbIrkFqRovlg4eTWL9JEynMdTv5I6sQiRFWVMaieSjxqPQhgm1zd0FYZ08lXI2u1a49+iFUN6cdg/52+nVTVs67TyfXJiyxZaIHpOHdahcZ2sKOdXbu4PeTkWdOzVkVFW7q1Cldz5q/Tss+1TidvR176ZS1lX/P2M5xSZXA8X+Yy5OR3svplZBF513aqrMaMaA+dL0zsp1ynk7cgz+uHplDsnCtwNIrMMjIF5Xl7J69bdbMsN7bv7VxHepsRiw8dBELpxc4LLc0xe651Onk78vJchyKAEOelhzxgDzqVOIHECfVaWCcv2pkeAroCYYYkoGlXek270kPeFnusMaaTL0mevPcpi0BQlfdjkKhtaODnOpz8I9nu/ahGtLVjUTW0o0LH1yddp5Prk9/ubEhvB9F65QegsPQkafYQefAaNCf/TsqY+3qGo+bGkvRWnf8xLFUPybjymE4+N3l974emtxmg9PUCmaggsPQQOpW0K66HnPyRPN77UVWQmT1Lu0Umb5S4t1MfMq4zppMvQorfce6kk0466aSTTv7n5G9zG2oz9m9GVwAAAABJRU5ErkJggg==" alt="QR Code para o LinkedIn da ELMAQ Engenharia" />
      <span>Escaneie e siga a ELMAQ</span>
    </a>`;
  contactCard.appendChild(linkedinBlock);
}
