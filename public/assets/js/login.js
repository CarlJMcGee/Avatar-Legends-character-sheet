const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

// login
const loginFormHandler = async function (e) {
  e.preventDefault();

  const email = $("#email-login").val().trim();
  const pass = $("#pass-login").val().trim();
  const user = {
    email: email,
    password: pass,
  };

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

// sign up
const signupFormHandler = async function (e) {
  e.preventDefault();

  const username = $("#username-signup").val().trim();
  const email = $("#email-signup").val().trim();
  const pass = $("#pass-signup").val().trim();
  const passVal = $("#pass-val-signup").val().trim();
  const user = {
    username: username,
    email: email,
    password: pass,
  };

  if (pass !== passVal) {
    var passErr = document.createElement("p");
    passErr.className = "err-login column is-full has-text-danger";
    passErr.innerHTML = "Passwords must match";
    $("#signup-input-container").append(passErr);
  }

  try {
    const res = await fetch(`/api/user/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    res.ok ? document.location.replace("/") : console.error(`Signup Failed`);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
};

$(loginForm).submit(loginFormHandler);
$(signupForm).submit(signupFormHandler);
