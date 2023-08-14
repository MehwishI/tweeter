$(document).ready(function () {
  $("textarea").on("input", function () {
    let charlen = $(this).val().length;

    if(charlen === 0) {
      alert("No content found!")
    }
    if (charlen > 140) {
      $(".counter").css("color", "red");
      alert("The number of characters has exceeded the limit!")
    } else {
      $(".counter").css("color", "black");
    }

    $(".counter").val(140 - charlen);
  });
});
