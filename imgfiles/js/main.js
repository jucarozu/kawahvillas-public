$(document).ready(function () {
  $("#btnSignOut").on("click", function () {
    $.ajax({
      cache: false,
      type: "POST",
      url: "/api/v1/auth.signOut",
      processData: false,
      contentType: false,
      success: function (res) {
        let json = JSON.parse(res);
        if (json.success) {
          window.location.href = "/";
        } else {
          alert("An error occurred while logging out. " + json.error.message);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("An error occurred while logging out. " + errorThrown);
      }
    });
  });
});