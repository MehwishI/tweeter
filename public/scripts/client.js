/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets and sort by created at date in descending order
  tweets.sort(function (a, b) {
    return b.created_at - a.created_at;
  });

  for (let tweetData of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweetData);
    // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
  }
};
//escape function
const escapeString = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};

//function to create tweet element
const createTweetElement = function (tweetData) {
  let $tweet = $(`<br/><br/><article class="article">
  <header class="tweet-header">
  <div class="iconName">
   <img src='${tweetData.user.avatars}' alt="user avatar"></img>
  <h2>${tweetData.user.name}</h2>
  </div>
  <p class="tweetid">${tweetData.user.handle}</p>
  </header>
  <p class="tweet-txt">${escapeString(tweetData.content.text)}</p>
  <br/>
  <hr>
  <footer class="footer">
            <div>${timeago.format(tweetData.created_at)}</div>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
  </article>`);

  return $tweet;
};

//function to slide up and down tweets
const slideButton = function () {
  $("#sec-new-tweet").slideToggle("slow", "linear");
  if ($("#sec-new-tweet").visibility === true) {
    $("textarea").active = true;
  }
};

$(document).ready(() => {
  //empty error message element
  $("#error-message").empty();
  //hide error message element
  $("#error-message").hide();

  //load existing tweets
  const loadtweets = function () {
    $.get("/tweets").then((data) => {
      renderTweets(data);
    });
  };

  loadtweets();

  //when DOM is scrolled, scroll button is set display= block
  $(document).on("scroll", (event) => {
    if ($(this).scrollTop() > 100) {
      $("#scrollbtnId").css("display", "block");
    } else {
      $("#scrollbtnId").css("display", "none");
    }
  });

  //scroll button click event handler
  $("#scrollbtnId").on("click", (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const newTweetBtn = $("#writeTweet");
  newTweetBtn.on("click", (event) => {
    slideButton();
  });

  //code for form on-submit event handler
  const form = $("form");
  //add an event listener to the form
  form.on("submit", (event) => {
    $("#error-message").empty();
    $("#error-message").hide();

    //show error if length is less than 0
    if ($("textarea").val().length <= 0) {
      $("#error-message").show();
      $("#error-message").text("No content found! Please enter some text.");
      //returning false so that it doesn't proceed to post
      return false;

      //if length is greater than 140 then show error text
    } else if ($("textarea").val().length > 140) {
      $("#error-message").show();
      $("#error-message").text(
        "The number of characters has exceeded the limit!"
      );
      //returning false so that it doesn't proceed to post
      return false;
    } else {
      //prevent default behaviour
      event.preventDefault();

      //serialize data to sent to the server
      var str = $(form).serialize();

      //sent post request to server with the data (str)
      $.post(`/tweets?q=${str}`, str).then(() => {
        //empty out the container
        $("#tweets-container").empty();
        //clear the text area
        $("#tweet-text").val("");

        //load tweets again to show all the tweets
        //along with the newly added tweet
        loadtweets();
      });
    }
  });
});
