// javascript to display jokes

export const renderJokeButton = function() {
    return `<div style="text-align:center;">
        <button class="button joke-button">GIVE ME JOKE</button>
    </div>
    `
}

export const handleJokeButtonPress = async function(event) {
    const $root = $('#root');
    const joke = await axios({
        method: 'get',
        url: 'https://official-joke-api.appspot.com/random_joke',
    });
    $(root).append(`<div style="text-align: center; font-size: 80px;">
        <h1>${joke.data.setup}</h1>
        <h1>${joke.data.punchline}</h1>
    </div>`)
}

export  const loadJokesIntoDOM = async function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 100px;">
        <a href="./index.html">Back to Main</a>
    </div>`)
    $root.append(renderJokeButton());
    $root.on("click", ".joke-button", handleJokeButtonPress);
}

/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
 $(function() {
    loadJokesIntoDOM();
});