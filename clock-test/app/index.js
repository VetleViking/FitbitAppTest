import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";

// Get a handle on the <text> elements
const myLabel = document.getElementById("myLabel");
const myLabel2 = document.getElementById("myLabel2");
const steps = document.getElementById("steps");
const hello = document.getElementById("hello");

if (today.adjusted.steps) {
  steps.addEventListener("reading", () => {
    steps.text = `Steps today: ${today.adjusted.steps}`;
  });
}

if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    myLabel2.text = `Heartrate: ${hrm.heartRate}`;
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

hello.text = "Hello World!";

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
};
