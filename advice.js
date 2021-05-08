// javascript to display insults

export const renderAdviceButton = function() {
    return `<div style="text-align:center;">
        <button class="button advice-button">GIVE ME ADVICE</button>
        <h2>(Wait a few seconds between each click)</h2>
    </div>
    `
}

export const handleAdviceButtonPress = async function(event) {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'https://api.adviceslip.com/advice',
    });
    $(root).append(`<div style="text-align: center; font-size: 80px;">
        <h1>${result.data.slip.advice}</h1>
    </div>`)
}

export  const loadAdviceIntoDOM = async function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 100px;">
        <a href="./index.html">Back to Main</a>
    </div>`)
    $root.append(renderAdviceButton());
    $root.on("click", ".advice-button", handleAdviceButtonPress);
}

/**
 * Use jQuery to execute the loadAdviceIntoDOM function after the page loads
 */
 $(function() {
    loadAdviceIntoDOM();
});