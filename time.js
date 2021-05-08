// javascript to display time

const result = await axios({
    method: 'get',
    url: 'http://worldclockapi.com/api/json/est/now',
  });

let time = result.data;
console.log(time)
let date = time.currentDateTime;
console.log(date)

export const daylightSavings = function(boolean) {
    if (boolean) {
        return "YES";
    }
    return "NO";
}

export const renderTime = function(time) {
    return `<div style="text-align: center; font-size: 80px;">
    <h1>Current Date & Time: ${time.currentDateTime}</h1>
    <h1>Day of the Week: ${time.dayOfTheWeek}</h1>
    <h1>Time Zone Name: ${time.timeZoneName}</h1>
    <h1>Is This Day Light Savings Time: ${daylightSavings(time.isDayLightSavingsTime)}</h1>
    </div>`
}

export  const loadTimeIntoDOM = async function(time) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 100px;">
                    <a href="./index.html">Back to Main</a>
                </div>`)
    $root.append(renderTime(time));
}

/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
 $(function() {
    loadTimeIntoDOM(time);
});