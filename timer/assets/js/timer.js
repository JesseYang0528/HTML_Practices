let total = -1;
let timeSpan = 0;
let ID = 0;
let STOP = false;
let STOP_TIME = [];
targetTimeArray = [0, 0, 0];
function display_time() 
{
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    
    let currentTimeArray = [hh, mm, ss];
    let countingTimeArray = [];
    countingTimeArray = total_time(currentTimeArray, targetTimeArray);
    
    HOUR = check(countingTimeArray[0]);
    MINUTE = check(countingTimeArray[1]);
    SECOND = check(countingTimeArray[2]);
    
    // document.getElementById('bar').classList.add('progress_hover');

    if (timeSpan >= 0)
    {
        document.getElementById('hour').innerHTML = HOUR;
        document.getElementById('minute').innerHTML = MINUTE;
        document.getElementById('second').innerHTML = SECOND;
        document.getElementById('bar').style.width = (total - (countingTimeArray[0]*3600 + countingTimeArray[1]*60 + countingTimeArray[2]))/total*100 + "%";
        if (HOUR == 1 && MINUTE == 0 && SECOND == 0)
        {
            document.getElementById('hour').classList.add('text_green');
            document.getElementById('minute').classList.add('text_green');
            document.getElementById('second').classList.add('text_green');
        }
        else if (HOUR == 0 && MINUTE == 30 && SECOND == 0)
        {
            document.getElementById('hour').classList.add('text_orange');
            document.getElementById('minute').classList.add('text_orange');
            document.getElementById('second').classList.add('text_orange');
        }
        else if (HOUR == 0 && MINUTE < 5)
        {
            document.getElementById('hour').classList.add('text_red');
            document.getElementById('minute').classList.add('text_red');
            document.getElementById('second').classList.add('text_red');
        }
        else
        {
            document.getElementById('hour').classList.remove('text_green', 'text_orange', 'text_red');
            document.getElementById('minute').classList.remove('text_green', 'text_orange', 'text_red');
            document.getElementById('second').classList.remove('text_green', 'text_orange', 'text_red');
        }
        ID = requestAnimationFrame(display_time);
    }
    else
    {
        if (timeSpan > -5)
        {
            ID = requestAnimationFrame(display_time);
        }
        else
        {
            document.getElementById('hour').classList.remove('text_green', 'text_orange', 'text_red');
            document.getElementById('minute').classList.remove('text_green', 'text_orange', 'text_red');
            document.getElementById('second').classList.remove('text_green', 'text_orange', 'text_red');
            document.getElementById('button_stop').classList.add('button_disabled');
            document.getElementById('button_reset').classList.add('button_disabled');
            document.getElementById('button_start').value = 'Start';
            targetTimeArray = [0, 0, 0];
            cancelAnimationFrame(ID);
            total = -1;
            // document.getElementyId('bar').classList.remove('progress_hover');
        }
    }
}

function check(a) 
{
    if (a < 10) return "0"+ a;
    else return a;
}

function total_time(currentArray, targetArray)
{
    timeSpan = 0;
    for (let i = 0; i < 3; i++)
    {
        timeSpan += (targetArray[i] - currentArray[i]) * Math.pow(60, 2-i);
    }

    if (total == -1 || total < timeSpan)
    {
        total = timeSpan;
    }

    return [parseInt(timeSpan/3600), parseInt(timeSpan/60)%60, timeSpan%60];
}

function startTimer()
{
    if (STOP)
    {
        var now = new Date();
        var hh = now.getHours();
        var mm = now.getMinutes();
        var ss = now.getSeconds();
        let currentTimeStamp = hh*3600 + mm*60 + ss;
        let stopTimeStamp = STOP_TIME[0]*3600 + STOP_TIME[1]*60 + STOP_TIME[2];
        let stoppedTime = currentTimeStamp - stopTimeStamp;
        let targetTimeStamp = parseInt(targetTimeArray[0]*3600) + parseInt(targetTimeArray[1]*60) + parseInt(targetTimeArray[2]);
        targetTimeStamp += stoppedTime;
        targetTimeArray = [parseInt(targetTimeStamp/3600), parseInt(targetTimeStamp/60)%60, targetTimeStamp%60];
        document.getElementById('input_time').value = check(targetTimeArray[0]) + ":" + check(targetTimeArray[1]) + ":" + check(targetTimeArray[2]);
        document.getElementById('button_stop').classList.remove('button_disabled');
        document.getElementById('input_time').disabled = '';

        STOP = false;
    }
    else
    {
        let enteredTime = document.forms['time']['target_time'].value;
        // split target time into hours, minutes, seconds, seprator is :
        enteredTimeArray = enteredTime.split(':');
        for (let i = 0; i < enteredTimeArray.length; i++)
        {
            targetTimeArray[i] = enteredTimeArray[i];
        }
        if (enteredTimeArray.length < 3)
        {
            document.getElementById('input_time').value = check(targetTimeArray[0]) + ':' + check(targetTimeArray[1]) + ':' + check(targetTimeArray[2]);
        }
        document.getElementById('button_stop').classList.remove('button_disabled');
        document.getElementById('button_reset').classList.remove('button_disabled');
    }
    // return () => {
    //     ID = requestAnimationFrame(display_time);
    // }
    document.getElementById('button_start').value = 'Update';
    ID = requestAnimationFrame(display_time);
}
// setTimeout(display_time, 500)
// requestAnimationFrame(display_time)

function stopTimer()
{
    STOP = true;
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    STOP_TIME = [hh, mm, ss];
    document.getElementById('button_stop').classList.add('button_disabled');
    document.getElementById('input_time').value = 'Timer Stopped';
    document.getElementById('input_time').disabled = 'disabled';
    document.getElementById('button_start').value = 'Start';

    cancelAnimationFrame(ID);
}

function resetTimer()
{
    STOP = false;
    total = -1;
    targetTimeArray = [0, 0, 0];
    document.getElementById('hour').innerHTML = "00";
    document.getElementById('minute').innerHTML = "00";
    document.getElementById('second').innerHTML = "00";
    document.getElementById('hour').classList.remove('text_green', 'text_orange', 'text_red');
    document.getElementById('minute').classList.remove('text_green', 'text_orange', 'text_red');
    document.getElementById('second').classList.remove('text_green', 'text_orange', 'text_red');
    document.getElementById('bar').style.width = "100%";
    document.getElementById('input_time').value = "";
    document.getElementById('input_time').disabled = '';
    document.getElementById('button_start').value = 'Start';
    document.getElementById('button_stop').classList.add('button_disabled');
    document.getElementById('button_reset').classList.add('button_disabled');
    targetTimeArray = [0, 0, 0];
    cancelAnimationFrame(ID);
}