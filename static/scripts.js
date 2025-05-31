document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Mobile navigation toggle
    const mobileToggle = document.querySelector(".mobile-toggle")
    const mobileNav = document.querySelector(".mobile-nav")
    const openIcon = document.querySelector(".open-icon")
    const closeIcon = document.querySelector(".close-icon")
  
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden")
      openIcon.classList.toggle("hidden")
      closeIcon.classList.toggle("hidden")
    })
  
    // Close mobile nav when clicking a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden")
        openIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
      })
    })
  
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  
    function highlightNavLink() {
      const scrollPosition = window.scrollY + 100
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavLink)
    highlightNavLink() // Call once on load
  
    // Parallax effect for hero section
    const parallaxElements = document.querySelectorAll(".parallax")
    const heroSection = document.querySelector(".hero")
  
    heroSection.addEventListener("mousemove", (e) => {
      const heroRect = heroSection.getBoundingClientRect()
      const x = (e.clientX - heroRect.left) / heroRect.width - 0.5
      const y = (e.clientY - heroRect.top) / heroRect.height - 0.5
  
      parallaxElements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || 1)
        el.style.transform = `translate(${x * 10 * speed}px, ${y * 10 * speed}px)`
      })
    })
  
    // Project filtering
    const projectFilters = document.querySelectorAll(".project-filter")
    const projectCards = document.querySelectorAll(".project-card")
  
    projectFilters.forEach((filter) => {
      filter.addEventListener("click", function () {
        // Update active filter
        projectFilters.forEach((f) => f.classList.remove("active"))
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        projectCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-categories").includes(filterValue)) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Scroll animations
    const animatedElements = document.querySelectorAll(
      ".animate-fade-in, .animate-fade-in-scale, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-width",
    )
  
    function checkScroll() {
      animatedElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", checkScroll)
    checkScroll() // Call once on load
  
    // Background animation
    const canvas = document.getElementById("background-animation")
    const ctx = canvas.getContext("2d")
  
    // Set canvas dimensions
    function setCanvasDimensions() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)
  
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = "#3b82f6"
        this.alpha = Math.random() * 0.5 + 0.1
      }
  
      update() {
        this.x += this.speedX
        this.y += this.speedY
  
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }
  
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
      }
    }
  
    // Create particles
    const particlesArray = []
    const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)
  
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }
  
    // Connect particles with lines
    function connect() {
      const maxDistance = 150
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
  
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      requestAnimationFrame(animate)
    }
  
    animate()
  

  })
  
  