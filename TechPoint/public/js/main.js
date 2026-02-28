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
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (!isMobile) {
    callBtn.href = "https://wa.me/+8801812116611"; // WhatsApp link
    callBtn.textContent = "💬 Chat on WhatsApp";
    callBtn.target = "_blank"; // <-- open in new tab/window
    callBtn.rel = "noopener noreferrer"; // <-- security best practice
  }
});

//message btn
const message_btn = document.querySelector(".message-submit");
const input = document.querySelector(".message-input");
message_btn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (message === "") {
    alart("Please enter a message");
  } else {
    const response = await fetch("/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    // parse JSON response from server
    const data = await response.json();
    alert(data.message); 
  }
  input.value = "";
});
//form validation 

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
