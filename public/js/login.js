console.log("Updated version");

// Password visibility toggle
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.textContent = type === "password" ? "👁" : "🙈";
  });

// Client-side validation and form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("formError").textContent = "";

    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var hasError = false;

    // Simple email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      hasError = true;
    }

    // Password validation (minimum 8 characters)
    if (password.length < 8) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 8 characters long.";
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Send POST request to /login endpoint
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include", // Include credentials for session cookies
    })
      .then((response) => {
        // Check if the response is valid JSON
        if (
          response.headers.get("Content-Type")?.includes("application/json")
        ) {
          return response.json();
        } else {
          // If response is not JSON, throw an error with status
          throw new Error(
            "Server returned non-JSON response: " + response.statusText
          );
        }
      })
      .then((data) => {
        if (data.success) {
          // Redirect based on user role
          if (data.role === "admin") {
            window.location.href = "/admin_dashboard.html";
          } else {
            window.location.href = "/dashboard.html";
          }
        } else {
          // Display error message from server
          document.getElementById("formError").textContent = data.message;
        }
      })
      .catch((error) => {
        // Display error message on the client-side
        console.error("Error during login:", error);
        document.getElementById("formError").textContent =
          error.message || "An error occurred during login.";
      });
  });
