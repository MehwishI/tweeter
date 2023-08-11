$(document).ready(function () {
  $("textarea").on("input", function () {
    let charlen = $(this).val().length;

    if (charlen > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }

    $(".counter").val(140 - charlen);
  });
});
