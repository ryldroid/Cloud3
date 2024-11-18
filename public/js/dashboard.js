// Fetch user details when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchUserDetails();
});

async function fetchUserDetails() {
  try {
    const response = await fetch("/user-details", { credentials: "include" });
    if (!response.ok) {
      throw new Error("Failed to fetch user details.");
    }
    const data = await response.json();

    if (data.success) {
      document.getElementById("userEmail").textContent = data.user.email;
    } else {
      console.error("Failed to fetch user details:", data.message);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

// Log Out
document
  .getElementById("logoutLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    performLogout();
  });
async function performLogout() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      window.location.href = "index.html";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
