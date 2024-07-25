import document from "document";
import clock from "clock";
import { preferences } from "user-settings";

const hourselem = document.getElementById("hours")
const minuteselem = document.getElementById("minutes");

clock.granularity = "minutes";

clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    let mins = zeroPad(today.getMinutes());
    hourselem.text = `${hours}`;
    minuteselem.text = `${mins}`;
}
