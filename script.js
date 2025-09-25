// ===============================
// Navigation Button Functionality
// ===============================

// Hero Section Buttons
const startLearningBtn = document.getElementById("startLearningBtn");
const browseCoursesBtn = document.getElementById("browseCoursesBtn");

// Navbar Links/Buttons
const coursesBtn = document.getElementById("coursesBtn");
const myLearningBtn = document.getElementById("myLearningBtn");
const teachBtn = document.getElementById("teachBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Redirects
if (startLearningBtn) {
  startLearningBtn.addEventListener("click", () => {
    window.location.href = "courses.html";
  });
}

if (browseCoursesBtn) {
  browseCoursesBtn.addEventListener("click", () => {
    window.location.href = "courses.html";
  });
}

if (coursesBtn) {
  coursesBtn.addEventListener("click", () => {
    window.location.href = "courses.html";
  });
}

if (myLearningBtn) {
  myLearningBtn.addEventListener("click", () => {
    // You can later filter courses based on the logged-in user
    window.location.href = "courses.html";
  });
}

if (teachBtn) {
  teachBtn.addEventListener("click", () => {
    window.location.href = "upload.html";
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Login functionality coming soon!");
    // Later -> redirect to login.html
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    alert("Signup functionality coming soon!");
    // Later -> redirect to signup.html
  });
}

// ===============================
// Courses Page Functionality
// ===============================

// Fetch and display courses (for courses.html)
if (document.getElementById("coursesGrid")) {
  fetch("https://e-learning-platform-bepj.onrender.com/api/courses")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("coursesGrid");
      grid.innerHTML = "";
      data.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");
        div.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description || "No description available."}</p>
          <a href="${course.link}" target="_blank">View Course</a>
        `;
        grid.appendChild(div);
      });
    });

  // Search functionality
  document.getElementById("searchBox").addEventListener("input", function() {
    let query = this.value.toLowerCase();
    document.querySelectorAll(".course-card").forEach(c => {
      c.style.display = c.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
  });
}

// ===============================
// Handle course upload (upload.html)
// ===============================
if (document.getElementById("uploadForm")) {
  document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const link = document.getElementById("link").value;

    await fetch("https://e-learning-platform-bepj.onrender.com/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, link })
    });

    alert("Course uploaded!");
    window.location.href = "courses.html";
  });
}