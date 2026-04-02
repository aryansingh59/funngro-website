// ================================
// 🚀 INITIAL LOAD
// ================================
window.addEventListener("load", () => {

  // Smooth page load
  document.body.style.opacity = 1;

  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  // Active nav highlight + menu close
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {

    if (link.href === window.location.href) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      document.body.style.opacity = 0.6;

      const nav = document.getElementById("navMenu");
      if (nav) nav.classList.remove("active");
    });

  });

  // Init animations
  revealOnScroll();
  initSearch();
  lazyLoadImages();
});


// ================================
// 📜 SCROLL EVENTS
// ================================
window.addEventListener("scroll", () => {
  updateProgressBar();
  revealOnScroll();
  toggleTopButton();
  headerShadow();
});


// ================================
// 📊 PROGRESS BAR
// ================================
function updateProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  bar.style.width = (scrollTop / height) * 100 + "%";
}


// ================================
// ✨ SCROLL ANIMATION
// ================================
function revealOnScroll() {
  const elements = document.querySelectorAll(".card, section h2");

  elements.forEach(el => {
    const pos = el.getBoundingClientRect().top;

    if (pos < window.innerHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    } else {
      el.style.opacity = 0;
      el.style.transform = "translateY(40px)";
    }
  });
}


// ================================
// 🔝 BACK TO TOP BUTTON
// ================================
function toggleTopButton() {
  const btn = document.getElementById("topBtn");
  if (!btn) return;

  btn.style.display = window.scrollY > 300 ? "block" : "none";
}

function scrollTopBtn() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ================================
// 📌 HEADER SHADOW
// ================================
function headerShadow() {
  const header = document.getElementById("header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 50);
}


// ================================
// 🍔 MOBILE MENU
// ================================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) nav.classList.toggle("active");
}


// ================================
// 🌙 DARK MODE
// ================================
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
}


// ================================
// 🔎 SEARCH (SAFE INIT)
// ================================
function initSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      card.style.display =
        card.innerText.toLowerCase().includes(value) ? "block" : "none";
    });

  });
}


// ================================
// ❓ FAQ ACCORDION (FINAL FIX)
// ================================
function toggleFAQ(element) {
  const answer = element.querySelector(".faq-answer");
  if (!answer) return;

  if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
    answer.style.maxHeight = "0px";
  } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}


// ================================
// 📩 FORM SUBMIT
// ================================
function submitForm(e) {
  e.preventDefault();

  const inputs = e.target.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.border = "1px solid red";
      valid = false;
    } else {
      input.style.border = "none";
    }
  });

  if (!valid) {
    alert("❌ Please fill all fields!");
    return;
  }

  alert("✅ Submitted successfully!");
  e.target.reset();
}


// ================================
// 📍 SMOOTH SCROLL
// ================================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth" });
}


// ================================
// 🔙 BACK BUTTON
// ================================
function goBack() {
  window.history.back();
}


// ================================
// 🔗 NAVIGATION
// ================================
function goTeen() {
  window.location.href = "teen.html";
}

function goCompany() {
  window.location.href = "company.html";
}

function goToSignup() {
  alert("🚀 Signup coming soon!");
}


// ================================
// ⌨️ KEYBOARD SHORTCUTS
// ================================
document.addEventListener("keydown", (e) => {

  const key = e.key.toLowerCase();

  if (key === "t") window.location.href = "teen.html";
  if (key === "c") window.location.href = "company.html";
  if (key === "d") toggleTheme();

});


// ================================
// 🖼️ LAZY LOAD IMAGES
// ================================
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  if (!images.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });

  images.forEach(img => observer.observe(img));
}