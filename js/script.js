// clock variables
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

clock = () => {
  let today = new Date();
  // let h = (today.getHours() % 12) + today.getMinutes() / 59;
  // let m = (today.getMinutes() % 60) + today.getSeconds() / 59;
  // let s = today.getSeconds();
  let h = today.getHours() + today.getMinutes() / 60;
  let m = today.getMinutes() + today.getSeconds() / 60;
  let s = today.getSeconds() + today.getMilliseconds() / 1000;

  h *= 30; // 12*30 = 360
  m *= 6; // 60*6 = 360
  s *= 6; // 60*6 = 360

  rotation(hours, h);
  rotation(minutes, m);
  rotation(seconds, s);

  setTimeout(clock, 1);
};

rotation = (target, val) => {
  target.style.transform = `rotate(${val}deg)`;
};

window.onload = clock();

// play button

const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const playBtn = document.querySelector(".circle-btn");
const wave1 = document.querySelector(".circle-back-1");
const wave2 = document.querySelector(".circle-back-2");

playBtn.addEventListener("click", function (e) {
  e.preventDefault();
  pause.classList.toggle("visibility");
  play.classList.toggle("visibility");
  playBtn.classList.toggle("shadow");
  wave1.classList.toggle("paused");
  wave2.classList.toggle("paused");
});

// slider

const bar = document.querySelector(".slider-bar");
const btn = document.querySelector(".slider-btn");
const color = document.querySelector(".slider-color");
const tooltip = document.querySelector(".slider-tooltip");

dragElement = (target, btn) => {
  target.addEventListener("mousedown", (e) => {
    onMouseMove(e);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  onMouseMove = (e) => {
    e.preventDefault();
    let targetRect = target.getBoundingClientRect();
    let x = e.pageX - targetRect.left + 10;
    if (x > targetRect.width) {
      x = targetRect.width;
    }
    if (x < 0) {
      x = 0;
    }
    btn.x = x - 10;
    btn.style.left = btn.x + "px";

    // for getting position of btn on slider bar
    let percentPosition = ((btn.x + 10) / targetRect.width) * 100;

    // color width = position of button
    color.style.width = percentPosition + "%";

    // move the tooltip when buttn moves and show the tooltip
    tooltip.style.left = btn.x - 5 + "px";
    tooltip.style.opacity = 1;

    // show the percentage in the tooltip
    tooltip.textContent = Math.round(percentPosition) + "%";
  };

  onMouseUp = (e) => {
    window.removeEventListener("mousemove", onMouseMove);
    tooltip.style.opacity = 0;

    btn.addEventListener("mouseover", function () {
      tooltip.style.opacity = 1;
    });

    btn.addEventListener("mouseout", function () {
      tooltip.style.opacity = 0;
    });
  };
};

dragElement(bar, btn);
