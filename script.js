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

// Project section functionality

document.querySelector('.projects-cta .btn').addEventListener('click', function() {
  // In a real implementation, this would navigate to a projects page
  alert('All projects page would be shown here in a real implementation.')
})

// Project filtering functionality
const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Project popup functionality
const projectPopup = document.getElementById('projectPopup');
const projectPopupClose = document.getElementById('projectPopupClose');
const viewProjectButtons = document.querySelectorAll('.view-project-btn');

// Project data
const projectData = {
  1: {
    title: "E-commerce Platform",
    category: "Web Development",
    description: "This comprehensive e-commerce platform was designed for a fashion retailer looking to expand their online presence. The solution features a modern, responsive design with seamless checkout experience, advanced product filtering, and integrated inventory management. The platform also includes analytics dashboards for real-time sales tracking and customer behavior insights.",
    images: ["img/Custom Websites.jpg", "img/Landing Pages & CRO.jpg", "img/Content Production.jpg"],
    client: "FashionForward Inc.",
    duration: "4 months",
    technologies: "React, Node.js, MongoDB, Stripe API"
  },
  2: {
    title: "Corporate Identity",
    category: "Branding",
    description: "We developed a complete brand identity system for a fintech startup entering the competitive digital payments market. The project included logo design, color palette selection, typography guidelines, and brand applications across digital and print media. The cohesive visual identity helped establish trust and recognition in the marketplace.",
    images: ["img/Brand Identity & Design System.jpg", "img/Social Media Management.jpg", "img/Content Production.jpg"],
    client: "PayTech Solutions",
    duration: "2 months",
    technologies: "Adobe Creative Suite, Figma, Brand Guidelines"
  },
  3: {
    title: "Customer Support AI",
    category: "AI Solutions",
    description: "This intelligent chatbot system was implemented for a SaaS company to handle customer inquiries 24/7. Using natural language processing and machine learning, the AI assistant can understand and respond to complex technical questions with 92% accuracy. The system integrates with the company's knowledge base and CRM to provide personalized responses and escalate issues when needed.",
    images: ["img/AI Chatbots & Assistants.jpg", "img/Workflow Automation & AI Agents.jpg", "img/Custom Websites.jpg"],
    client: "CloudSoft Corp",
    duration: "3 months",
    technologies: "Python, TensorFlow, Dialogflow, REST API"
  },
  4: {
    title: "Conversion Optimized Landing Page",
    category: "Web Development",
    description: "We designed and developed a high-converting landing page for a software company's product launch. Through A/B testing and user behavior analysis, we optimized every element from headline copy to call-to-action placement. The result was a 120% increase in signups and a 75% improvement in conversion rate compared to their previous page.",
    images: ["img/Landing Pages & CRO.jpg", "img/Custom Websites.jpg", "img/Social Media Management.jpg"],
    client: "SoftLaunch Ltd",
    duration: "6 weeks",
    technologies: "HTML/CSS, JavaScript, A/B Testing Tools"
  },
  5: {
    title: "Social Media Campaign",
    category: "Branding",
    description: "This comprehensive social media strategy was created for a food delivery service to increase brand awareness and drive app downloads. The campaign included content creation, influencer partnerships, targeted advertising, and community engagement across Instagram, Facebook, and TikTok. The campaign generated over 2 million impressions and increased app downloads by 300%.",
    images: ["img/Social Media Management.jpg", "img/Content Production.jpg", "img/Brand Identity & Design System.jpg"],
    client: "QuickEats Delivery",
    duration: "3 months",
    technologies: "Social Media Platforms, Analytics Tools, Content Creation"
  },
  6: {
    title: "Workflow Automation",
    category: "AI Solutions",
    description: "We automated repetitive business processes for a consulting firm, saving over 20 hours per week across their organization. The solution included automated data entry, report generation, client onboarding workflows, and appointment scheduling. The system integrates with their existing CRM and project management tools for seamless operation.",
    images: ["img/Workflow Automation & AI Agents.jpg", "img/AI Chatbots & Assistants.jpg", "img/Custom Websites.jpg"],
    client: "ConsultPro Services",
    duration: "2 months",
    technologies: "Python, Zapier, REST API, Database Integration"
  }
};

// Open popup with project details
viewProjectButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    const project = projectData[projectId];
    
    if (project) {
      // Populate popup with project data
      document.getElementById('popupImage').src = project.images[0];
      document.getElementById('popupImage').alt = project.title;
      document.getElementById('popupCategory').textContent = project.category;
      document.getElementById('popupTitle').textContent = project.title;
      document.getElementById('popupDescription').textContent = project.description;
      document.getElementById('popupClient').textContent = project.client;
      document.getElementById('popupDuration').textContent = project.duration;
      document.getElementById('popupTech').textContent = project.technologies;
      
      // Populate thumbnails
      const thumbnailsContainer = document.getElementById('popupThumbnails');
      thumbnailsContainer.innerHTML = '';
      project.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${project.title} - Image ${index + 1}`;
        thumbnail.className = 'thumbnail';
        if (index === 0) {
          thumbnail.classList.add('active');
        }
        thumbnail.addEventListener('click', function() {
          document.getElementById('popupImage').src = image;
          // Update active thumbnail
          document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
          });
          this.classList.add('active');
        });
        thumbnailsContainer.appendChild(thumbnail);
      });
      
      // Show popup
      projectPopup.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  });
});

// Close popup
projectPopupClose.addEventListener('click', function() {
  projectPopup.classList.remove('active');
  document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close popup when clicking outside content
projectPopup.addEventListener('click', function(e) {
  if (e.target === projectPopup) {
    projectPopup.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
  }
});

// Contact form popup functionality
const contactUsLink = document.getElementById('contactUsLink');
const contactPopup = document.getElementById('contactPopup');
const contactPopupClose = document.getElementById('contactPopupClose');
const contactForm = document.getElementById('contactForm');

// Open contact popup
contactUsLink.addEventListener('click', function(e) {
  e.preventDefault();
  contactPopup.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close contact popup
contactPopupClose.addEventListener('click', function() {
  contactPopup.classList.remove('active');
  document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close contact popup when clicking outside content
contactPopup.addEventListener('click', function(e) {
  if (e.target === contactPopup) {
    contactPopup.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
  }
});

// Handle form submission
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const country = document.getElementById('country').value;
  
  // Get selected project types
  const projectTypeSelect = document.getElementById('projectType');
  const selectedOptions = Array.from(projectTypeSelect.selectedOptions);
  const projectTypes = selectedOptions.map(option => option.text).join(', ');
  
  const message = document.getElementById('message').value;
  
  // Create WhatsApp message
  const whatsappMessage = `Hello, I'm interested in a custom project quote.
  
Full Name: ${fullName}
Email: ${email}
WhatsApp: ${whatsapp}
Country: ${country}
Project Type(s): ${projectTypes}
Message: ${message}`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  
  // WhatsApp URL (replace with your actual number)
  const whatsappUrl = `https://wa.me/+212723242286?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
  
  // Close popup
  contactPopup.classList.remove('active');
  document.body.style.overflow = 'auto'; // Enable scrolling
  
  // Reset form
  contactForm.reset();
  
  // Show success message (optional)
  alert('Thank you! We will contact you shortly via WhatsApp.');
});
