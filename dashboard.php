<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

$userName = $_SESSION['user_name'] ?? 'Pengguna';
$userEmail = $_SESSION['user_email'] ?? '';
?>
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard - EduFlip</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <!-- Navigation -->
    <nav>
      <div class="nav-container">
        <a href="index.html" class="logo"> Edu<span>Flip</span> </a>
        <ul class="nav-links">
          <li><a href="#dashboard" class="active-nav">Dashboard</a></li>
          <li><a href="#tab-courses">Kursus</a></li>
          <li><a href="#tab-progress">Progress</a></li>
          <li>
            <a href="logout.php" class="cta-btn" onclick="logout(event)"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Dashboard Section -->
    <section class="dashboard-section" id="dashboard">
      <div class="dashboard-container">
        <!-- Sidebar -->
        <aside class="dashboard-sidebar">
          <div class="user-profile">
            <div class="user-avatar">👤</div>
            <h3 id="userName"><?= htmlspecialchars($userName) ?></h3>
            <p class="user-email"><?= htmlspecialchars($userEmail) ?></p>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="dashboard-main">
          <!-- Overview Tab -->
          <div class="tab-content active" id="tab-overview">
            <div class="welcome-section">
              <h1>Selamat Datang Kembali! 👋</h1>
              <p>Lanjutkan pembelajaran Anda hari ini</p>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">⏰</div>
                <div class="stat-content">
                  <h3>Waktu Belajar</h3>
                  <p class="stat-value">12 jam</p>
                  <p class="stat-desc">minggu ini</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-content">
                  <h3>Tugas Selesai</h3>
                  <p class="stat-value">8/10</p>
                  <p class="stat-desc">minggu ini</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🏆</div>
                <div class="stat-content">
                  <h3>Poin</h3>
                  <p class="stat-value">1,250</p>
                  <p class="stat-desc">total poin</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🔥</div>
                <div class="stat-content">
                  <h3>Streak</h3>
                  <p class="stat-value">7 hari</p>
                  <p class="stat-desc">konsisten</p>
                </div>
              </div>
            </div>

            <div class="courses-section">
              <h2>Kursus Aktif Saya</h2>
              <div class="course-list">
                <div class="course-card">
                  <div class="course-header">
                    <h3>Web Development Fundamentals</h3>
                    <span class="progress-badge">60%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 60%"></div>
                  </div>
                  <p class="course-desc">
                    Belajar dasar-dasar web development dari HTML hingga CSS
                  </p>
                  <a href="#" class="btn-continue">Lanjutkan Belajar</a>
                </div>

                <div class="course-card">
                  <div class="course-header">
                    <h3>Digital Marketing Basics</h3>
                    <span class="progress-badge">35%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 35%"></div>
                  </div>
                  <p class="course-desc">
                    Pelajari strategi marketing digital yang efektif
                  </p>
                  <a href="#" class="btn-continue">Lanjutkan Belajar</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Courses Tab -->
          <div class="tab-content" id="tab-courses">
            <h1>Kursus Saya</h1>
            <div class="courses-grid">
              <div class="course-card-large">
                <div class="course-banner">🌐</div>
                <h3>Web Development</h3>
                <p>Tingkat: Pemula</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 60%"></div>
                </div>
              </div>
              <div class="course-card-large">
                <div class="course-banner">📱</div>
                <h3>Mobile App Dev</h3>
                <p>Tingkat: Menengah</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 40%"></div>
                </div>
              </div>
              <div class="course-card-large">
                <div class="course-banner">🎨</div>
                <h3>UI/UX Design</h3>
                <p>Tingkat: Pemula</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 25%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Tab -->
          <div class="tab-content" id="tab-progress">
            <h1>Progress Belajar</h1>
            <div class="progress-section">
              <div class="progress-chart">
                <h3>Aktivitas 7 Hari Terakhir</h3>
                <div class="activity-bars">
                  <div
                    class="activity-bar"
                    style="height: 60%"
                    title="2 jam"
                  ></div>
                  <div
                    class="activity-bar"
                    style="height: 80%"
                    title="3 jam"
                  ></div>
                  <div
                    class="activity-bar"
                    style="height: 70%"
                    title="2.5 jam"
                  ></div>
                  <div
                    class="activity-bar"
                    style="height: 90%"
                    title="3.5 jam"
                  ></div>
                  <div
                    class="activity-bar"
                    style="height: 75%"
                    title="3 jam"
                  ></div>
                  <div
                    class="activity-bar"
                    style="height: 85%"
                    title="3 jam"
                  ></div>
                  <div
                    class="activity-bar"
                    style="height: 100%"
                    title="4 jam"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div class="tab-content" id="tab-settings">
            <h1>Pengaturan</h1>
            <div class="settings-form">
              <div class="setting-group">
                <label>Notifikasi Email</label>
                <input type="checkbox" checked />
              </div>
              <div class="setting-group">
                <label>Mode Gelap</label>
                <input type="checkbox" id="darkModeToggle" />
              </div>
              <button
                class="btn-primary"
                onclick="alert('Pengaturan disimpan')"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>

    <!-- AI Chatbot -->
    <div class="chatbot-container collapsed">
      <div class="chatbot-header">
        <h3>EduFlip Assistant 🤖</h3>
        <button class="chatbot-toggle">+</button>
      </div>
      <div class="chatbot-messages" id="chatMessages">
        <div class="message bot-message">
          <p>
            Halo! Saya adalah EduFlip Assistant. Bagaimana saya bisa membantu
            Anda hari ini? Tanyakan apapun tentang pembelajaran, kursus, atau
            fitur EduFlip!
          </p>
        </div>
      </div>
      <div class="chatbot-input-area">
        <input
          type="text"
          id="chatInput"
          placeholder="Ketik pertanyaan Anda..."
          onkeypress="handleChatKeypress(event)"
        />
        <button onclick="sendChatMessage()" class="btn-send">Kirim</button>
      </div>
    </div>

    <script>
      window.SERVER_USER = {
        fullname: <?= json_encode($userName) ?>,
        email: <?= json_encode($userEmail) ?>,
      };
    </script>
    <script src="javascript/script.js"></script>
    <script src="javascript/dashboard.js"></script>
  </body>
</html>
