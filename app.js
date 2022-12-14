var start;
var finish;
var index;
var backup;


function begin(){
    // if the button is clickable the page will break
    document.getElementById("beginbtn").setAttribute('disabled', 'disabled');

    // save a copy of the original for reset
    backup = document.getElementById("problem").innerHTML;
    simulate();
}

async function simulate(){
    // begin countdown
    await countdown();

    // show elements
    document.getElementById("userinput").style.display = "block";

    // start timer
    start = new Date().toLocaleTimeString();
    
    // send cursor to input box
    document.getElementById("userinput").focus();

    // compare inputs
    await read_input();
}

function get_sentance(){
    let text = "For centuries, kings, queens and generals have relied on efficient communication in order to govern their countries and command their armies.At the same time, they have all been aware of the consequences of their messages falling into the wrong hands, revealing precious secrets to rival nations and betraying vital information to opposing forces.It was the threat of enemy interception that motivated the development of codes and ciphers: techniques for disguising a message so that only the intended recipient can read it.The desire for secrecy has meant that nations have operated codemaking departments, which were responsible for ensuring the security of communications by inventing and implementing the best possible codes.At the same time, enemy codebreakers have attempted to break these codes and steal secrets";
    let textArr = text.split(".");

    let myNum = Math.floor(Math.random() * textArr.length);
    console.log("generated number = " + myNum)
    console.log("text array length is " + textArr.length)
    document.getElementById("problem").innerHTML = textArr[myNum] + ".";
}

function reset(){
    let UserInput = document.getElementById("userinput");
    UserInput.style.display = "none";
    UserInput.value = "";

    document.getElementById("wpm").innerHTML = "";
    document.getElementById("time").innerHTML = "";
    document.getElementById("countdown_timer").style.display = "none";
    document.getElementById('userinput').removeAttribute('readonly');
    document.getElementById("beginbtn").removeAttribute('disabled', 'disabled');
    document.getElementById("problem").innerHTML = backup;
    get_sentance();
}

async function countdown(){
    // show the timer
    document.getElementById("countdown_timer").style.display = "block";
    
    //run countdown
    let input = document.getElementById("countdown_timer");

    input.innerHTML = 3;
    await delay(1000);
    input.innerHTML = 2;
    await delay(1000);
    input.innerHTML = 1;
    await delay(1000);    
    input.innerHTML = "Go";
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function calculate_passed_time(start, finish){
    console.log(start);
    let startArr = start.split(":");
    startArr[2] = startArr[2][0] + startArr[2][1];
    
    let finishArr = finish.split(":");
    finishArr[2] = finishArr[2][0] + finishArr[2][1];

    let time = [finishArr[0] - startArr[0], finishArr[1] - startArr[1], finishArr[2] - startArr[2]];

    if(time[2] < 0){
        time[1]--;
        time[2] += 60;
    }

    return time;

}

async function read_input(){
    let text = document.getElementById("problem").innerHTML;
    // WHATEVER YOU DO DONT CHANGE THIS TO "onkeydown"
    document.getElementById("userinput").onkeyup = function(){
        // length of input
        cur_input = document.getElementById("userinput").value
        len = cur_input.length;

        // build compare text 
        let str = "";
        for(let i = 0; i < len; i++){
            str += text[i];
        }
        let remainder = "";
        for(let i = len; i < text.length; i++){
            remainder += text[i];
        }

        if(str != cur_input){
            document.getElementById("problem").innerHTML = "<span style=\"color: red;\">"+str+"</span><span style=\"color: black;\">"+remainder+"</span>";
            document.getElementById("userinput").style.color = "red";
        }else{
            document.getElementById("problem").innerHTML = "<span style=\"color: green;\">"+str+"</span><span style=\"color: black;\">"+remainder+"</span>";
            document.getElementById("userinput").style.color = "green";
        }

        if(text == cur_input ){
            document.getElementById('userinput').setAttribute('readonly', 'readonly');
            document.getElementById("problem").innerHTML = str;
            document.getElementById("problem").style.color = "black";
            postResults(start);
        }
    }
}

function postResults(start){
    // end timer
    finish = new Date().toLocaleTimeString();

    // get and display time passed
    let time = calculate_passed_time(start, finish);

    // diplay time
    document.getElementById("time").innerHTML = "" + time[1] + " minutes, " + time[2] + " seconds";

    let numWords = document.getElementById("problem").innerHTML.split(" ");
    let wpm = numWords.length / (time[0] * 60 + time[1] + time[2]/60);
    let wpmdiv = document.getElementById("wpm");
    wpmdiv.innerHTML = wpm.toFixed(1) + " words/minute";
    wpmdiv.style.display = "block";

    document.getElementById("countdown_timer").innerHTML = "SUCCESS";
}

function geteasy(){
    console.log("Easy")
    get_sentance()
}
function getmed(){
    console.log("Medium")
    get_sentance()
    
}
function gethard(){
    console.log("Hard")
    get_sentance()
}