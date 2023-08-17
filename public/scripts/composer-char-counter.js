$(document).ready(function () {
  $("textarea").on("input", function () {
    let charlen = $(this).val().length;

    if (charlen === 0) {
      $("#error-message").show();
      $("#error-message").text("No content found! Please enter some text.");
    }
    if (charlen > 140) {
      $(".counter").css("color", "red");
      $("#error-message").show();
      $("#error-message").text(
        "The number of characters has exceeded the limit!"
      );
    } else {
      $(".counter").css("color", "black");
    }

    $(".counter").val(140 - charlen);
  });
});
