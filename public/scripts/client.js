/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const { text } = require("body-parser");

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  // loops through tweets
  tweets.sort(function (a, b) {
    return b.created_at - a.created_at;
  });

  for (let tweetData of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweetData);
    $("#tweets-container").append($tweet);
  }
  // takes return value and appends it to the tweets container
};
//escape function
const escapeString = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};

//function to create tweet
const createTweetElement = function (tweetData) {
  //let $content = $("h2").text(tweetData.content.text)
  let $tweet = $(`<br/><br/><article class="article">
  <header class="tweet-header">
  <div class="iconName">
   <img src='${tweetData.user.avatars}'></img>
  <h2>${tweetData.user.name}</h2>
  </div>
  <p id="tweetid">${tweetData.user.handle}</p>
  </header>
  <p class="tweet-txt">${escapeString(tweetData.content.text)}</p>
  <br/>
  <hr>
  <footer class="footer">
            <div>${timeago.format(Date.now() - tweetData.created_at)}</div>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
  </article>`);

  return $tweet;
};
//function to load tweets
//Fetch tweets from the server

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
//$("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc
$(document).ready(() => {
  $("#error-message").empty();
  $("#error-message").hide();

  //load existing tweets
  const loadtweets = function () {
    $.get("http://localhost:8080/tweets").then((data) => {
      console.log(data);
      renderTweets(data);
    });
  };
  loadtweets();

  //form on submit event handler

  const form = $("form");
  //add an event listener to the form
  form.on("submit", (event) => {
    $("#error-message").empty();
    $("#error-message").hide();

    if ($("textarea").val().length <= 0) {
      $("#error-message").show();
      $("#error-message").text("No content found! Please enter some text.");
      return false;
    } else if ($("textarea").val().length > 140) {
      $("#error-message").show();
      $("#error-message").text(
        "The number of characters has exceeded the limit!"
      );
      return false;
      //alert("The number of characters has exceeded the limit!")
    } else {
      //prevent default behaviour
      event.preventDefault();
      //serialize data to sent to the server
      //console.log($(this).data);
      var str = $(form).serialize();
      console.log(str);

      //sent post request to server
      $.post(`http://localhost:8080/tweets?q=${str}`, str);

      $("#tweets-container").empty();
      $("#tweet-text").val("");

      loadtweets();
    }
  });

  /////
});
