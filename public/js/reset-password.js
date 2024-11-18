document
  .getElementById("reset-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const resetKey = document.getElementById("reset-code").value;
    const newPassword = document.getElementById("new-password").value;

    const payload = {
      resetKey: resetKey,
      newPassword: newPassword,
    };

    fetch("/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Your password has been reset successfully.");
          window.location.href = "/index.html";
        } else {
          alert("Failed to reset password: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred.");
      });
  });

// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const newPasswordField = document.getElementById("new-password");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute of the password field
  const type = newPasswordField.type === "password" ? "text" : "password";
  newPasswordField.type = type;

  // Toggle the icon
  this.textContent = type === "password" ? "👁" : "🙈";
});
