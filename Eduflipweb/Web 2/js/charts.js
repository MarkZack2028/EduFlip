// Chart Variables
let learningChart = null;
let courseChart = null;
let miniProgressChart = null;

// Initialize Charts
function initCharts() {
  // Destroy existing charts if any
  if (learningChart) learningChart.destroy();
  if (courseChart) courseChart.destroy();
  if (miniProgressChart) miniProgressChart.destroy();

  // Learning Time Distribution Pie Chart
  const learningCtx = document.getElementById("learningPieChart");
  if (learningCtx) {
    learningChart = new Chart(learningCtx.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Python", "Web Dev", "Algoritma", "Database", "Mobile Dev"],
        datasets: [
          {
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
              "#66BB6A",
              "#81C784",
              "#A5D6A7",
              "#C8E6C9",
              "#E8F5E9",
            ],
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.parsed + "%";
              },
            },
          },
        },
      },
    });
  }

  // Course Status Pie Chart
  const courseCtx = document.getElementById("coursePieChart");
  if (courseCtx) {
    courseChart = new Chart(courseCtx.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Selesai", "Sedang Berjalan", "Belum Dimulai"],
        datasets: [
          {
            data: [5, 2, 5],
            backgroundColor: ["#43A047", "#FFA726", "#E0E0E0"],
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.parsed + " kursus";
              },
            },
          },
        },
      },
    });
  }
}
