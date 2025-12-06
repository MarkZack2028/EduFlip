// Utility Functions

// Show Toast Notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "var(--matcha-dark)"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideInRight 0.4s ease;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Switch Content Pages
function switchContent(page) {
  const allContents = document.querySelectorAll(".content");
  allContents.forEach((content) => content.classList.remove("active"));

  const targetContent = document.getElementById(page + "Content");
  if (targetContent) {
    targetContent.style.opacity = "0";
    targetContent.style.transform = "translateY(20px)";
    targetContent.classList.add("active");

    setTimeout(() => {
      targetContent.style.transition = "all 0.5s ease";
      targetContent.style.opacity = "1";
      targetContent.style.transform = "translateY(0)";
    }, 10);

    // Initialize charts when switching to profile page
    if (page === "profile") {
      setTimeout(() => {
        initCharts();
      }, 100);
    }
  }
}

// Update User Info Display
function updateUserInfo() {
  const displayName = document.getElementById("displayName");
  const profileName = document.getElementById("profileName");

  if (displayName) displayName.textContent = currentUser.fullName;
  if (profileName) profileName.textContent = currentUser.fullName;

  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  if (fullNameInput) fullNameInput.value = currentUser.fullName;
  if (emailInput) emailInput.value = currentUser.email;
  if (phoneInput) phoneInput.value = currentUser.phone;
}

// Toggle Notification Panel
function toggleNotificationPanel() {
  const notificationPanel = document.getElementById("notificationPanel");
  if (notificationPanel) {
    notificationPanel.classList.toggle("show");
  }
}

// Update Notification Badge
function updateNotificationBadge() {
  const notificationBadge = document.getElementById("notificationBadge");
  const unreadCount = document.querySelectorAll(
    ".notification-item.unread"
  ).length;

  if (unreadCount > 0) {
    notificationBadge.textContent = unreadCount;
    notificationBadge.style.display = "block";
  } else {
    notificationBadge.style.display = "none";
  }
}
