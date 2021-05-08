// javascript to display time

const result = await axios({
    method: 'get',
    url: 'http://worldtimeapi.org/api/timezone',
  });

console.log(result.data)
let zones = result.data;


/*export const daylightSavings = function(boolean) {
    if (boolean) {
        return "YES";
    }
    return "NO";
}*/

/*export const renderTime = function(time) {
    return `<div style="text-align: center; font-size: 80px;">
    <h1>Current Date & Time: ${time.currentDateTime}</h1>
    <h1>Day of the Week: ${time.dayOfTheWeek}</h1>
    <h1>Time Zone Name: ${time.timeZoneName}</h1>
    <h1>Is This Day Light Savings Time: ${daylightSavings(time.isDayLightSavingsTime)}</h1>
    </div>`
}*/

export const renderTimeZones = function(zone) {
    return `<div style="text-align: center; font-size: 80px;">
    <h1>Zone: ${zone}</h1>
    </div>`
}


export  const loadTimeIntoDOM = async function(zones) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 100px;">
                    <a href="./index.html">Back to Main</a>
    </div>`)
    
    for (let i = 0; i < zones.length; i++) {
        $root.append(renderTimeZones(zones[i]));
    }

}

/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
 $(function() {
    loadTimeIntoDOM(zones);
});