$(document).ready(function() {
  $(document).on("tabby", function(event) {
    const tab = event.target;
    const content = event.detail.content;

    if (content.id == "kawahvillas-auth-sign-in") {
      history.pushState({}, "", "/auth/sign-in");
    } else {
      history.pushState({}, "", "/auth/sign-up");
    }

    if (window.matchMedia('(min-width: 1024px)').matches) {
      if (content.id == "kawahvillas-auth-sign-in") {
        $("#kawahvillas-auth-sign-in-slogan").css("display", "flex");
        $("#kawahvillas-auth-sign-up-slogan").hide();
        $("#kawahvillas-auth-sign-in .email").focus();
      } else {
        $("#kawahvillas-auth-sign-in-slogan").hide();
        $("#kawahvillas-auth-sign-up-slogan").css("display", "flex");
        $("#kawahvillas-auth-sign-up .name").focus();
      }
    }
  });

  $("#kawahvillas-auth-sign-in").on("submit", function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("email", $("#signInEmail").val());
    formData.append("password", $("#signInPassword").val());

    let btnSignIn = $("#btnSignIn");
    btnSignIn.prop("disabled", true);
    btnSignIn.css("cursor", "default");
    btnSignIn.css("opacity", "0.5");
    btnSignIn.val("Processing...");

    let errorMessage = $("#sign-in-message-error");
    errorMessage.css("display", "none");
    errorMessage.css("color", "red");
    errorMessage.text("");

    $.ajax({
        cache: false,
        type: "POST",
        url: "/api/v1/auth.signIn",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          let json = JSON.parse(res);
          if (json.success) {
            window.location.href = "/our-villas";
          } else {
            errorMessage.css("display", "block");
            errorMessage.text(json.error.message);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          errorMessage.css("display", "block");
          errorMessage.text(errorThrown);
        },
        complete: function() {
          btnSignIn.prop('disabled', false);
          btnSignIn.css("cursor", "pointer");
          btnSignIn.css("opacity", "1");
          btnSignIn.val("Sign In");
        }
    });
  });

  $("#kawahvillas-auth-sign-up").on("submit", function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", $("#signUpName").val());
    formData.append("email", $("#signUpEmail").val());
    formData.append("password", $("#signUpPassword").val());
    formData.append("country", $("#signUpCountry").val());
    formData.append("phone", $("#signUpPhone").val());

    let btnSignUp = $("#btnSignUp");
    btnSignUp.prop("disabled", true);
    btnSignUp.css("cursor", "default");
    btnSignUp.css("opacity", "0.5");
    btnSignUp.val("Processing...");

    let errorMessage = $("#sign-up-message-error");
    errorMessage.css("display", "none");
    errorMessage.css("color", "red");
    errorMessage.text("");

    $.ajax({
        cache: false,
        type: "POST",
        url: "/api/v1/auth.signUp",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          let json = JSON.parse(res);
          if (json.success) {
            window.location.href = "/cart";
          } else {
            errorMessage.css("display", "block");
            errorMessage.text(json.error.message);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          errorMessage.css("display", "block");
          errorMessage.text(errorThrown);
        },
        complete: function() {
          btnSignUp.prop('disabled', false);
          btnSignUp.css("cursor", "pointer");
          btnSignUp.css("opacity", "1");
          btnSignUp.val("Next");
        }
    });
  });
});