const BOX_SIZE = 100;
const BOX_CENTER = BOX_SIZE / 2;
const FONT_SIZE = 4;
const FONT_CORRECTION = FONT_SIZE / 2;
const SAFE_FONT_SIZE = FONT_SIZE + 2;
const HOURS_RING = BOX_CENTER - 3 * SAFE_FONT_SIZE;
const MINUTES_RING = BOX_CENTER - 2 * SAFE_FONT_SIZE;
const SECONDS_RING = BOX_CENTER - SAFE_FONT_SIZE;

const svg = document.querySelector('[data-js="clock-container"]');
const hourText = document.querySelector('[data-js="clock-hour"]');
const minuteText = document.querySelector('[data-js="clock-minute"]');
const secondText = document.querySelector('[data-js="clock-second"]');
const hourLine = document.querySelector('[data-js="hour-line"]');
const minuteLine = document.querySelector('[data-js="minute-line"]');
const secondLine = document.querySelector('[data-js="second-line"]');

const degToRad = (angle) => (Math.PI * angle) / 180;
const radToDeg = (angle) => (180 * angle) / Math.PI;

const hourAngle = degToRad(360 / 12);
const minuteAndSecondAngle = degToRad(360 / 60);

const cartesianToPolar = (x, y) => [
  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
  Math.atan2(y, x),
];
const polarToCartesian = (r, a) => [r * Math.cos(a), r * Math.sin(a)];

const setPosition = (svgText, svgLine, ring, angle) => {
  const x = BOX_CENTER + ring * Math.sin(angle);
  const y = BOX_CENTER - ring * Math.cos(angle);

  svgText.setAttribute("x", x - FONT_CORRECTION);
  svgText.setAttribute("y", y + FONT_CORRECTION);

  const [r, a] = cartesianToPolar(x - BOX_CENTER, y - BOX_CENTER);
  const [lineX, lineY] = polarToCartesian(r - 3, a);

  svgLine.setAttribute("x2", lineX + BOX_CENTER);
  svgLine.setAttribute("y2", lineY + BOX_CENTER);
};

const getAnalogHour = (hour) => (hour >= 12 ? hour - 12 : hour);

const updateTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hoursAngle = hourAngle * getAnalogHour(hours);
  const minutesAngle = minuteAndSecondAngle * minutes;
  const secondsAngle = minuteAndSecondAngle * seconds;

  setPosition(hourText, hourLine, HOURS_RING, hoursAngle);
  setPosition(minuteText, minuteLine, MINUTES_RING, minutesAngle);
  setPosition(secondText, secondLine, SECONDS_RING, secondsAngle);

  hourText.textContent = hours.toString().padStart("2", "0");
  minuteText.textContent = minutes.toString().padStart("2", "0");
  secondText.textContent = seconds.toString().padStart("2", "0");
};

setInterval(updateTime, 1000);
updateTime();
