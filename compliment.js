// javascript to display compliments

export const renderComplimentButton = function() {
    return `<div style="text-align:center;">
        <button class="button compliment-button">GIVE ME AFFIRMATION</button>
    </div>
    `
}

export const handleComplimentButtonPress = async function(event) {
    const $root = $('#root');
    const comp = await axios({
        method: 'get',
        url: 'https://complimentr.com/api',
    });
    $(root).append(`<div style="text-align: center; font-size: 80px;">
        <h1>${comp.data.compliment}</h1>
    </div>`)
}

export  const loadComplimentIntoDOM = async function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 100px;">
        <a href="./index.html">Back to Main</a>
    </div>`)
    $root.append(renderComplimentButton());
    $root.on("click", ".compliment-button", handleComplimentButtonPress);
}

/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
 $(function() {
    loadComplimentIntoDOM();
});