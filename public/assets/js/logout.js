const logoutHandler = async function (e) {
  e.preventDefault();

  const res = await fetch(`/api/user/logout`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });

  res.ok ? document.location.replace("/login") : console.error("Logout failed");
};

$("#logout-btn").click(logoutHandler);
