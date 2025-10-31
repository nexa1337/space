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
    title: "Premium Car Rental WordPress Theme",
    category: "Web Development, Premium Theme",
    description: "Launch your car rental business online with style and confidence. Our premium Car Rental WordPress Theme gives you a modern, high-converting website that turns visitors into loyal customers. Designed for performance, speed, and mobile experience, it helps you showcase your vehicles, manage bookings easily, and build trust with a professional design that reflects your brand. Whether you rent cars, bikes, or scooters, this theme has everything you need to grow your business and stand out from the competition.",
    images: ["https://demo.awaikenthemes.com/landing/wp-content/uploads/2024/07/novaride-light-1.jpg", "https://rentic.axiomthemes.com/splash/src/img/demo/1.jpg", "https://limodrive.wpthemeverse.com/wp-content/uploads/2024/10/limodrive_home1.png", "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/03/l-img-2.jpg", "https://autozone.templines.com/wp-content/uploads/2025/08/autozone-envato-themes-com_Or4yz0qz.webp"],
    client: "Car Rental",
    duration: "4 months",
    technologies: "Php, Whordpress"
  },
  2: {
    title: "Premium Health & Medical WordPress Theme",
    category: "Web Development, Premium Theme",
    description: "Build trust and attract more patients with a clean, professional, and modern Medical WordPress Theme. Designed for doctors, clinics, hospitals, and healthcare professionals, this theme helps you create a reliable online presence that inspires confidence. With easy appointment booking, service pages, and a mobile-friendly design, you can showcase your expertise, highlight your team, and grow your medical practice effortlessly. Fast, SEO-ready, and fully customizable, everything you need to make your healthcare website stand out.",
    images: ["https://medicate.peacefulqode.co.in/wp-content/uploads/2022/04/1-4.jpg", "https://neoocular.qodeinteractive.com/wp-content/uploads/2021/10/landing-img-01-main-home-1.jpg", "https://denticare.bold-themes.com/wp-content/uploads/2020/03/main_demo_allen.png", "https://denticare.bold-themes.com/wp-content/uploads/2020/03/main_demo_oscar.png"],
    client: "Health & Medical",
    duration: "2 months",
    technologies: "Php, Wordpress"
  },
  3: {
    title: "Premium Beauty & Hairdressers WordPress Theme",
    category: "Web Development, Premium Theme",
    description: "Create a stunning online presence for your beauty salon, spa, or hairdressing studio with a modern and elegant Beauty & Hairdresser WordPress Theme. Designed to attract and convert, this theme helps you showcase your services, display pricing, and let clients book appointments with ease. Fully responsive, fast, and easy to customize — it gives your business the luxury look it deserves while making your brand shine online. Perfect for salons, makeup artists, barbers, and wellness professionals who want to grow their client base and stand out in style.",
    images: ["https://spalabele.wpengine.com/wp-content/uploads/2023/07/home-1-768x1024.jpg", "https://reina.qodeinteractive.com/wp-content/uploads/2020/12/landing-iwt-img3.jpg", "https://reina.qodeinteractive.com/wp-content/uploads/2020/12/landing-iwt-img8.jpg", "https://curly.qodeinteractive.com/wp-content/uploads/2018/05/landing-home-img-1.jpg", "https://curly.qodeinteractive.com/wp-content/uploads/2018/05/landing-home-img-4.jpg"],
    client: "Beauty & Hairdressers",
    duration: "3 months",
    technologies: "Php, Wordpress"
  },
  4: {
    title: "Premium Local Restaurants & Cafes WordPress Theme",
    category: "Web Development, Premium Theme",
    description: "Give your restaurant or café the online presence it deserves with a modern, appetizing, and fully responsive Restaurant & Café WordPress Theme. Designed to attract hungry customers, it helps you showcase your menu, highlight special dishes, and let visitors book tables or order online with ease. Fast, SEO-optimized, and simple to customize, this theme delivers the perfect blend of design and functionality, helping your local business stand out, grow your reservations, and turn visitors into loyal customers.",
    images: ["https://patiotime.loftocean.com/wp-content/uploads/2022/05/home-04-2.jpg", "https://patiotime.loftocean.com/wp-content/uploads/2022/10/home-10.jpg", "https://caverta.matchthemes.com/wp-content/uploads/2023/12/caverta-cafe-restaurant-theme.jpg", "https://jimmie.qodeinteractive.com/wp-content/uploads/2023/04/land-home-01.jpg", "https://jimmie.qodeinteractive.com/wp-content/uploads/2023/04/land-home-03.jpg"],
    client: "Local Restaurants & Cafes",
    duration: "6 weeks",
    technologies: "Php, Wordpress"
  },
  5: {
    title: "Premium Social Media Branding",
    category: "Branding",
    description: "Transform your brand’s online presence with eye-catching social media designs that capture attention and build trust instantly. From Instagram to Facebook, every post, story, and ad is crafted to reflect your brand’s identity, boost engagement, and attract loyal followers. Whether you’re launching a product, promoting a service, or growing your audience, our professional designs help you stand out in the feed and turn every scroll into a potential customer. Make your brand unforgettable, start with visuals that speak success.",
    images: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/209131124/original/7b4c7b2c3edf94bc91118305357a4b0cdfd4a06c/canva-template-presentation-social-media-posts-flyer-brochure-menu-design.png", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/165968954/original/406ea3e699b97ac101049fd7797013e372891edb/create-flyer-for-social-media-posts-and-products.png", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/209131124/original/3f54b35d0f65194f3c8130e7280dca937b7a8330/canva-template-presentation-social-media-posts-flyer-brochure-menu-design.png", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/209131124/original/43094e52b6ed0807eb1b2b470439b2567f59a4a1/canva-template-presentation-social-media-posts-flyer-brochure-menu-design.png"],
    client: "All Business",
    duration: "3 months",
    technologies: "Photoshop, Canva pro, ai tools"
  },
  6: {
    title: "Premium social media advertising",
    category: "Branding",
    description: "Reach the right audience and grow your business faster with powerful social media advertising. From strategy to creative design and campaign management, we help you run targeted ads that convert — on platforms like Facebook, Instagram, TikTok, and LinkedIn. Our data-driven approach ensures every dollar you spend delivers real results: more leads, more sales, and stronger brand visibility. Stop guessing and start scaling, turn your social media into a revenue machine today.",
    images: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/335059253/original/eada4959421eae260a0a688dbec6945bb43a4d4f/drive-conversions-with-creative-online-shop-ads.jpg", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/335059253/original/1756d9f79b12eb86ccc16a3ac8b08ce9a04616ea/drive-conversions-with-creative-online-shop-ads.jpg", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/406375295/original/32b5e0ff4c18ae3c21bf972bb24bf3d0a404ae43/design-stunning-posters-professionally.jpg", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/406375295/original/22ce9cbb53887f0b94c5804aa55f349231e38d10/design-stunning-posters-professionally.jpg"],
    client: "All Business",
    duration: "2 months",
    technologies: "Photoshop, Canva pro, ai tools"
  },
  7: {
    title: "Customer Support AI",
    category: "AI Solutions",
    description: "Deliver instant, 24/7 support with intelligent AI-powered customer service that never sleeps. Our Customer Support AI understands questions, provides accurate answers, and resolves issues in real time — boosting satisfaction while reducing workload. From live chat to automated ticket handling, it learns from every interaction to offer faster and smarter responses. Enhance your customer experience, cut response times, and keep your clients happy — all while saving time and money with the future of support automation.",
    images: ["https://www.tidio.com/wp-content/uploads/1-chatbot-vs-livechat.png", "https://www.tidio.com/wp-content/uploads/17-lyro-playground-for-testing-a-knowledge-base-chatbot.webp", "https://res.cloudinary.com/dn1j6dpd7/image/fetch/f_auto,q_auto,w_736/https://chatbot-blog.livechat.com/app/uploads/2025/04/chatbot-guide-chatbot-with-AI-knowledge.png"],
    client: "Websites , Mobile Apps",
    duration: "2 months",
    technologies: "Ai tools"
  },
  8: {
    title: "Customer Support AI",
    category: "AI Solutions",
    description: "Save time, cut costs, and boost productivity with intelligent workflow automation. From repetitive admin tasks to complex multi-step processes, our automation solutions help your team work smarter — not harder. Connect your favorite apps, eliminate manual errors, and let smart systems handle the routine while you focus on growth. Whether it’s sales, marketing, or operations, streamline everything with automated workflows that run your business efficiently and effortlessly.",
    images: ["https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/Sec_O_Ps_light_2_1eea5b5172.webp", "https://images.ctfassets.net/0sppvm4cmdq7/1uN9XmvzzQqZFJq8yE8NKe/6ebe64226f343c509d95f8f29ec28ea5/Screen_Shot_2024-10-30_at_3.05.50_PM.png", "https://pbs.twimg.com/media/G2nou3-acAAMJ6F?format=jpg&name=4096x4096"],
    client: "All Buisness",
    duration: "2 months",
    technologies: "Ai tools"
  },
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
  const projectTypeCheckboxes = document.querySelectorAll('input[name="projectType"]:checked');
  const projectTypes = Array.from(projectTypeCheckboxes).map(checkbox => checkbox.value).join(', ');
  
  // Validate that at least one project type is selected
  if (projectTypes === '') {
    alert('Please select at least one project type.');
    return;
  }
  
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
