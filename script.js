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
  // Use the live Render URL for fetching courses
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
          <button class="edit-btn" data-id="${course._id}">Edit</button>
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

    // Use the live Render URL for uploading a new course
    await fetch("https://e-learning-platform-bepj.onrender.com/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, link })
    });

    alert("Course uploaded!");
    window.location.href = "courses.html";
  });
}
// Function to fetch a single course by ID and show the modal
const openEditModal = async (courseId) => {
    try {
        const response = await fetch(`https://e-learning-platform-bepj.onrender.com/api/courses/${courseId}`);
        const course = await response.json();

        // Populate the modal form with the course data
        document.getElementById("editCourseId").value = course._id;
        document.getElementById("editTitle").value = course.title;
        document.getElementById("editDescription").value = course.description || "";
        document.getElementById("editLink").value = course.link;

        // Show the modal
        document.getElementById("editCourseModal").style.display = "block";
    } catch (error) {
        console.error("Error fetching course for edit:", error);
        alert("Failed to load course details for editing.");
    }
};

// Handle clicks on the "Edit" button
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const courseId = event.target.getAttribute("data-id");
        openEditModal(courseId);
    }
});

// Handle saving the edited course
document.getElementById("editForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const courseId = document.getElementById("editCourseId").value;
    const updatedData = {
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        link: document.getElementById("editLink").value,
    };

    try {
        await fetch(`https://e-learning-platform-bepj.onrender.com/api/courses/${courseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        alert("Course updated successfully!");
        document.getElementById("editCourseModal").style.display = "none";
        window.location.reload(); // Reload the page to show the updated course
    } catch (error) {
        console.error("Error updating course:", error);
        alert("Failed to update course.");
    }
});

// Handle closing the modal
document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("editCourseModal").style.display = "none";
});

document.querySelector(".cancel-btn").addEventListener("click", () => {
    document.getElementById("editCourseModal").style.display = "none";
});