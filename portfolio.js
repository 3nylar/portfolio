document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Update aria-expanded attribute
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
            
            // Prevent scrolling when menu is open
            if (hamburger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking on a navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        }
    });
    
    // Project modal functionality
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const projectImages = document.querySelectorAll('.project-img');
    
    // Open modal when a project image is clicked
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modalTitle.textContent = this.dataset.project;
            modal.setAttribute('aria-hidden', 'false');
            modalClose.focus(); // Focus on close button for accessibility
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            modal.style.display = 'flex';
        });
        
        // Also trigger modal on Enter key for keyboard accessibility
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                img.click();
            }
        });
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
        modal.style.display = 'none';
        
        // Return focus to the element that opened the modal
        const activeProjectImg = document.querySelector('.project-img[data-active="true"]');
        if (activeProjectImg) {
            activeProjectImg.focus();
            activeProjectImg.removeAttribute('data-active');
        }
    }
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    contactForm.addEventListener('submit', function(e) {
        let valid = true;
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name';
            valid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            valid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message';
            valid = false;
        }
        
        if (!valid) {
            e.preventDefault();
        } else {
            // Here you would typically send the form data to a server
            // For now, just show an alert
            alert('Thank you for your message! I\'ll get back to you soon.');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLink = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});