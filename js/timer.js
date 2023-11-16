'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const mask = document.getElementById('mask');

  const setText = document.getElementById('settext');
  const topText = document.getElementById('toptext');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const count = document.getElementById('count');
  const timer1 = document.getElementById('timer1');
  const timer2 = document.getElementById('timer2');
  const timer = document.querySelector('.timer');
  const music1 = new Audio('./music/Countdown.mp3');
  const music2 = new Audio('./music/Alarm.mp3');

  const maintimer = localStorage.getItem('maintimer')
  const interval = localStorage.getItem('interval');
  const setnum = localStorage.getItem('setnum');

  let [h, m, s] = "";
  let sn = setnum;
  let ms = "";
  let c = 4;
  let time1 = "";
  let countDown = "";
  let set = 1;
  let check = false;
  let running = false;


  function down() {
    if (!running) {
      music1.play();
    }
    running = true;
    music2.pause();
    music2.currentTime = 0;
    timer.classList.add('orange');
    if (c > 1) {
      c--;
      count.textContent = c;
    } else {
      clearInterval(countDown);
      timer.classList.remove('orange');
      count.classList.add('hidden');
      timer1.classList.remove('hidden');
      timer2.classList.remove('hidden');
      start.classList.add('hidden');
      start.classList.remove('off');
      stop.classList.remove('hidden');
      reset.classList.remove('off');
      timerText(h, m, s, ms);
      time1 = setInterval(num, 10);
      return;
    }
  }

  function num() {
    running = true;
    if (ms > 0) {
      ms--;
    } else if (s > 0 && ms == 0) {
      s--;
      ms = 99;
    } else if (m > 0 && s == 0 && ms == 0) {
      m--;
      s = 59;
      ms == 99;
    } else if (h > 0 && m == 0 && s == 0 && ms == 0) {
      h--;
      m = 59;
      s = 59;
      ms == 99;
    } else if (h == 0 && m == 0 && s == 0 && ms == 0) {
      clearInterval(time1);
      ms = 0;
      music2.play();
      if (check == false) {
        check = true;
        timer.classList.add('red');
        setText.textContent = set + "セット目 インターバル";
        timerValue();
        time1 = setInterval(num, 10);
      } else if (set < sn && check == true) {
        set++;
        setText.textContent = set + "セット目 筋トレ";
        check = false;
        running = false;
        c = 4;
        timerValue();
        timer.classList.remove('red');
        start.classList.remove('hidden');
        start.classList.add('off');
        stop.classList.add('hidden');
        reset.classList.add('off');
        count.classList.remove('hidden');
        timer1.classList.add('hidden');
        timer2.classList.add('hidden');
        down();
        countDown = setInterval(down, 1000);
        return;
      } else if (set >= sn) {
        check = false;
        running = false;
        set = 1;
        c = 4;
        setText.textContent = set + "セット目 筋トレ";
        timerValue();
        timer.classList.remove('red');
        start.classList.remove('hidden');
        stop.classList.add('hidden');
        // reset.classList.add('off');
      }
    } else {
      alert("null");
      clearInterval(time1);
    }
    timerText(h, m, s, ms);
    return;
  }

  function timerText(h, m, s, ms) {
    timer1.textContent = String(h).padStart(2, '0') + ":" +
      String(m).padStart(2, '0') + ":" + String(s).padStart(2, '0');
    timer2.textContent = "." + String(ms).padStart(2, '0');
  }

  function timerValue() {
    if (check == false) {
      [h, m, s] = maintimer.split(':');
    } else {
      [h, m, s] = interval.split(':');
    }
  }

  function stopMusic() {
    music1.pause();
    music1.currentTime = 0;
    music2.pause();
    music2.currentTime = 0;
  }


  timerValue();
  setText.textContent = set + "セット目 筋トレ";


  start.addEventListener('mousedown', () => {
    count.classList.remove("hidden");
    topText.classList.add('hidden');
    timer1.classList.add('hidden');
    timer2.classList.add('hidden');
    start.classList.add('off');
    reset.classList.remove("off");
    [h, m, s] = [h, m, s];
    ms = ms;
    setText.textContent = set + "セット目 筋トレ";
    music2.play();
    stopMusic();
    if (running) {
      down();
    } else {
      music1.play();
      down();
      countDown = setInterval(down, 1000);
    }
  });

  stop.addEventListener('mousedown', () => {
    clearInterval(time1);
    stopMusic();
    timerText(h, m, s, ms);
    start.classList.remove("hidden");
    stop.classList.add("hidden");
  });

  reset.addEventListener('mousedown', () => {
    clearInterval(countDown);
    clearInterval(time1);
    stopMusic();
    check = false;
    running = false;
    ms = 0;
    c = 4;
    set = set;
    count.textContent = 3;
    setText.textContent = set + "セット目 筋トレ";
    timerValue();
    timerText(h, m, s, ms);
    timer.classList.remove('red');
    start.classList.remove("hidden");
    start.classList.remove("off");
    stop.classList.add("hidden");
    reset.classList.add('off');
  });


  // headermenue
  open.addEventListener('click', () => {
    overlay.classList.add('show');
    mask.classList.add('show');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    mask.classList.remove('show');
  });
  mask.addEventListener('click', () => { close.click(); });
}