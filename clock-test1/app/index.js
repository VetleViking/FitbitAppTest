import document from "document";
import clock from "clock";
import { preferences } from "user-settings";

const bash1 = document.getElementById("bash1");
const bash2 = document.getElementById("bash2");
const bash3 = document.getElementById("bash3");

function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
};

let bashText1 = "time";
let bashText3 = "cls";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function writeText(text, element) {
    let writingAt = 0;
    while (writingAt <= text.length) {
        element.text = "> " + text.substring(0, writingAt);
        writingAt += 1;
        await delay(300);
    }
}

async function animation() {
    if (bash1.text !== "" || bash2.text !== "" || bash3.text !== "") {
        await writeText(bashText3, bash3);
        await delay(300);
        bash1.text = "";
        bash2.text = "";
        bash3.text = "";
    }
    await writeText(bashText1, bash1);


    console.log("done anim");
}

clock.granularity = "minutes";

clock.ontick = async (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    let mins = zeroPad(today.getMinutes());

    await animation();

    bash2.text = `${hours}:${mins}`;
    bash3.text = "> ";
}
