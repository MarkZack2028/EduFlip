<?php
session_start();
require __DIR__ . '/config.php';

$errors = [];
$fullname = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullname = trim($_POST['fullname'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';
    $terms = isset($_POST['terms']);

    // Validasi server-side
    if ($fullname === '') {
        $errors[] = 'Nama lengkap wajib diisi.';
    }

    if ($email === '') {
        $errors[] = 'Email wajib diisi.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Format email tidak valid.';
    }

    if (strlen($password) < 8) {
        $errors[] = 'Kata sandi minimal 8 karakter.';
    }

    if ($password !== $confirmPassword) {
        $errors[] = 'Konfirmasi kata sandi tidak sesuai.';
    }

    if (!$terms) {
        $errors[] = 'Anda harus menyetujui Syarat & Ketentuan.';
    }

    if (!$errors) {
        // Cek apakah email sudah ada
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            $errors[] = 'Email sudah terdaftar. Silakan gunakan email lain atau login.';
        } else {
            // Insert user baru
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
            $stmt->execute([$fullname, $email, $passwordHash]);

            // Redirect ke login dengan pesan sukses
            header('Location: login.php?signup=success');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Daftar - EduFlip</title>
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/components.css" />
    <link rel="stylesheet" href="css/auth.css" />
    <link rel="stylesheet" href="css/responsive.css" />
  </head>
  <body>
    <!-- Navigation -->
    <nav>
      <div class="nav-container">
        <a href="index.html" class="logo" style="text-decoration: none">
          Edu<span>Flip</span>
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="login.php" class="cta-btn">Login</a></li>
        </ul>
      </div>
    </nav>

    <!-- Signup Section -->
    <section class="auth-section">
      <div class="auth-container">
        <div class="auth-card">
          <h1>Mulai Perjalanan Belajar Anda!</h1>
          <p>Bergabung dengan ribuan mahasiswa di EduFlip</p>

          <!-- Tampilkan error dari PHP -->
          <?php if (!empty($errors)): ?>
            <div class="alert alert-error" style="margin-bottom: 1rem;">
              <ul style="margin-left: 1.2rem;">
                <?php foreach ($errors as $err): ?>
                  <li><?= htmlspecialchars($err) ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>

          <form id="signupForm" class="auth-form" method="POST" action="">
            <div class="form-group">
              <label for="fullname">Nama Lengkap</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Masukkan nama lengkap Anda"
                required
                value="<?= htmlspecialchars($fullname) ?>"
              />
            </div>

            <div class="form-group">
              <label for="signupEmail">Email</label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                placeholder="Masukkan email Anda"
                required
                value="<?= htmlspecialchars($email) ?>"
              />
            </div>

            <div class="form-group">
              <label for="signupPassword">Kata Sandi</label>
              <div class="password-input-wrapper">
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  placeholder="Minimal 8 karakter"
                  required
                />
                <button
                  type="button"
                  class="toggle-password"
                  onclick="togglePasswordVisibility('signupPassword')"
                  aria-label="Tampilkan/Sembunyikan Kata Sandi"
                >
                  👁️
                </button>
              </div>
              <div class="password-strength-meter">
                <div class="strength-bar" id="strengthBar"></div>
                <span class="strength-text" id="strengthText"></span>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Konfirmasi Kata Sandi</label>
              <div class="password-input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Masukkan ulang kata sandi"
                  required
                />
                <button
                  type="button"
                  class="toggle-password"
                  onclick="togglePasswordVisibility('confirmPassword')"
                  aria-label="Tampilkan/Sembunyikan Kata Sandi"
                >
                  👁️
                </button>
              </div>
            </div>

            <div class="password-requirements">
              <p>Kata sandi harus mengandung:</p>
              <ul id="passwordChecklist">
                <li id="check-length">✗ Minimal 8 karakter</li>
                <li id="check-uppercase">✗ Huruf besar (A-Z)</li>
                <li id="check-lowercase">✗ Huruf kecil (a-z)</li>
                <li id="check-number">✗ Angka (0-9)</li>
                <li id="check-special">✗ Karakter khusus (!@#$%^&*)</li>
              </ul>
            </div>

            <div class="form-options">
              <label>
                <input type="checkbox" name="terms" required /> Saya setuju
                dengan <a href="#">Syarat & Ketentuan</a> dan
                <a href="#">Kebijakan Privasi</a>
              </label>
            </div>

            <button type="submit" class="btn-primary btn-full" id="submitBtn">
              Daftar
            </button>
          </form>

          <div class="auth-divider">atau</div>

          <button class="btn-social google-btn" type="button">
            <span>🔐</span> Daftar dengan Google
          </button>

          <div class="auth-footer">
            <p>Sudah punya akun? <a href="login.php">Masuk di sini</a></p>
          </div>
        </div>
      </div>
    </section>

    <script src="javascript/script.js"></script>
  </body>
</html>
