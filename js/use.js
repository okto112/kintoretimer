'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const mask = document.getElementById('mask');


  open.addEventListener('click', () => {
    overlay.classList.add('show');
    mask.classList.add('show');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    mask.classList.remove('show');
  });

  mask.addEventListener('click', () => {
    close.click();
  });

}