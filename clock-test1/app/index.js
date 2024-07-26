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

let writingAt = 0;

clock.granularity = "minutes";

clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    let mins = zeroPad(today.getMinutes());

    let bashText2 = `${hours}:${mins}`;

    setTimeout(() => {
        bash3.text = "> " + bashText3.substring(0, writingAt);

        console.log(writingAt);

        writingAt += 1;

        if (writingAt > bashText3.length) {
            console.log("done");
            bash1.text = "";
            bash2.text = "";
            bash3.text = "";
            writingAt = 0;
            setTimeout(() => {
                bash1.text = "> " + bashText1.substring(0, writingAt);
        
                writingAt += 1;
        
                if (writingAt > bashText1.length) {
                    bash2.text = bashText2;
                    writingAt = 0;
                    return;
                }
            }, 300);
            return;
        }
    }, 300);
}
