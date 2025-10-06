// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Add scrolled class when scrolling down
  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===================================
// Scroll Reveal Animation
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")
    }
  })
}, observerOptions)

// Observe all sections and cards
const elementsToAnimate = document.querySelectorAll(
  ".about-content, .skill-category, .project-card, .education-card, .certifications, .contact-content",
)

elementsToAnimate.forEach((el) => {
  el.classList.add("scroll-reveal")
  observer.observe(el)
})

// ===================================
// Skill Bar Animation on Scroll
// ===================================
const skillBars = document.querySelectorAll(".skill-progress")

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width
        entry.target.style.width = "0"
        setTimeout(() => {
          entry.target.style.width = width
        }, 100)
        skillObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => {
  skillObserver.observe(bar)
})

// ===================================
// Contact Form Validation
// ===================================
const contactForm = document.getElementById("contactForm")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const messageError = document.getElementById("messageError")
const formSuccess = document.getElementById("formSuccess")

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validation functions
function validateName() {
  const name = nameInput.value.trim()
  if (name.length === 0) {
    showError(nameError, "Name is required")
    return false
  } else if (name.length < 2) {
    showError(nameError, "Name must be at least 2 characters")
    return false
  } else {
    hideError(nameError)
    return true
  }
}

function validateEmail() {
  const email = emailInput.value.trim()
  if (email.length === 0) {
    showError(emailError, "Email is required")
    return false
  } else if (!emailRegex.test(email)) {
    showError(emailError, "Please enter a valid email")
    return false
  } else {
    hideError(emailError)
    return true
  }
}

function validateMessage() {
  const message = messageInput.value.trim()
  if (message.length === 0) {
    showError(messageError, "Message is required")
    return false
  } else if (message.length < 10) {
    showError(messageError, "Message must be at least 10 characters")
    return false
  } else {
    hideError(messageError)
    return true
  }
}

function showError(element, message) {
  element.textContent = message
  element.classList.add("show")
}

function hideError(element) {
  element.classList.remove("show")
}

// Real-time validation
nameInput.addEventListener("blur", validateName)
emailInput.addEventListener("blur", validateEmail)
messageInput.addEventListener("blur", validateMessage)

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Validate all fields
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isMessageValid = validateMessage()

  if (isNameValid && isEmailValid && isMessageValid) {
    // Show success message
    formSuccess.classList.add("show")

    // Reset form
    contactForm.reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.remove("show")
    }, 5000)

    // In a real application, you would send the form data to a server here
    console.log("Form submitted successfully!")
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    })
  }
})

// ===================================
// Active Navigation Link Highlighting
// ===================================
const sections = document.querySelectorAll("section[id]")

function highlightNavigation() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active")
    } else {
      navLink?.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// ===================================
// Parallax Effect for Hero Background
// ===================================
const gradientCircles = document.querySelectorAll(".gradient-circle")

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset

  gradientCircles.forEach((circle, index) => {
    const speed = 0.5 + index * 0.1
    circle.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animations
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)

  // Highlight current navigation on load
  highlightNavigation()
})
