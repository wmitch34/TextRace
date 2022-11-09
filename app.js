var start;
var finish;
var index;
var backup;

function begin(){
    document.getElementById("beginbtn").setAttribute('disabled', 'disabled');
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
}

async function countdown(){
    // show the timer
    document.getElementById("countdown_timer").style.display = "block";
    
    //run countdown
    display_num(3);
    await delay(1000);
    display_num(2);
    await delay(1000);
    display_num(1);
    await delay(1000);    
    display_num("Go!");
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function display_num(input){
    document.getElementById("countdown_timer").innerHTML = input;
}

function calculate_passed_time(start, finish){
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