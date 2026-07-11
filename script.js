// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

    const modal = document.getElementById('platformModal');
    const form = document.getElementById('contactForm');
    
    // Your business details
    const BUSINESS = {
        whatsapp: '+2348020664479',
        facebook: 'godwinmotors',      // Replace with your actual FB page username
        instagram: 'godwin_motors',    // Replace with your actual IG handle
        telegram: 'godwinmotors',      // Replace with your Telegram username (optional)
        email: 'godwinmotors001@email.com'
    };
    
    // Form submission → open platform chooser
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        openPlatformModal();
    });
    
    function openPlatformModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closePlatformModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closePlatformModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePlatformModal();
        }
    });
    
    // Format form data into a clean compiled message
    function compileMessage() {
        const name = document.getElementById('formName').value.trim();
        const phone = document.getElementById('formPhone').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        
        let text = `*New Enquiry — Godwin Motors*\n\n`;
        text += `👤 *Name:* ${name}\n`;
        text += `📞 *Phone:* ${phone}\n`;
        if (email) text += `📧 *Email:* ${email}\n`;
        text += `\n📝 *Parts Needed:*\n${message}\n\n`;
        text += `— Sent from godwinmotors.com.ng`;
        
        return text;
    }
    
    // Show toast notification
    function showToast(msg) {
        let toast = document.getElementById('toastNotify');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastNotify';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
    
    // Send via selected platform
    function sendVia(platform) {
        const compiledMsg = compileMessage();
        const encodedMsg = encodeURIComponent(compiledMsg);
        let url = '';
        
        switch(platform) {
            case 'whatsapp':
                url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodedMsg}`;
                window.open(url, '_blank');
                break;
                
            case 'telegram':
                url = `https://t.me/${BUSINESS.telegram}?text=${encodedMsg}`;
                // Fallback if no username set
                if (!BUSINESS.telegram || BUSINESS.telegram === 'godwinmotors') {
                    url = `https://t.me/share/url?url=${encodeURIComponent('Godwin Motors Enquiry')}&text=${encodedMsg}`;
                }
                window.open(url, '_blank');
                break;
                
            case 'email':
                url = `mailto:${BUSINESS.email}?subject=${encodeURIComponent('New Enquiry from Godwin Motors Website')}&body=${encodedMsg}`;
                window.location.href = url;
                break;
                
            case 'facebook':
                // Facebook doesn't support pre-filled DM links, so copy + open page
                navigator.clipboard.writeText(compiledMsg).then(() => {
                    showToast('Message copied! Opening Facebook...');
                    setTimeout(() => {
                        window.open(`https://m.me/${BUSINESS.facebook}`, '_blank');
                    }, 800);
                }).catch(() => {
                    showToast('Please copy the message manually');
                });
                break;
                
            case 'instagram':
                navigator.clipboard.writeText(compiledMsg).then(() => {
                    showToast('Message copied! Opening Instagram...');
                    setTimeout(() => {
                        window.open(`https://instagram.com/${BUSINESS.instagram}`, '_blank');
                    }, 800);
                }).catch(() => {
                    showToast('Please copy the message manually');
                });
                break;
                
            case 'tiktok':
                navigator.clipboard.writeText(compiledMsg).then(() => {
                    showToast('Message copied! Open TikTok to paste');
                }).catch(() => {
                    showToast('Please copy the message manually');
                });
                break;
        }
        
        closePlatformModal();
        
        // Optional: clear form after successful send attempt
        // form.reset();
    }
    
    // Mobile hamburger menu (keep your existing function)
    function toggleMenu() {
        document.querySelector('.nav-links').classList.toggle('active');
    }
