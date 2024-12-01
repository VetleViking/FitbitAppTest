import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { battery } from "power";
import { display } from "display";

// Get a handle on the <text> elements
const hour1 = document.getElementById("hour1");
const hour2 = document.getElementById("hour2");
const minute1 = document.getElementById("minute1");
const minute2 = document.getElementById("minute2");
const heartrate = document.getElementById("heartrate");
const steps = document.getElementById("steps");
const date = document.getElementById("date");
const image = document.getElementById("image");
const batteryElem = document.getElementById("battery");
const batterylevel = document.getElementById("batterylevel");

let at = 0;

setInterval(() => {
    at = at + 1;

    if (at > 18) {
        at = 0;
    }

    image.href = `black-back-${at}.png`;
}, 100);

function updateBattery() {
    if (!battery) {
        batteryElem.text = "--";
        batterylevel.height = 0;
        batterylevel.y = 244;
        return;
    }

    batteryElem.text = `${battery.chargeLevel}%`;
    batterylevel.height = Math.floor(battery.chargeLevel / 10);
    batterylevel.y = 244 - Math.floor(battery.chargeLevel / 10);
}

updateBattery();
battery.onchange = () => updateBattery();

function updateSteps() {
    if (today.adjusted.steps) {
        steps.text = today.adjusted.steps;
    } else {
        steps.text = "0";
    }
}

if (HeartRateSensor) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
        heartrate.text = `${hrm.heartRate}`;
    });
    hrm.start();

    heartrate.text = `${hrm.heartRate || 0}`;
}

function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

function getDayStr(index) {
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[index];
}

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
    
    hour1.href = `${hours.toString()[0]}.png`;
    hour2.href = `${hours.toString()[1]}.png`;
    minute1.href = `${mins.toString()[0]}.png`;
    minute2.href = `${mins.toString()[1]}.png`;

    date.text = `${getDayStr(today.getDay())} ${today.getDate()}`;
};

setInterval(intervalFunction, 2500);

function intervalFunction() {
    if (display.on) {
        updateSteps();
    }
}

display.onchange = function() {
    if (display.on) {
        updateSteps();
    }
};