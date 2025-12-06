<?php
session_start();
require __DIR__ . '/config.php';

$errors = [];
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        $errors[] = 'Email dan kata sandi wajib diisi.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Format email tidak valid.';
    }

    if (!$errors) {
        $stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            $errors[] = 'Email atau kata sandi salah.';
        } else {
            // Simpan ke session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];

            // Redirect ke dashboard
            header('Location: dashboard.php');
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
    <title>Login - EduFlip</title>
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
          <li><a href="signup.php" class="cta-btn">Daftar</a></li>
        </ul>
      </div>
    </nav>

    <!-- Login Section -->
    <section class="auth-section">
      <div class="auth-container">
        <div class="auth-card">
          <h1>Selamat Datang Kembali!</h1>
          <p>Masuk untuk melanjutkan pembelajaran Anda</p>

          <!-- Pesan sukses setelah signup -->
          <?php if (isset($_GET['signup']) && $_GET['signup'] === 'success'): ?>
            <div class="alert alert-success" style="margin-bottom: 1rem;">
              Pendaftaran berhasil! Silakan login dengan akun Anda.
            </div>
          <?php endif; ?>

          <!-- Error login -->
          <?php if (!empty($errors)): ?>
            <div class="alert alert-error" style="margin-bottom: 1rem;">
              <ul style="margin-left: 1.2rem;">
                <?php foreach ($errors as $err): ?>
                  <li><?= htmlspecialchars($err) ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>

          <form id="loginForm" class="auth-form" method="POST" action="">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukkan email Anda"
                required
                value="<?= htmlspecialchars($email) ?>"
              />
            </div>

            <div class="form-group">
              <label for="loginPassword">Kata Sandi</label>
              <div class="password-input-wrapper">
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  placeholder="Masukkan kata sandi Anda"
                  required
                />
                <button
                  type="button"
                  class="toggle-password"
                  onclick="togglePasswordVisibility('loginPassword')"
                  aria-label="Tampilkan/Sembunyikan Kata Sandi"
                >
                  👁️
                </button>
              </div>
            </div>

            <div class="form-options">
              <label>
                <input type="checkbox" name="remember" /> Ingat saya
              </label>
              <a href="#" class="forgot-password">Lupa kata sandi?</a>
            </div>

            <button type="submit" class="btn-primary btn-full">Masuk</button>
          </form>

          <div class="auth-divider">atau</div>

          <button class="btn-social google-btn" type="button">
            <span>🔐</span> Masuk dengan Google
          </button>

          <div class="auth-footer">
            <p>Belum punya akun? <a href="signup.php">Daftar di sini</a></p>
          </div>
        </div>
      </div>
    </section>

    <script src="javascript/script.js"></script>
  </body>
</html>
