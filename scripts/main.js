// ==========================================================================
// Main JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTabs();
    initExamTabs();
    initTestimonialSlider();
    initAccordion();
    initPodcastPlayer();
    initModals();
});

// ==========================================================================
// Navigation
// ==========================================================================

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const mainNav = document.querySelector('.main-nav');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Adjust for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Change navigation background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// Tabs
// ==========================================================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ==========================================================================
// Exam Tabs
// ==========================================================================

function initExamTabs() {
    const examTabButtons = document.querySelectorAll('.exam-tab-btn');
    
    examTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            document.querySelectorAll('.exam-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.exam-tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ==========================================================================
// Testimonial Slider
// ==========================================================================

function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // 100%
    
    // Set up initial position
    updateSliderPosition();
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateSliderPosition();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSliderPosition();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSliderPosition();
        });
    });
    
    // Auto slide (optional)
    let interval = setInterval(autoSlide, 5000);
    
    function autoSlide() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSliderPosition();
    }
    
    // Pause auto slide on hover
    if (track) {
        track.addEventListener('mouseenter', function() {
            clearInterval(interval);
        });
        
        track.addEventListener('mouseleave', function() {
            interval = setInterval(autoSlide, 5000);
        });
    }
    
    // Update slider position and active dot
    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

// ==========================================================================
// Accordion
// ==========================================================================

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Update the icon
            const icon = this.querySelector('i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
}

// ==========================================================================
// Podcast Player
// ==========================================================================

function initPodcastPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const prevTrackBtn = document.getElementById('prev-track');
    const nextTrackBtn = document.getElementById('next-track');
    const volumeIcon = document.getElementById('volume-icon');
    const volumeSlider = document.getElementById('volume');
    const progressBar = document.querySelector('.progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    if (!audioPlayer) return;
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    // Initialize first track
    updateTrackInfo(0);
    
    // Play/Pause button click
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                pauseTrack();
            } else {
                playTrack();
            }
        });
    }
    
    // Previous track button click
    if (prevTrackBtn) {
        prevTrackBtn.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : playlistItems.length - 1;
            updateTrackInfo(currentTrackIndex);
            if (isPlaying) playTrack();
        });
    }
    
    // Next track button click
    if (nextTrackBtn) {
        nextTrackBtn.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex < playlistItems.length - 1) ? currentTrackIndex + 1 : 0;
            updateTrackInfo(currentTrackIndex);
            if (isPlaying) playTrack();
        });
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            audioPlayer.volume = this.value;
            updateVolumeIcon(this.value);
        });
    }
    
    if (volumeIcon) {
        volumeIcon.addEventListener('click', function() {
            if (audioPlayer.volume > 0) {
                // Store the current volume and mute
                audioPlayer.dataset.volume = audioPlayer.volume;
                audioPlayer.volume = 0;
                volumeSlider.value = 0;
            } else {
                // Restore the previous volume
                const prevVolume = audioPlayer.dataset.volume || 0.7;
                audioPlayer.volume = prevVolume;
                volumeSlider.value = prevVolume;
            }
            updateVolumeIcon(audioPlayer.volume);
        });
    }
    
    // Progress bar updates
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', function() {
            // Update progress bar
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration || 0;
            const progressPercent = (currentTime / duration) * 100;
            
            if (progressBar) {
                progressBar.style.width = progressPercent + '%';
            }
            
            // Update time displays
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(currentTime);
            }
            if (durationEl && !isNaN(duration)) {
                durationEl.textContent = formatTime(duration);
            }
        });
        
        // When audio ends, play next track
        audioPlayer.addEventListener('ended', function() {
            currentTrackIndex = (currentTrackIndex < playlistItems.length - 1) ? currentTrackIndex + 1 : 0;
            updateTrackInfo(currentTrackIndex);
            playTrack();
        });
    }
    
    // Playlist item click
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentTrackIndex = index;
            updateTrackInfo(currentTrackIndex);
            playTrack();
        });
    });
    
    // Click on progress bar to seek
    const progressArea = document.querySelector('.progress-bar');
    if (progressArea) {
        progressArea.addEventListener('click', function(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            
            audioPlayer.currentTime = (clickX / width) * duration;
        });
    }
    
    // Helper functions
    function playTrack() {
        audioPlayer.play();
        isPlaying = true;
        
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    function updateTrackInfo(index) {
        // Update active class in playlist
        playlistItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Get track info
        const selectedTrack = playlistItems[index];
        if (!selectedTrack) return;
        
        // Update audio source
        const trackSrc = selectedTrack.getAttribute('data-src');
        if (trackSrc && audioPlayer) {
            audioPlayer.src = trackSrc;
            audioPlayer.load();
        }
        
        // Update track title and artist
        const trackTitle = selectedTrack.querySelector('h4')?.textContent;
        const trackArtist = selectedTrack.querySelector('p')?.textContent;
        
        const podcastTitleEl = document.getElementById('podcast-title');
        const podcastGuestEl = document.getElementById('podcast-guest');
        
        if (podcastTitleEl && trackTitle) {
            podcastTitleEl.textContent = trackTitle;
        }
        
        if (podcastGuestEl && trackArtist) {
            podcastGuestEl.textContent = trackArtist;
        }
        
        // Reset progress and time displays
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = '00:00';
        }
    }
    
    function updateVolumeIcon(volume) {
        if (!volumeIcon) return;
        
        if (volume <= 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
}

// ==========================================================================
// Modals
// ==========================================================================

function initModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Add animation
                modal.classList.add('fadeIn');
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    });
}

// ==========================================================================
// Search Functionality for Find Your Guru
// ==========================================================================

// This could be expanded to include actual filtering based on API or backend data
// For now, it's just a demonstration with existing DOM elements

document.getElementById('search-btn')?.addEventListener('click', function() {
    const artForm = document.getElementById('art-form').value;
    const experience = document.getElementById('experience').value;
    const location = document.getElementById('location').value;
    const rating = document.getElementById('rating').value;
    
    // Get all guru cards
    const guruCards = document.querySelectorAll('.guru-card');
    
    // Simple demonstration of filtering (in a real app, this would be more sophisticated)
    guruCards.forEach(card => {
        // Simulate filtering effect - this would normally use actual data comparisons
        card.style.display = 'flex'; // Show all cards by default
        
        // Randomly hide some cards to demonstrate filtering
        if (artForm || experience || location || rating) {
            // Just a visual demonstration - in a real app, you'd check actual properties
            if (Math.random() > 0.6) {
                card.style.display = 'none';
            }
        }
    });
});