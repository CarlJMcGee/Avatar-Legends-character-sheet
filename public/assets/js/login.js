const loginForm = document.querySelector("#login-form");

const loginFormHandler = async function (e) {
  e.preventDefault();

  const email = $("#email-login").val().trim();
  const pass = $("#pass-login").val().trim();
  const user = {
    email: email,
    password: pass,
  };

  console.log(`${email} ${pass}`);

  try {
    const res = await fetch(`/api/user/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    const resBody = await res.json();

    if (resBody.code === "email/pass") {
      if ($(".err-login").length > 0) {
        return;
      }
      var error = document.createElement("p");
      error.className = "err-login column is-full has-text-danger";
      error.innerHTML = resBody.message;
      $("#login-input-container").append(error);
      return;
    }

    res.ok ? document.location.replace("/") : window.alert("Failed to login");
  } catch (err) {
    if (err) console.error(err);
  }
};

$(loginForm).submit(loginFormHandler);
