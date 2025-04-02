document.addEventListener("DOMContentLoaded", () => {
    console.log("Enhanced Portfolio Loaded!");
    

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delayed follower effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor effects on links and buttons
    const links = document.querySelectorAll('a, button, .project-image-container');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(0, 102, 255, 0.1)';
            cursorFollower.style.borderWidth = '0px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderWidth = '1px';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '0.7';
        cursorFollower.style.opacity = '0.5';
    });
    
    // Debounce function for better performance
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Header scroll effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", debounce(() => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }));
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Scroll reveal for projects section
    const projectsSection = document.querySelector('.projects');
    const contactSection = document.querySelector('.contact-section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.1,
        rootMargin: '-100px'
    });
    
    sectionObserver.observe(projectsSection);
    
    // Project modal functionality
    const projectDescriptions = {
        'CryptoSphere': {
            description: 'CryptoSphere is a cryptocurrency exchange application built with Swift, combining UIKit and SwiftUI components. It features real-time market data, secure transactions, and an intuitive user interface.',
            technologies: ['Swift', 'UIKit', 'SwiftUI', 'Swift Data', 'Combine', 'Python Server','RESTful APIs', 'SQLite']
        },

        'CalcZ': {
            description: 'CalcZ is a sleek calculator app that combines powerful mathematical functions with a minimalist design. It supports both basic calculations and advanced operations with an elegant interface.',
            technologies: ['Swift', 'UIKit', 'Mathematical Engine']
        },
        'Other Projects': {
            description: 'A collection of minimalist web creations showcasing clean design principles and smooth interactions. These projects demonstrate the power of simplicity in creating engaging user experiences.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design']
        }
    };
    
    // Set up project click listeners
    const projectButtons = document.querySelectorAll('.view-project-btn');
    const projectImages = document.querySelectorAll('.project-image-container');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project');
            openProjectModal(projectName);
        });
    });
    
    projectImages.forEach(container => {
        container.addEventListener('click', function() {
            const projectName = this.querySelector('.image').getAttribute('data-project');
            openProjectModal(projectName);
        });
    });
    
    function openProjectModal(projectName) {
        const modal = document.getElementById("imageModal");
        const modalTitle = document.querySelector(".modal-title");
        const mainImage = document.querySelector(".modal-main-image");
        const thumbnailsContainer = document.querySelector(".thumbnails-container");
        const projectDescriptionContainer = document.querySelector(".project-description");
        let imageSources = [];
        
        console.log("Opening modal for:", projectName);
        
        // Set modal title
        modalTitle.textContent = projectName;
        
        // Generate placeholder images for each project
        if (projectName === 'CryptoSphere') {
            imageSources = [
                './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 12.37.32.png?height=600&width=300', 
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 12.37.49.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 12.27.01.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 12.27.04.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 15.10.57.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 15.11.19.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 15.11.37.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 15.11.28.png?height=600&width=300',
                    // ,'Simulator Screenshot - iPhone 16 Plus - 2025-03-18 at 15.10.45.png?height=600&width=300'
            ];
        } else if (projectName === 'CalcZ') {
            imageSources = [
                './Resources/Simulator Screenshot - iPhone 16 Pro - 2025-03-18 at 15.17.59.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Pro - 2025-03-18 at 15.18.25.png?height=600&width=300',
                    './Resources/Simulator Screenshot - iPhone 16 Pro - 2025-03-18 at 15.18.39.png?height=600&width=300'
            ];
        } else if (projectName === 'Other Projects') {
            imageSources = [
                // 'original-f33f29a8c8263925cfec24773a674367.webp',
                './Resources/zoteScreenshot1.png?height=600&width=800?height=600&width=800',
                // 'zoteScreenshot2.png', 
                './Resources/zoteScreenshot3.png?height=600&width=800?height=600&width=800', 
                './Resources/zoteScreenshot7.png?height=600&width=800', 
                // 'zoteScreenshot4.png', 
                './Resources/zoteScreenshot5.png?height=600&width=800', 
                './Resources/zoteScreenshot6.png?height=600&width=800',
                // 'zoteScreenrecording.MOV',
            ];
        }
        
        // Set main image
        mainImage.src = imageSources[0];
        mainImage.alt = `${projectName} Image 1`;
        mainImage.dataset.currentIndex = "0";
        
        // Clear and populate thumbnails
        thumbnailsContainer.innerHTML = '';
        
        imageSources.forEach((src, index) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = src;
            thumbnail.alt = `${projectName} Thumbnail ${index + 1}`;
            thumbnail.classList.add("thumbnail");
            thumbnail.dataset.index = index.toString();
            
            // Add active class to first thumbnail
            if (index === 0) {
                thumbnail.classList.add("active");
            }
            
            // Add click event to switch main image
            thumbnail.addEventListener("click", () => {
                changeImage(index);
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Set project description
        projectDescriptionContainer.innerHTML = '';
        
        if (projectDescriptions[projectName]) {
            const descTitle = document.createElement("h3");
            descTitle.textContent = "About this project";
            projectDescriptionContainer.appendChild(descTitle);
            
            const descText = document.createElement("p");
            descText.textContent = projectDescriptions[projectName].description;
            projectDescriptionContainer.appendChild(descText);
            
            if (projectDescriptions[projectName].technologies.length > 0) {
                const techTitle = document.createElement("h3");
                techTitle.textContent = "Technologies";
                projectDescriptionContainer.appendChild(techTitle);
                
                const techList = document.createElement("ul");
                techList.classList.add("tech-list");
                
                projectDescriptions[projectName].technologies.forEach(tech => {
                    const techItem = document.createElement("li");
                    techItem.textContent = tech;
                    techList.appendChild(techItem);
                });
                
                projectDescriptionContainer.appendChild(techList);
            }
        }
        
        // Function to change the displayed image
        function changeImage(index) {
            // Ensure index is within bounds
            if (index < 0) index = imageSources.length - 1;
            if (index >= imageSources.length) index = 0;
            
            // Remove and re-add fade-in class to trigger animation
            mainImage.classList.remove("fade-in");
            void mainImage.offsetWidth; // Force reflow
            mainImage.classList.add("fade-in");
            
            // Set new image and update current index
            mainImage.src = imageSources[index];
            mainImage.alt = `${projectName} Image ${index + 1}`;
            mainImage.dataset.currentIndex = index.toString();
            
            // Update active thumbnail
            document.querySelectorAll(".thumbnail").forEach(thumb => {
                thumb.classList.remove("active");
                if (parseInt(thumb.dataset.index) === index) {
                    thumb.classList.add("active");
                }
            });
        }
        
        // Add event listeners for arrow navigation
        const leftArrow = document.querySelector(".left-arrow");
        const rightArrow = document.querySelector(".right-arrow");
        
        leftArrow.addEventListener("click", () => {
            const currentIndex = parseInt(mainImage.dataset.currentIndex);
            changeImage(currentIndex - 1);
        });
        
        rightArrow.addEventListener("click", () => {
            const currentIndex = parseInt(mainImage.dataset.currentIndex);
            changeImage(currentIndex + 1);
        });
        
        // Show modal
        modal.style.display = "block";
        
        // Add keyboard navigation
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                const currentIndex = parseInt(mainImage.dataset.currentIndex);
                changeImage(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                const currentIndex = parseInt(mainImage.dataset.currentIndex);
                changeImage(currentIndex + 1);
            } else if (e.key === "Escape") {
                modal.style.display = "none";
                document.removeEventListener("keydown", handleKeyDown);
            }
        };
        
        document.addEventListener("keydown", handleKeyDown);
        
        // Remove keyboard event listener when modal is closed
        const closeButton = document.querySelector(".close");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
            document.removeEventListener("keydown", handleKeyDown);
        });
        
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                document.removeEventListener("keydown", handleKeyDown);
            }
        });
    }
    
    // Modal close handlers
    const modal = document.getElementById("imageModal");
    const closeButton = document.querySelector(".close");
    
    // Close modal when clicking on close button
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Reset form
            contactForm.reset();
            
            // Show success notification
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill progress bars when in view
    const skillsSectionElement = document.querySelector('.skills-section');
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillsObserver = new IntersectionObserver(animateSkills, {
        root: null,
        threshold: 0.1
    });
    
    skillsObserver.observe(skillsSectionElement);
    
    // Back to Top Functionality
    const backToTopButton = document.getElementById('back-to-top');

    // Show the button when the user scrolls down 100px from the top of the document
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.opacity = "1";
            backToTopButton.style.opacity = "0";
            backToTopButton.style.transform = translateY(80);

        } else {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.transform = translateY(0);
            // backToTopButton.style.rotate
        }
    };

    // When the user clicks on the button, scroll to the top of the document
    backToTopButton.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});
