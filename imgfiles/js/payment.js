$(document).ready(function () {
  const stripe = Stripe("pk_test_51IoL75HR21ubejJfvvUpCssIGSTldMrhFBIfCRhvwsAEJaTJNPEr2Jp1zaqeEks0pHm5eoWnocm1Kst45qugw0bf00MrGyN4KD");
  const elements = stripe.elements();

  const cardNumberElement = elements.create('cardNumber', { showIcon: true });
  cardNumberElement.mount('#card-number-element');

  const cardExpiryElement = elements.create('cardExpiry');
  cardExpiryElement.mount('#card-expiry-element');

  const cardCvcElement = elements.create('cardCvc');
  cardCvcElement.mount('#card-cvc-element');

  cardNumberElement.on("change", function (event) {
    validateElements(event);
  });

  cardExpiryElement.on("change", function (event) {
    validateElements(event);
  });

  cardCvcElement.on("change", function (event) {
    validateElements(event);
  });

  function validateElements(event) {
    let displayError = document.getElementById("payment-message-error");

    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = "";
    }
  }

  $("#kawahvillas-payment-form").on("submit", function (event) {
    event.preventDefault();

    let btnPurchaseMembership = $("#btnPurchaseMembership");
    btnPurchaseMembership.prop("disabled", true);
    btnPurchaseMembership.css("cursor", "default");
    btnPurchaseMembership.css("opacity", "0.5");
    btnPurchaseMembership.val("Processing...");

    let errorMessage = $("#payment-message-error");
    errorMessage.css("display", "none");
    errorMessage.css("color", "red");
    errorMessage.text("");

    stripe.confirmCardPayment($("#clientSecret").val(), {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: $("#card-name-element").val(),
        },
      }
    }).then((res) => {
      btnPurchaseMembership.prop('disabled', false);
      btnPurchaseMembership.css("cursor", "pointer");
      btnPurchaseMembership.css("opacity", "1");
      btnPurchaseMembership.val("Purchase membership");

      if (res.error) {
        errorMessage.textContent = res.error.message;
      } else {
        window.location.href = "/checkout-successful";
      }
    });
  });
});