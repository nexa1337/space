const pricingToggle = document.getElementById("pricingToggle")
const priceStarter = document.getElementById("price-starter")
const priceProfessional = document.getElementById("price-professional")
const priceEnterprise = document.getElementById("price-enterprise")

const monthlyPrices = {
  starter: "$299",
  professional: "$799",
  enterprise: "$1,999",
}

const yearlyPrices = {
  starter: "$2,990",
  professional: "$7,990",
  enterprise: "$19,990",
}

if (pricingToggle) {
  pricingToggle.addEventListener("change", function () {
    if (this.checked) {
      priceStarter.textContent = yearlyPrices.starter
      priceProfessional.textContent = yearlyPrices.professional
      priceEnterprise.textContent = yearlyPrices.enterprise

      // Show yearly features
      document.getElementById("starter-monthly").style.display = "none"
      document.getElementById("starter-yearly").style.display = "block"
      document.getElementById("professional-monthly").style.display = "none"
      document.getElementById("professional-yearly").style.display = "block"
      document.getElementById("enterprise-monthly").style.display = "none"
      document.getElementById("enterprise-yearly").style.display = "block"
    } else {
      priceStarter.textContent = monthlyPrices.starter
      priceProfessional.textContent = monthlyPrices.professional
      priceEnterprise.textContent = monthlyPrices.enterprise

      // Show monthly features
      document.getElementById("starter-monthly").style.display = "block"
      document.getElementById("starter-yearly").style.display = "none"
      document.getElementById("professional-monthly").style.display = "block"
      document.getElementById("professional-yearly").style.display = "none"
      document.getElementById("enterprise-monthly").style.display = "block"
      document.getElementById("enterprise-yearly").style.display = "none"
    }
  })
}

function updateDateTime() {
  const now = new Date()
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }
  const dateTimeString = now.toLocaleDateString("en-US", options)
  const datetimeElement = document.getElementById("datetime")
  if (datetimeElement) {
    datetimeElement.textContent = dateTimeString
  }
}

updateDateTime()
setInterval(updateDateTime, 1000)

const themeToggle = document.getElementById("themeToggle")
const mobileThemeToggle = document.getElementById("mobileThemeToggle")
const htmlElement = document.documentElement

const currentTheme = localStorage.getItem("theme") || "light"
if (currentTheme === "dark") {
  htmlElement.classList.add("dark-mode")
  if (themeToggle) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }
}

function toggleTheme() {
  htmlElement.classList.toggle("dark-mode")
  const theme = htmlElement.classList.contains("dark-mode") ? "dark" : "light"
  localStorage.setItem("theme", theme)
  const icon = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
  if (themeToggle) {
    themeToggle.innerHTML = icon
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.innerHTML = icon
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme)
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", toggleTheme)
}

/* Updated mobile menu toggle with proper hamburger animation */
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const mobileMenu = document.getElementById("mobileMenu")

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    mobileMenuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
    })
  })

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      mobileMenuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
    }
  })
}

/* Updated popup modal functionality with services link handler */
const popupOverlay = document.getElementById("popupOverlay")
const popupClose = document.getElementById("popupClose")
const popupCTA = document.querySelector(".popup-cta")
const servicesLink = document.getElementById("servicesLink")

// Show popup after 3 seconds
setTimeout(() => {
  if (popupOverlay) {
    popupOverlay.classList.add("active")
  }
}, 3000)

// Close popup on close button click
if (popupClose) {
  popupClose.addEventListener("click", () => {
    popupOverlay.classList.remove("active")
  })
}

// Close popup on overlay click
if (popupOverlay) {
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active")
    }
  })
}

// Close popup on CTA button click
if (popupCTA) {
  popupCTA.addEventListener("click", () => {
    popupOverlay.classList.remove("active")
    // Scroll to pricing section
    const pricingSection = document.getElementById("pricing")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  })
}

// Close popup when clicking services link
if (servicesLink) {
  servicesLink.addEventListener("click", () => {
    popupOverlay.classList.remove("active")
  })
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

let currentBlogSlide = 0
let blogCarouselInterval
const BLOG_CARDS_PER_VIEW = 3

function updateBlogCarousel() {
  const blogGrid = document.getElementById("blogGrid")
  const cards = blogGrid.querySelectorAll(".blog-card")
  const totalCards = cards.length

  if (totalCards <= BLOG_CARDS_PER_VIEW) return

  const maxSlide = totalCards - BLOG_CARDS_PER_VIEW
  const offset = (currentBlogSlide % (maxSlide + 1)) * -100

  blogGrid.style.transform = `translateX(${offset / BLOG_CARDS_PER_VIEW}%)`

  updateCarouselIndicators()
}

function updateCarouselIndicators() {
  const indicators = document.querySelectorAll(".carousel-indicator")
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentBlogSlide)
  })
}

function nextBlogSlide() {
  const blogGrid = document.getElementById("blogGrid")
  const cards = blogGrid.querySelectorAll(".blog-card")
  const totalCards = cards.length
  const maxSlide = totalCards - BLOG_CARDS_PER_VIEW

  currentBlogSlide = (currentBlogSlide + 1) % (maxSlide + 1)
  updateBlogCarousel()
  resetAutoSlide()
}

function prevBlogSlide() {
  const blogGrid = document.getElementById("blogGrid")
  const cards = blogGrid.querySelectorAll(".blog-card")
  const totalCards = cards.length
  const maxSlide = totalCards - BLOG_CARDS_PER_VIEW

  currentBlogSlide = (currentBlogSlide - 1 + (maxSlide + 1)) % (maxSlide + 1)
  updateBlogCarousel()
  resetAutoSlide()
}

function startAutoSlide() {
  blogCarouselInterval = setInterval(() => {
    nextBlogSlide()
  }, 5000)
}

function resetAutoSlide() {
  clearInterval(blogCarouselInterval)
  startAutoSlide()
}

function createCarouselIndicators() {
  const blogGrid = document.getElementById("blogGrid")
  const cards = blogGrid.querySelectorAll(".blog-card")
  const totalCards = cards.length
  const maxSlide = totalCards - BLOG_CARDS_PER_VIEW

  const indicatorsContainer = document.getElementById("carouselIndicators")
  indicatorsContainer.innerHTML = ""

  for (let i = 0; i <= maxSlide; i++) {
    const indicator = document.createElement("div")
    indicator.className = "carousel-indicator"
    if (i === 0) indicator.classList.add("active")
    indicator.addEventListener("click", () => {
      currentBlogSlide = i
      updateBlogCarousel()
      resetAutoSlide()
    })
    indicatorsContainer.appendChild(indicator)
  }
}

async function fetchBlogPosts() {
  try {
    const blogUrl = "https://nexa1337blogging.blogspot.com/feeds/posts/default?max-results=4&alt=json"
    const response = await fetch(blogUrl)
    const data = await response.json()

    const blogGrid = document.getElementById("blogGrid")
    if (!blogGrid) return

    blogGrid.innerHTML = ""

    if (data.feed && data.feed.entry) {
      const posts = data.feed.entry.slice(0, 4)

      posts.forEach((post) => {
        const title = post.title.$t
        const link = post.link.find((l) => l.rel === "alternate")?.href || "#"
        const published = new Date(post.published.$t)
        const dateStr = published.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })

        let excerpt = ""
        if (post.content) {
          const tempDiv = document.createElement("div")
          tempDiv.innerHTML = post.content.$t
          excerpt = tempDiv.textContent.substring(0, 120) + "..."
        } else if (post.summary) {
          excerpt = post.summary.$t.substring(0, 120) + "..."
        }

        let imageUrl = "/blog-post.jpg"
        if (post.media$thumbnail) {
          imageUrl = post.media$thumbnail.url
        }

        const blogCard = document.createElement("div")
        blogCard.className = "blog-card"
        blogCard.innerHTML = `
          <img src="${imageUrl}" alt="${title}" class="blog-image" onerror="this.src='/blog-post.jpg'">
          <div class="blog-content">
            <span class="blog-date">${dateStr}</span>
            <h3 class="blog-title">${title}</h3>
            <p class="blog-excerpt">${excerpt}</p>
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="blog-read-more">
              Read More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        `
        blogGrid.appendChild(blogCard)
      })

      createCarouselIndicators()
      startAutoSlide()
    }
  } catch (error) {
    console.log("[v0] Blog fetch error:", error)
    const blogGrid = document.getElementById("blogGrid")
    if (blogGrid) {
      blogGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
          <p style="color: var(--gray);">New posts coming soon, explore our. <a href="https://nexa1337blogging.blogspot.com" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">Blog Hub</a></p>
        </div>
      `
    }
  }
}

// Fetch blog posts when page loads
window.addEventListener("load", () => {
  fetchBlogPosts()

  const carouselPrev = document.getElementById("carouselPrev")
  const carouselNext = document.getElementById("carouselNext")

  if (carouselPrev) {
    carouselPrev.addEventListener("click", prevBlogSlide)
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", nextBlogSlide)
  }

  document.querySelectorAll("section").forEach((section, index) => {
    section.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s both`
  })
})

const scrollToTopBtn = document.getElementById("scrollToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show")
  } else {
    scrollToTopBtn.classList.remove("show")
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

const filterBtns = document.querySelectorAll(".filter-btn")
const serviceCards = document.querySelectorAll(".service-collection-card")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    serviceCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
        }, 10)
      } else {
        card.style.display = "none"
      }
    })
  })
})

const faqQuestions = document.querySelectorAll(".faq-question")

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement
    const isActive = faqItem.classList.contains("active")

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active")
    })

    if (!isActive) {
      faqItem.classList.add("active")
    }
  })
})
