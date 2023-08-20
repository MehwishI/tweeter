$(document).ready(function () {
  $("textarea").on("input", function () {
    //get length of textarea
    let charlen = $(this).val().length;

    //if length is equal to 0 then show error text
    if (charlen === 0) {
      $("#error-message").show();
      $("#error-message").text("No content found! Please enter some text.");
    }
    //if length is greater than 140 then show error text
    if (charlen > 140) {
      $(".counter").css("color", "red");
      $("#error-message").show();
      $("#error-message").text(
        "The number of characters has exceeded the limit!"
      );
    } else {
      $(".counter").css("color", "black");
    }

    //display counter with characters left with a negative sign
    $(".counter").val(140 - charlen);
  });
});
