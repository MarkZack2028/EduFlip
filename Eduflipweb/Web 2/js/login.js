// Login Handler
function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    currentUser.username = username;
    currentUser.fullName = username.charAt(0).toUpperCase() + username.slice(1);

    const loginPage = document.getElementById("loginPage");
    const dashboardPage = document.getElementById("dashboardPage");
    const loginBox = document.querySelector(".login-box");
    const loginForm = document.getElementById("loginForm");

    loginBox.style.transform = "scale(0.9)";
    loginBox.style.opacity = "0";

    setTimeout(() => {
      loginPage.classList.remove("active");
      dashboardPage.classList.add("active");
      updateUserInfo();
      showToast("Selamat datang di EduFlip!", "success");

      loginForm.reset();
      loginBox.style.transform = "scale(1)";
      loginBox.style.opacity = "1";
    }, 300);
  } else {
    showToast("Harap isi username dan password!", "error");
  }
}

// Register Handler
function handleRegister(e) {
  e.preventDefault();
  showToast("Fitur registrasi akan segera hadir!", "info");
}

// Logout Handler
function handleLogout(e) {
  e.preventDefault();

  if (confirm("Apakah Anda yakin ingin keluar?")) {
    const dashboardPage = document.getElementById("dashboardPage");
    const loginPage = document.getElementById("loginPage");
    const navLinks = document.querySelectorAll(".nav-link[data-page]");

    dashboardPage.classList.remove("active");
    loginPage.classList.add("active");
    switchContent("dashboard");
    navLinks.forEach((l) => l.classList.remove("active"));
    navLinks[0].classList.add("active");
    showToast("Anda telah keluar", "info");
  }
}
