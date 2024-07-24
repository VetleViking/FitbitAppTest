import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";

// Get a handle on the <text> elements
const myLabel = document.getElementById("myLabel");
const heartrate = document.getElementById("heartrate");
const steps = document.getElementById("steps");
const date = document.getElementById("date");
const image = document.getElementById("image");

let at = 0;

setInterval(() => {
  at = at + 1;

  if (at > 18) {
    at = 0;
  }

  image.href = `black-back-${at}.png`;
}, 100);

if (today.adjusted.steps) {
  setInterval(() => {
    steps.text = `Steps today: ${today.adjusted.steps}`;
  }, 10000);

  steps.text = `Steps today: ${today.adjusted.steps}`;
}

if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    heartrate.text = `Heartrate: ${hrm.heartRate}`;
  });
  hrm.start();
}

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

// Update the clock every minute
clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  date.text = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};
