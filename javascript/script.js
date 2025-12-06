function togglePasswordVisibility(fieldId) {
  const field = document.getElementById(fieldId);
  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // FAQ Toggle
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
        item.classList.toggle("active");
      });
    }
  });

  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("signupPassword");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");
  const passwordChecklist = document.querySelectorAll("#passwordChecklist li");

  // Password strength + checklist
  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);

      updateStrengthMeter(strength, strengthBar, strengthText);
      updatePasswordChecklist(password, passwordChecklist);
    });
  }

  // SIGNUP – hanya validasi, submit ke PHP kalau valid
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const termsCheckbox = document.querySelector('input[name="terms"]');

      let hasError = false;

      if (!fullname) {
        showAlert("Nama lengkap tidak boleh kosong", "error");
        hasError = true;
      }

      if (!email) {
        showAlert("Email tidak boleh kosong", "error");
        hasError = true;
      } else if (!isValidEmail(email)) {
        showAlert("Format email tidak valid", "error");
        hasError = true;
      }

      if (password.length < 8) {
        showAlert("Kata sandi minimal 8 karakter", "error");
        hasError = true;
      } else {
        const strength = calculatePasswordStrength(password);
        if (strength < 2) {
          showAlert(
            "Kata sandi terlalu lemah. Harus mengandung huruf besar, kecil, angka, dan karakter khusus",
            "error"
          );
          hasError = true;
        }
      }

      if (password !== confirmPassword) {
        showAlert("Konfirmasi kata sandi tidak sesuai", "error");
        hasError = true;
      }

      if (!termsCheckbox || !termsCheckbox.checked) {
        showAlert("Anda harus menyetujui Syarat & Ketentuan", "error");
        hasError = true;
      }

      // Kalau ada error, stop submit ke PHP
      if (hasError) {
        e.preventDefault();
      }
      // Kalau tidak ada error → biarkan form submit normal ke signup.php
    });
  }

  // LOGIN – hanya validasi, submit ke PHP kalau valid
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("loginPassword").value;

      let hasError = false;

      if (!email || !password) {
        showAlert("Email dan kata sandi tidak boleh kosong", "error");
        hasError = true;
      } else if (!isValidEmail(email)) {
        showAlert("Format email tidak valid", "error");
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
      }
      // Kalau valid → form akan dikirim ke login.php
    });
  }
});

function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=[\]{};:'",.<>?/\\|`~]/.test(password)) strength++;

  // Return 0-3 scale
  return Math.min(Math.floor((strength - 1) / 1.5), 3);
}

function updateStrengthMeter(strength, strengthBar, strengthText) {
  if (!strengthBar || !strengthText) return;

  const strengthLevels = ["weak", "fair", "good", "strong"];
  const strengthLabels = ["Lemah", "Sedang", "Baik", "Sangat Kuat"];

  strengthBar.innerHTML = "";
  const fill = document.createElement("div");
  fill.className = `strength-bar-fill ${strengthLevels[strength]}`;
  strengthBar.appendChild(fill);

  strengthText.textContent = strengthLabels[strength];
  strengthText.className = `strength-text ${strengthLevels[strength]}`;
}

function updatePasswordChecklist(password, checklist) {
  if (!checklist) return;

  const checks = {
    "check-length": password.length >= 8,
    "check-uppercase": /[A-Z]/.test(password),
    "check-lowercase": /[a-z]/.test(password),
    "check-number": /[0-9]/.test(password),
    "check-special": /[!@#$%^&*()_+\-=[\]{};:'",.<>?/\\|`~]/.test(password),
  };

  checklist.forEach((item) => {
    const id = item.id;
    if (checks[id]) {
      item.classList.add("active");
      if (!item.textContent.startsWith("✓")) {
        item.textContent = item.textContent.replace("✗", "✓");
      }
    } else {
      item.classList.remove("active");
      if (!item.textContent.startsWith("✗")) {
        item.textContent = item.textContent.replace("✓", "✗");
      }
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type = "info") {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background-color: ${
          type === "error"
            ? "#D32F2F"
            : type === "success"
            ? "#388E3C"
            : "#2196F3"
        };
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
