// Quiz Data
const quizData = {
  python: {
    title: "Python Fundamentals",
    questions: [
      {
        question: 'Apa fungsi dari keyword "def" dalam Python?',
        options: [
          "Mendeklarasikan variabel",
          "Mendefinisikan fungsi",
          "Membuat class",
          "Mengimport module",
        ],
        correct: 1,
      },
      {
        question:
          "Tipe data apa yang digunakan untuk menyimpan bilangan desimal?",
        options: ["int", "str", "float", "bool"],
        correct: 2,
      },
      {
        question: "Method apa yang digunakan untuk menambahkan elemen ke list?",
        options: ["add()", "append()", "insert()", "push()"],
        correct: 1,
      },
      {
        question: "Apa output dari: print(type([1,2,3]))?",
        options: [
          "<class 'tuple'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'set'>",
        ],
        correct: 1,
      },
      {
        question: "Cara membuat komentar satu baris dalam Python?",
        options: ["// komentar", "/* komentar */", "# komentar", "-- komentar"],
        correct: 2,
      },
      {
        question: "Apa fungsi dari len()?",
        options: [
          "Menghitung panjang/jumlah elemen",
          "Mengurutkan data",
          "Mengubah tipe data",
          "Menghapus elemen",
        ],
        correct: 0,
      },
      {
        question: "Keyword apa yang digunakan untuk loop dalam Python?",
        options: ["repeat", "loop", "for", "iterate"],
        correct: 2,
      },
      {
        question: 'Apa perbedaan antara "==" dan "="?',
        options: [
          "Tidak ada perbedaan",
          "= untuk assignment, == untuk perbandingan",
          "== untuk assignment, = untuk perbandingan",
          "Keduanya untuk perbandingan",
        ],
        correct: 1,
      },
      {
        question: "Method apa yang mengubah string menjadi huruf besar semua?",
        options: ["upper()", "toUpper()", "capitalize()", "uppercase()"],
        correct: 0,
      },
      {
        question: "Cara membuat dictionary kosong?",
        options: ["dict = []", "dict = ()", "dict = {}", "dict = <>"],
        correct: 2,
      },
    ],
  },
  algorithm: {
    title: "Algoritma & Logika",
    questions: [
      {
        question: "Apa itu algoritma?",
        options: [
          "Bahasa pemrograman",
          "Urutan langkah sistematis untuk menyelesaikan masalah",
          "Tipe data",
          "Fungsi matematika",
        ],
        correct: 1,
      },
      {
        question: "Big O notation O(n) menunjukkan kompleksitas waktu?",
        options: ["Konstan", "Linear", "Logaritmik", "Kuadratik"],
        correct: 1,
      },
      {
        question: "Struktur data yang menggunakan prinsip LIFO adalah?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correct: 1,
      },
      {
        question: "Algoritma sorting yang paling efisien untuk data besar?",
        options: [
          "Bubble Sort",
          "Selection Sort",
          "Quick Sort",
          "Insertion Sort",
        ],
        correct: 2,
      },
      {
        question: "Apa itu rekursi?",
        options: [
          "Loop biasa",
          "Fungsi yang memanggil dirinya sendiri",
          "Pengulangan dengan while",
          "Iterasi array",
        ],
        correct: 1,
      },
      {
        question: "Binary Search hanya bisa digunakan pada data yang?",
        options: ["Acak", "Terurut", "Genap", "Ganjil"],
        correct: 1,
      },
      {
        question: "Apa kepanjangan dari DFS?",
        options: [
          "Data Flow System",
          "Depth First Search",
          "Direct File System",
          "Dynamic Function Search",
        ],
        correct: 1,
      },
      {
        question: "Kompleksitas waktu dari Binary Search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
      },
      {
        question: "Queue menggunakan prinsip?",
        options: ["LIFO", "FIFO", "LILO", "FILO"],
        correct: 1,
      },
      {
        question: "Apa itu array?",
        options: [
          "Fungsi",
          "Kumpulan data dengan tipe sama",
          "Loop",
          "Kondisi",
        ],
        correct: 1,
      },
    ],
  },
  webdev: {
    title: "Web Development",
    questions: [
      {
        question: "Apa kepanjangan dari HTML?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correct: 0,
      },
      {
        question: "Tag HTML untuk membuat paragraf?",
        options: ["<paragraph>", "<p>", "<text>", "<para>"],
        correct: 1,
      },
      {
        question: "CSS digunakan untuk?",
        options: [
          "Membuat struktur halaman",
          "Styling dan tampilan",
          "Logika program",
          "Database",
        ],
        correct: 1,
      },
      {
        question: "Cara mendeklarasikan variabel di JavaScript modern?",
        options: ["var", "let/const", "int", "define"],
        correct: 1,
      },
      {
        question: "Method JavaScript untuk mengambil elemen by ID?",
        options: ["getElement()", "getElementById()", "selectId()", "findId()"],
        correct: 1,
      },
      {
        question: "Apa fungsi dari tag <head> dalam HTML?",
        options: [
          "Menampilkan konten",
          "Metadata dan informasi halaman",
          "Membuat header",
          "Navigasi",
        ],
        correct: 1,
      },
      {
        question: "Properti CSS untuk mengubah warna teks?",
        options: ["text-color", "color", "font-color", "text"],
        correct: 1,
      },
      {
        question: "Cara membuat komentar dalam CSS?",
        options: [
          "// komentar",
          "/* komentar */",
          "# komentar",
          "<!-- komentar -->",
        ],
        correct: 1,
      },
      {
        question: "Event JavaScript saat halaman selesai dimuat?",
        options: ["onload", "DOMContentLoaded", "pageLoad", "ready"],
        correct: 1,
      },
      {
        question: "Framework CSS yang populer?",
        options: ["React", "Bootstrap", "Node.js", "Express"],
        correct: 1,
      },
    ],
  },
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizTimer = null;
let timeRemaining = 900; // 15 menit dalam detik

// Start Quiz
function startQuiz(quizType) {
  currentQuiz = quizData[quizType];
  currentQuestionIndex = 0;
  userAnswers = new Array(currentQuiz.questions.length).fill(null);
  timeRemaining = 900;

  const quizSelection = document.getElementById("quizSelection");
  const quizPlay = document.getElementById("quizPlay");
  const quizTitle = document.getElementById("quizTitle");

  if (quizSelection) quizSelection.classList.remove("active");
  if (quizPlay) quizPlay.classList.add("active");
  if (quizTitle) quizTitle.textContent = currentQuiz.title;

  displayQuestion();
  startTimer();
}

// Display Current Question
function displayQuestion() {
  const question = currentQuiz.questions[currentQuestionIndex];
  const questionNumber = document.getElementById("questionNumber");
  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const nextBtn = document.getElementById("nextQuestion");
  const prevBtn = document.getElementById("prevQuestion");

  if (questionNumber) {
    questionNumber.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${
      currentQuiz.questions.length
    }`;
  }

  if (questionText) {
    questionText.textContent = question.question;
  }

  if (optionsContainer) {
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = option;
      if (userAnswers[currentQuestionIndex] === index) {
        btn.classList.add("selected");
      }
      btn.addEventListener("click", () => selectAnswer(index));
      optionsContainer.appendChild(btn);
    });
  }

  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
  if (nextBtn) {
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
      nextBtn.textContent = "Selesai";
    } else {
      nextBtn.textContent = "Selanjutnya →";
    }
  }
}

// Select Answer
function selectAnswer(answerIndex) {
  userAnswers[currentQuestionIndex] = answerIndex;

  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn, index) => {
    btn.classList.toggle("selected", index === answerIndex);
  });
}

// Next Question
function nextQuestion() {
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    finishQuiz();
  }
}

// Previous Question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

// Start Timer
function startTimer() {
  if (quizTimer) clearInterval(quizTimer);

  quizTimer = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerElement = document.getElementById("timer");

    if (timerElement) {
      timerElement.textContent = `⏱️ ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    if (timeRemaining <= 0) {
      clearInterval(quizTimer);
      finishQuiz();
    }
  }, 1000);
}

// Finish Quiz
function finishQuiz() {
  clearInterval(quizTimer);

  let correctCount = 0;
  currentQuiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      correctCount++;
    }
  });

  const percentage = Math.round(
    (correctCount / currentQuiz.questions.length) * 100
  );

  const quizPlay = document.getElementById("quizPlay");
  const quizResult = document.getElementById("quizResult");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const scorePercentage = document.getElementById("scorePercentage");
  const resultIcon = document.getElementById("resultIcon");
  const resultFeedback = document.getElementById("resultFeedback");

  if (quizPlay) quizPlay.classList.remove("active");
  if (quizResult) quizResult.classList.add("active");

  if (scoreDisplay)
    scoreDisplay.textContent = `${correctCount}/${currentQuiz.questions.length}`;
  if (scorePercentage) scorePercentage.textContent = `${percentage}%`;

  let feedback = "";
  let icon = "";
  if (percentage >= 80) {
    feedback = "Luar biasa! Anda sangat menguasai materi ini! 🎉";
    icon = "🎉";
  } else if (percentage >= 60) {
    feedback = "Bagus! Terus tingkatkan pemahaman Anda! 👏";
    icon = "👏";
  } else {
    feedback = "Tetap semangat! Coba review materi dan ulangi quiz. 💪";
    icon = "💪";
  }

  if (resultIcon) resultIcon.textContent = icon;
  if (resultFeedback) resultFeedback.textContent = feedback;

  showToast(`Quiz selesai! Skor Anda: ${percentage}%`, "success");
}

// Review Answers
function reviewAnswers() {
  showToast("Fitur review jawaban akan segera hadir!", "info");
}

// Back to Quizzes
function backToQuizzes() {
  const quizResult = document.getElementById("quizResult");
  const quizSelection = document.getElementById("quizSelection");

  if (quizResult) quizResult.classList.remove("active");
  if (quizSelection) quizSelection.classList.add("active");

  currentQuiz = null;
  currentQuestionIndex = 0;
  userAnswers = [];
}
