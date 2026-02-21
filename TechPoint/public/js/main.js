// Header Scroll
let nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("header-scrolled");
  } else {
    nav.classList.remove("header-scrolled");
  }
});

// nav hide
let navbar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse");
navbar.forEach((a) => {
  a.addEventListener("click", () => {
    navCollapse.classList.remove("show");
  });
});
//call btn functiom

window.addEventListener("DOMContentLoaded", () => {
    const callBtn = document.querySelector(".call-btn");
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
        callBtn.href = "https://wa.me/+8801812116611"; // WhatsApp link
        callBtn.textContent = "💬 Chat on WhatsApp";
        callBtn.target = "_blank"; // <-- open in new tab/window
        callBtn.rel = "noopener noreferrer"; // <-- security best practice
    }
});