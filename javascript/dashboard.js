// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  setupTabNavigation();
  setupChatbotToggle();
});

// Load user data from localStorage
function loadUserData() {
  const serverUser = window.SERVER_USER;
  const localUser = JSON.parse(localStorage.getItem("userData"));
  const userData = serverUser || localUser;

  const nameEl = document.getElementById("userName");
  const emailEl = document.querySelector(".user-email");

  if (userData) {
    if (nameEl) nameEl.textContent = userData.fullname || "User Name";
    if (emailEl) emailEl.textContent = userData.email || "user@email.com";
  }
}

// Setup tab navigation
function setupTabNavigation() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = item.getAttribute("data-tab");

      // Remove active class from all items
      navItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      item.classList.add("active");

      // Hide all tabs
      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active");
      });

      // Show selected tab
      document.getElementById(`tab-${tabName}`).classList.add("active");
    });
  });
}

function setupChatbotToggle() {
  const header = document.querySelector(".chatbot-header");
  const toggleBtn = document.querySelector(".chatbot-toggle");

  if (header) {
    header.addEventListener("click", (e) => {
      // Avoid double-handling when clicking the button
      if (e.target.classList.contains("chatbot-toggle")) return;
      toggleChatbot();
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleChatbot);
  }
}

async function sendChatMessage() {
  const chatInput = document.getElementById("chatInput");
  const userMessage = chatInput.value.trim();

  if (!userMessage) return;

  // Add user message to chat
  addMessageToChat(userMessage, "user");
  chatInput.value = "";

  // Show loading indicator
  addLoadingMessage();

  try {
    // Call the API route to get AI response
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response");
    }

    const data = await response.json();
    removeLoadingMessage();

    // Add bot response
    addMessageToChat(data.reply, "bot");
  } catch (error) {
    console.error("[v0] Chat error:", error);
    removeLoadingMessage();
    addMessageToChat("Maaf, terjadi kesalahan. Silakan coba lagi.", "bot");
  }
}

function addMessageToChat(message, sender) {
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;

  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = message;

  messageDiv.appendChild(messageParagraph);
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingMessage() {
  const chatMessages = document.getElementById("chatMessages");
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message bot-message";
  loadingDiv.id = "loadingMessage";

  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = "Sedang mengetik...";

  loadingDiv.appendChild(messageParagraph);
  chatMessages.appendChild(loadingDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingMessage() {
  const loadingMessage = document.getElementById("loadingMessage");
  if (loadingMessage) {
    loadingMessage.remove();
  }
}

function handleChatKeypress(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}

function toggleChatbot() {
  const container = document.querySelector(".chatbot-container");
  const toggleBtn = document.querySelector(".chatbot-toggle");
  const chatInput = document.getElementById("chatInput");

  if (!container) return;

  const isCollapsed = container.classList.toggle("collapsed");
  if (toggleBtn) {
    toggleBtn.textContent = isCollapsed ? "+" : "-";
  }

  if (!isCollapsed && chatInput) {
    setTimeout(() => chatInput.focus(), 50);
  }
}

function logout(event) {
  event.preventDefault();
  localStorage.removeItem("userData");
  window.location.href = "logout.php";
}
