// Javascript code to render a twitter feed from COMP 426 Twitter API

const result = await axios({
    method: 'get',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
  });

let tweets = result.data;

export const renderTweet = function(Tweet) {
    // Code to put a Tweet's message, name of user, number of likes, number of retweets,
    // whether the current user has liked the tweet, a like button, a reply button, and a retweet button
    return `<div style="border: 1px solid black; width: 30%; margin: auto; background-color: #ffffff">
        <h2>${Tweet.author}</h2>
        <h3>${Tweet.body}</h3>
        <div>
            <Button style="findId=${Tweet.id} id="like" class="button like-button">${Tweet.likeCount} Likes</Button>
            <Button findId="${Tweet.id}" findAuthor="${Tweet.author}" findMessage="${Tweet.body}" class="button reply-button">${Tweet.replyCount} Replies</Button>
            <Button findId="${Tweet.id}" findAuthor="${Tweet.author}" findMessage="${Tweet.body}" class="button retweet-button">${Tweet.retweetCount} Retweets</Button>
        </div>
    </div>`
}



export  const loadTweetsIntoDOM = async function(tweets) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 100px;">
                    <a href="./index.html">Back to Main</a>
                </div>`)
    for (let i = 0; i < tweets.length; i++) {
        $root.append(renderTweet(tweets[i]));
        $root.append(`<br></br>`);
    }
}

/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
 $(function() {
    loadTweetsIntoDOM(tweets);
});