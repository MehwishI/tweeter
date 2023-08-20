$(document).ready(function () {
  $("textarea").on("input", function () {
    //get length of textarea
    let charlen = $(this).val().length;

    //if length is greater than 140 then show error text
    if (charlen > 140) {
      $(".counter").css("color", "red");
    } else {
      //show the counter in default color black
      $(".counter").css("color", "black");
    }

    //display counter with characters left with a negative sign
    $(".counter").val(140 - charlen);
  });
});
