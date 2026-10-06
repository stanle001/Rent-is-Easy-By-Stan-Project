/* ==========================================================================
   JAVASCRIPT CONTROLLER: Rent is Easy by Stanley
   Handles tab switching, driving animation state, modal windows, and forms.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation event listeners
    initNavigation();
    
    // Set up default active page tab
    switchTab('home');
});

/**
 * Switch Active Page Tab
 * @param {string} pageId - Target section ID without 'page-' prefix
 */
function switchTab(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.tab-page');
    pages.forEach(page => page.classList.remove('active'));

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Activate selected page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Highlight active nav link
    const targetNav = document.getElementById(`nav-${pageId}`);
    if (targetNav) {
        targetNav.classList.add('active');
    }

    // Close mobile dropdown menu if open
    const navLinksContainer = document.getElementById('navLinks');
    if (navLinksContainer) {
        navLinksContainer.classList.remove('mobile-open');
    }

    // Scroll smoothly back to top of main content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Initialize Mobile Hamburger Navigation Toggle
 */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
        });
    }
}

/**
 * Toggle Prado Driving Scene Animation (Pause/Resume)
 */
let isDriving = true;

function toggleDriveAnimation() {
    const stage = document.getElementById('drivingStage');
    const btnText = document.getElementById('driveBtnText');
    const btnIcon = document.querySelector('#driveToggleBtn i');

    if (!stage) return;

    if (isDriving) {
        stage.classList.add('driving-paused');
        if (btnText) btnText.textContent = "Resume Drive";
        if (btnIcon) btnIcon.className = "fa-solid fa-play";
        isDriving = false;
    } else {
        stage.classList.remove('driving-paused');
        if (btnText) btnText.textContent = "Pause Drive";
        if (btnIcon) btnIcon.className = "fa-solid fa-pause";
        isDriving = true;
    }
}

/**
 * Gallery Lightbox Modal Controls
 */
function openLightbox(imgUrl, captionText) {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imgUrl;
        if (caption) caption.textContent = captionText || "Toyota Prado SUV - Rent is Easy by Stanley";
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.style.display = "none";
}

/**
 * Vehicle Booking Modal Controls
 */
function openBookingModal(carName, carPrice) {
    const modal = document.getElementById('bookingModal');
    const nameElem = document.getElementById('selectedCarName');
    const priceElem = document.getElementById('selectedCarPrice');
    const whatsappBtn = document.getElementById('whatsappBookingBtn');

    if (nameElem) nameElem.textContent = carName;
    if (priceElem) priceElem.textContent = carPrice;

    // Create custom WhatsApp message
    const message = encodeURIComponent(`Hello Stanley, I would like to book the ${carName} (${carPrice}) in Edo State.`);
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/2348108802910?text=${message}`;
    }

    if (modal) modal.style.display = "flex";
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.style.display = "none";
}

/**
 * Contact Form Submission Handler
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('senderName').value;
    const phone = document.getElementById('senderPhone').value;
    const service = document.getElementById('serviceType').value;
    const date = document.getElementById('rentalDate').value;
    const messageText = document.getElementById('messageText').value;

    const formattedMessage = encodeURIComponent(
        `Hello Stanley, my name is ${name} (${phone}).\n` +
        `Service Requested: ${service}\n` +
        `Date Needed: ${date}\n` +
        `Details: ${messageText}`
    );

    // Redirect to WhatsApp call/chat with prefilled details
    window.open(`https://wa.me/2348108802910?text=${formattedMessage}`, '_blank');

    alert("Thank you! Opening WhatsApp to connect with Stanley directly.");
}