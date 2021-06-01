$(document).ready(function () {
  $("#btnCheckout").on("click", function (event) {
    let membership = $("input[name=cart-membership]:checked").val();

    if (membership != undefined) {
      let formData = new FormData();
      formData.append("membership", membership);

      let btnCheckout = $("#btnCheckout");
      btnCheckout.prop("disabled", true);
      btnCheckout.css("cursor", "default");
      btnCheckout.css("opacity", "0.5");
      btnCheckout.val("Processing...");

      let errorMessage = $("#cart-message-error");
      errorMessage.css("display", "none");
      errorMessage.css("color", "red");
      errorMessage.text("");

      $.ajax({
        cache: false,
        type: "POST",
        url: "/api/v1/checkout.addSubscription",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
          let json = JSON.parse(res);
          if (json.error) {
            errorMessage.css("display", "block");
            errorMessage.text(json.error.message);
          } else {
            window.location.href = "/payment/" + membership;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          errorMessage.css("display", "block");
          errorMessage.text(errorThrown);
        },
        complete: function () {
          btnCheckout.prop('disabled', false);
          btnCheckout.css("cursor", "pointer");
          btnCheckout.css("opacity", "1");
          btnCheckout.val("Proceed to checkout");
        }
      });
    } else {
      alert("You must select a membership");
    }
  });
});