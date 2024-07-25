import document from "document";
import clock from "clock";
import { preferences } from "user-settings";

const hourselem = document.getElementById("hours")
const minuteselem = document.getElementById("minutes");
const backgroundNums = document.getElementById("backgroundNums");

function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
};

function numToBin(num) {
    let bin = num.toString(2);
    if (bin.length < 6) {
        let padding = 6 - bin.length;
        for (let i = 0; i < padding; i++) {
            bin = "0" + bin;
        }
    }
    return bin;
}

clock.granularity = "minutes";

clock.ontick = (evt) => {
    let today = evt.date;
    let hours = numToBin(today.getHours());
    let mins = numToBin(today.getMinutes());
    hourselem.text = `${hours}`;
    minuteselem.text = `${mins}`;
}
