'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const mask = document.getElementById('mask');
  const allReset = document.getElementById('allreset');

  const maintimers = document.querySelectorAll('.maintimer');
  const intervals = document.querySelectorAll('.interval');
  const main1 = document.getElementById('main1');
  const main2 = document.getElementById('main2');
  const main3 = document.getElementById('main3');
  const interval1 = document.getElementById('interval1');
  const interval2 = document.getElementById('interval2');
  const interval3 = document.getElementById('interval3');
  const setnum = document.getElementById('setnum');

  let mainValue = "";
  let mainSplit = "";
  let intervalValue = "";
  let intervalSplit = "";


  function optionTag(select1, select2, select3) {
    for (let i = 0; i < 25; i++) {
      const option = document.createElement('option');
      let n = String(i).padStart(2, '0');
      option.value = n;
      option.text = n;
      select1.add(option);
    }

    for (let i = 0; i < 60; i++) {
      const option = document.createElement('option');
      let n = String(i).padStart(2, '0');
      option.value = n;
      option.text = n;
      select2.add(option);
    }

    for (let i = 0; i < 60; i++) {
      const option = document.createElement('option');
      let n = String(i).padStart(2, '0');
      option.value = n;
      option.text = n;
      select3.add(option);
    }
  }

  function timerValue(split, select1, select2, select3) {
    select1.value = split[0];
    select2.value = split[1];
    select3.value = split[2];
  }

  function reset(select1, select2, select3) {
    select1.value = "00";
    select2.value = "00";
    select3.value = "00";
    mainValue = (`${select1.value}:${select2.value}:${select3.value}`);
    intervalValue = (`${select1.value}:${select2.value}:${select3.value}`);
  }


  optionTag(main1, main2, main3);
  optionTag(interval1, interval2, interval3);


  mainValue = localStorage.getItem('maintimer');
  intervalValue = localStorage.getItem('interval');
  setnum.value = localStorage.getItem('setnum');


  if (mainValue === null && intervalValue === null && setnum.value === "") {
    mainValue = ("00:00:00");
    intervalValue = ("00:00:00");
    setnum.value = 1;
  }

  mainSplit = mainValue.split(':');
  intervalSplit = intervalValue.split(':');
  timerValue(mainSplit, main1, main2, main3);
  timerValue(intervalSplit, interval1, interval2, interval3);


  localStorage.setItem('maintimer', mainValue);
  localStorage.setItem('interval', intervalValue);
  localStorage.setItem('setnum', setnum.value);


  maintimers.forEach((maintimer) => maintimer.addEventListener('input', () => {
    mainValue = (`${main1.value}:${main2.value}:${main3.value}`);
    localStorage.setItem('maintimer', mainValue);
  }));

  intervals.forEach((interval) => interval.addEventListener('input', () => {
    intervalValue = (`${interval1.value}:${interval2.value}:${interval3.value}`);
    localStorage.setItem('interval', intervalValue);
  }));

  setnum.addEventListener('input', () => {
    localStorage.setItem('setnum', setnum.value);
  });


  // headermenu
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

  allReset.addEventListener('click', () => {
    reset(main1, main2, main3);
    reset(interval1, interval2, interval3);
    setnum.value = "1";
    localStorage.setItem('maintimer', mainValue);
    localStorage.setItem('interval', intervalValue);
    localStorage.setItem('setnum', setnum.value);
  });
}