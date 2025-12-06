// Data pengguna (simulasi - dalam aplikasi nyata gunakan backend)
let currentUser = {
  username: "",
  fullName: "Pengguna EduFlip",
  email: "user@eduflip.com",
  phone: "+62 812-3456-7890",
};

// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  // Login Form Handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Register Link Handler
  const registerLink = document.getElementById("registerLink");
  if (registerLink) {
    registerLink.addEventListener("click", handleRegister);
  }

  // Logout Button Handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Notification Events
  const notificationBell = document.getElementById("notificationBell");
  if (notificationBell) {
    notificationBell.addEventListener("click", toggleNotificationPanel);
  }

  const closeNotification = document.getElementById("closeNotification");
  if (closeNotification) {
    closeNotification.addEventListener("click", () => {
      const notificationPanel = document.getElementById("notificationPanel");
      if (notificationPanel) {
        notificationPanel.classList.remove("show");
      }
    });
  }

  // Click outside to close notification panel
  document.addEventListener("click", (e) => {
    const notificationPanel = document.getElementById("notificationPanel");
    const notificationBell = document.getElementById("notificationBell");
    if (notificationPanel && notificationBell) {
      if (
        !notificationPanel.contains(e.target) &&
        !notificationBell.contains(e.target)
      ) {
        notificationPanel.classList.remove("show");
      }
    }
  });

  // Mark notification as read when clicked
  document.querySelectorAll(".notification-item").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.remove("unread");
      updateNotificationBadge();
    });
  });

  // Navigation Links Handler
  const navLinks = document.querySelectorAll(".nav-link[data-page]");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      switchContent(page);

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Quiz Event Listeners
  document.querySelectorAll(".btn-start-quiz").forEach((btn) => {
    btn.addEventListener("click", function () {
      const quizCard = this.closest(".quiz-card");
      const quizType = quizCard.getAttribute("data-quiz");
      startQuiz(quizType);
    });
  });

  const nextQuestionBtn = document.getElementById("nextQuestion");
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", nextQuestion);
  }

  const prevQuestionBtn = document.getElementById("prevQuestion");
  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener("click", prevQuestion);
  }

  const backToQuizzesBtn = document.getElementById("backToQuizzes");
  if (backToQuizzesBtn) {
    backToQuizzesBtn.addEventListener("click", backToQuizzes);
  }

  const reviewAnswersBtn = document.getElementById("reviewAnswers");
  if (reviewAnswersBtn) {
    reviewAnswersBtn.addEventListener("click", reviewAnswers);
  }

  // Animasi tombol Enroll
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-enroll")) {
      e.target.textContent = "Sedang Memuat...";
      e.target.style.background = "var(--matcha-medium)";

      setTimeout(() => {
        e.target.textContent = "✓ Terdaftar";
        e.target.style.background = "var(--matcha-dark)";
        showToast("Berhasil mendaftar kursus!", "success");

        setTimeout(() => {
          e.target.textContent = "Mulai Belajar";
          e.target.style.background = "var(--matcha-main)";
        }, 1500);
      }, 1000);
    }

    // Event Registration
    if (e.target.classList.contains("btn-register-event")) {
      e.target.textContent = "Memproses...";
      e.target.style.background = "var(--matcha-medium)";
      e.target.disabled = true;

      setTimeout(() => {
        e.target.textContent = "✓ Terdaftar!";
        e.target.style.background = "var(--matcha-dark)";
        showToast(
          "Berhasil mendaftar event! Cek email untuk detail.",
          "success"
        );

        setTimeout(() => {
          e.target.textContent = "Sudah Terdaftar";
          e.target.style.opacity = "0.7";
        }, 1500);
      }, 1000);
    }
  });

  // Simpan perubahan profile
  const saveProfileBtns = document.querySelectorAll(
    ".info-section .btn-primary"
  );
  saveProfileBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      if (fullName && email && phone) {
        currentUser.fullName = fullName;
        currentUser.email = email;
        currentUser.phone = phone;

        const displayName = document.getElementById("displayName");
        const profileName = document.getElementById("profileName");

        if (displayName) displayName.textContent = fullName;
        if (profileName) profileName.textContent = fullName;

        e.target.textContent = "✓ Tersimpan!";
        e.target.style.background = "var(--matcha-dark)";

        showToast("Profil berhasil diperbarui!", "success");

        setTimeout(() => {
          e.target.textContent = "Simpan Perubahan";
          e.target.style.background =
            "linear-gradient(135deg, var(--matcha-main) 0%, var(--matcha-dark) 100%)";
        }, 2000);
      } else {
        showToast("Harap isi semua field!", "error");
      }
    });
  });

  // Animasi progress bar
  setTimeout(() => {
    const progressFills = document.querySelectorAll(".progress-fill");
    progressFills.forEach((fill) => {
      const width = fill.style.width;
      fill.style.width = "0";
      setTimeout(() => {
        fill.style.width = width;
      }, 100);
    });
  }, 500);

  // Parallax effect
  window.addEventListener("scroll", () => {
    const welcomeSection = document.querySelector(".welcome-section");
    if (welcomeSection && window.scrollY < 300) {
      welcomeSection.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });

  // Update notification badge on load
  updateNotificationBadge();
});
