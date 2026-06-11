    // =========== BACK TO TOP BUTTON ===========
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =========== ACTIVE NAV LINK SCROLL ===========
    const navItems = document.querySelectorAll('.eris-nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.querySelector('a').getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========== EMAILJS FORM SUBMISSION ===========
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('from_name').value;
            const email = document.getElementById('reply_to').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showError('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Hide previous messages
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                reply_to: email,
                message: message,
                date: new Date().toLocaleString()
            };
            
            try {
                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_3n851bn', // SERVICE ID
                    'template_f147f7u', // TEMPLATE ID
                    templateParams
                );
                
                // Success
                console.log('Email sent successfully:', response);
                showSuccess();
                contactForm.reset();
                
            } catch (error) {
                // Error
                console.error('Email sending failed:', error);
                showError('Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
    
    function showSuccess() {
        if (!formSuccess) return;
        
        formSuccess.style.display = 'block';
        if (formError) formError.style.display = 'none';
        
        // Scroll to show success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    }
    
    function showError(errorMessage) {
        if (!formError) return;
        
        formError.textContent = `✗ ${errorMessage}`;
        formError.style.display = 'block';
        if (formSuccess) formSuccess.style.display = 'none';
        
        // Scroll to show error message
        formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // =========== PORTFOLIO CARD INTERACTION ===========
    // Optional: If you want to add interactions to portfolio cards
    const portfolioCards = document.querySelectorAll('.eris-portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
