// App data structure
const appData = {
    '1': {
        name: 'RidePal',
        image: 'https://ik.imagekit.io/atlht1jbt/400x400ia-75%20(3).webp',
        downloads: '100K+',
        reviews: '6K+',
        description: 'Discover the best MTB trails, track your rides, compete with friends, and share your mountain biking adventures.'
    }
};

// Initialize Vanta.js waves effect
window.addEventListener('load', function() {
    let vantaEffect = null;
    
    // Wait for Vanta to be available
    function initVanta() {
        if (typeof VANTA !== 'undefined' && VANTA.WAVES) {
            vantaEffect = VANTA.WAVES({
                el: "#vanta-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 0.5,
                scaleMobile: 0.5,
                color: 0x0a0a0a,
                shininess: 20.00,
                waveHeight: 10.00,
                waveSpeed: 1.50,
                zoom: 0.15  // Start zoomed in
            });
            
            // Animate zoom on page load - zoom out effect
            setTimeout(() => {
                const startTime = Date.now();
                
                // Background zoom parameters
                const backgroundDuration = 2000; // 2 seconds
                const initialZoom = 0.15;
                const targetZoom = 0.4;
                
                // Logo animation parameters - faster than background
                const logoDuration = 1100; // 1.1 seconds (a little slower)
                const heroLogo = document.querySelector('.hero-title');
                const initialWidth = 4; // rem - smaller initial size
                const targetWidth = 8; // rem - will be clamped by CSS to max 20rem
                const initialRotation = -90; // degrees (rotated left)
                const targetRotation = 0; // degrees (normal position)
                let logoAnimationComplete = false;
                
                function animateBoth() {
                    const elapsed = Date.now() - startTime;
                    
                    // Background zoom progress
                    const backgroundProgress = Math.min(elapsed / backgroundDuration, 1);
                    const backgroundEaseOut = 1 - Math.pow(1 - backgroundProgress, 3);
                    
                    // Logo animation progress (faster)
                    const logoProgress = Math.min(elapsed / logoDuration, 1);
                    // Softer ease-out with higher power for slower deceleration
                    const logoEaseOut = 1 - Math.pow(1 - logoProgress, 5);
                    
                    // Update background zoom
                    const currentZoom = initialZoom + (targetZoom - initialZoom) * backgroundEaseOut;
                    if (vantaEffect) {
                        if (vantaEffect.setOptions) {
                            vantaEffect.setOptions({ zoom: currentZoom });
                        } else if (vantaEffect.options) {
                            vantaEffect.options.zoom = currentZoom;
                            if (vantaEffect.renderer && vantaEffect.renderer.setZoom) {
                                vantaEffect.renderer.setZoom(currentZoom);
                            }
                        }
                    }
                    
                    // Update logo rotation and scale (faster animation)
                    if (heroLogo) {
                        const currentRotation = initialRotation + (targetRotation - initialRotation) * logoEaseOut;
                        const currentWidth = initialWidth + (targetWidth - initialWidth) * logoEaseOut;
                        
                        heroLogo.style.transform = `rotate(${currentRotation}deg)`;
                        heroLogo.style.width = `${currentWidth}rem`;
                        
                        // Check if logo animation is complete and trigger glitch
                        if (logoProgress >= 1 && !logoAnimationComplete) {
                            logoAnimationComplete = true;
                            // Set final values
                            heroLogo.style.transform = `rotate(${targetRotation}deg)`;
                            heroLogo.style.width = `${targetWidth}rem`;
                            
                            // Trigger glitch effect 0.1 seconds after logo animation completes
                            setTimeout(() => {
                                // Store original image for pseudo-elements
                                const originalSrc = heroLogo.src;
                                
                                // Add glitch class
                                heroLogo.classList.add('glitching');
                                
                                // Update pseudo-element backgrounds to use current image
                                const style = document.createElement('style');
                                style.textContent = `
                                    .hero-title.glitching::before,
                                    .hero-title.glitching::after {
                                        background-image: url('${originalSrc}');
                                    }
                                `;
                                document.head.appendChild(style);
                                
                                // Change image source during glitch
                                setTimeout(() => {
                                    heroLogo.src = 'https://ik.imagekit.io/atlht1jbt/Frame%204%20(8).png';
                                    // Update pseudo-elements to new image
                                    style.textContent = `
                                        .hero-title.glitching::before,
                                        .hero-title.glitching::after {
                                            background-image: url('https://ik.imagekit.io/atlht1jbt/Frame%204%20(8).png');
                                        }
                                    `;
                                }, 25); // Change image mid-glitch (faster)
                                
                                // Remove glitch class after animation and make image larger immediately
                                setTimeout(() => {
                                    heroLogo.classList.remove('glitching');
                                    heroLogo.classList.add('second-image');
                                    document.head.removeChild(style);
                                    // Set to larger size immediately, no transition
                                    heroLogo.style.width = 'clamp(12rem, 24vw, 20rem)';
                                    heroLogo.style.transition = 'none';
                                    
                                    // Fade in tagline after glitch
                                    const heroTagline = document.querySelector('.hero-tagline');
                                    const statsReveal = document.querySelector('.stats-reveal');
                                    const ourAppsText = document.querySelector('.our-apps-text');
                                    
                                    if (heroTagline) {
                                        setTimeout(() => {
                                            heroTagline.classList.add('visible');
                                        }, 200);
                                    }
                                    
                                    if (statsReveal) {
                                        setTimeout(() => {
                                            statsReveal.classList.add('visible');
                                            
                                            // Animate the counting numbers
                                            const statNumbers = statsReveal.querySelectorAll('.stat-number');
                                            statNumbers.forEach(numEl => {
                                                const target = parseInt(numEl.getAttribute('data-target'));
                                                const duration = 2000; // 2 seconds
                                                const startTime = Date.now();
                                                
                                                function animateCount() {
                                                    const elapsed = Date.now() - startTime;
                                                    const progress = Math.min(elapsed / duration, 1);
                                                    
                                                    // Ease out cubic for smooth deceleration
                                                    const easeOut = 1 - Math.pow(1 - progress, 3);
                                                    const current = Math.floor(target * easeOut);
                                                    
                                                    numEl.textContent = current;
                                                    
                                                    if (progress < 1) {
                                                        requestAnimationFrame(animateCount);
                                                    } else {
                                                        numEl.textContent = target;
                                                    }
                                                }
                                                
                                                animateCount();
                                            });
                                        }, 300); // Delay after glitch for stats
                                    }
                                    
                                    // Fade in "OUR APPS" text after stats reveal
                                    if (ourAppsText) {
                                        setTimeout(() => {
                                            ourAppsText.classList.add('visible');
                                        }, 1800); // Appear after stats counting animation
                                    }
                                    
                                    if (ourAppsText) {
                                        // Wait until OUR APPS is visible before adding click handlers
                                        setTimeout(() => {
                                            // Function to hide apps and return to original state
                                            function hideApps() {
                                                const heroSection = document.querySelector('.hero-section');
                                                const appsContainer = document.querySelector('.apps-container');
                                                const appsLabel = document.querySelector('.apps-text-label');
                                                const heroLogo = document.querySelector('.hero-title');
                                                
                                                heroSection.classList.remove('apps-shown');
                                                appsContainer.classList.remove('visible');
                                                appsContainer.classList.remove('show-detail');
                                                appsLabel.textContent = 'OUR APPS';
                                                if (heroLogo) {
                                                    heroLogo.style.opacity = '1';
                                                    heroLogo.style.visibility = 'visible';
                                                }
                                            }
                                            
                                            // Function to show apps
                                            function showApps() {
                                                const heroSection = document.querySelector('.hero-section');
                                                const appsContainer = document.querySelector('.apps-container');
                                                const appsLabel = document.querySelector('.apps-text-label');
                                                const heroLogo = document.querySelector('.hero-title');
                                                
                                                heroSection.classList.add('apps-shown');
                                                appsContainer.classList.add('visible');
                                                if (heroLogo) {
                                                    heroLogo.style.opacity = '0';
                                                    heroLogo.style.visibility = 'hidden';
                                                    heroLogo.style.transition = 'opacity 0.6s ease-out, visibility 0.6s ease-out';
                                                }
                                            }
                                            
                                            // Add click handler for showing apps
                                            ourAppsText.addEventListener('click', function(e) {
                                                e.stopPropagation();
                                                if (!document.querySelector('.hero-section').classList.contains('apps-shown')) {
                                                    showApps();
                                                }
                                            });
                                            
                                            // Add click handler for hiding apps (below container)
                                            const hideAppsText = document.querySelector('.hide-apps-text');
                                            if (hideAppsText) {
                                                hideAppsText.addEventListener('click', function(e) {
                                                    e.stopPropagation();
                                                    hideApps();
                                                });
                                            }
                                            
                                            // Click outside container to hide apps
                                            document.addEventListener('click', function(e) {
                                                const appsContainer = document.querySelector('.apps-container');
                                                const heroSection = document.querySelector('.hero-section');
                                                const appDetailView = document.querySelector('.app-detail-view');
                                                
                                                // Don't hide apps if clicking on back button or inside detail view
                                                if (e.target.closest('.back-button') || 
                                                    (appDetailView && appDetailView.classList.contains('show'))) {
                                                    return;
                                                }
                                                
                                                if (heroSection.classList.contains('apps-shown')) {
                                                    // Check if click is outside the container
                                                    if (appsContainer && !appsContainer.contains(e.target) && 
                                                        !ourAppsText.contains(e.target)) {
                                                        hideApps();
                                                    }
                                                }
                                            });
                                            
                                            // Use event delegation for app item clicks
                                            const appsContainerEl = document.querySelector('.apps-container');
                                            if (appsContainerEl) {
                                                appsContainerEl.addEventListener('click', function(e) {
                                                    const appItem = e.target.closest('.app-item');
                                                    if (!appItem) return;
                                                    
                                                    e.stopPropagation();
                                                    
                                                    const appDetailView = document.querySelector('.app-detail-view');
                                                    const appDetailIcon = document.querySelector('.app-detail-icon');
                                                    const appDetailName = document.querySelector('.app-detail-name');
                                                    const appDetailStats = document.querySelector('.app-detail-stats');
                                                    
                                                    if (!appDetailView || !appDetailIcon || !appDetailName) {
                                                        console.log('Missing elements:', {appDetailView, appDetailIcon, appDetailName});
                                                        return;
                                                    }
                                                    
                                                    const appNumber = appItem.getAttribute('data-app');
                                                    const appNameEl = appItem.querySelector('.app-name');
                                                    if (!appNameEl) return;
                                                    
                                                    const appName = appNameEl.textContent;
                                                    
                                                    // Get the app icon style
                                                    const appIcon = appItem.querySelector('.app-icon');
                                                    if (!appIcon) return;
                                                    
                                                    const iconStyle = window.getComputedStyle(appIcon);
                                                    
                                                    // Show detail view (don't hide apps container)
                                                    appDetailView.style.display = 'flex';
                                                    appDetailView.style.flexDirection = 'column';
                                                    appDetailView.style.alignItems = 'center';
                                                    appDetailView.style.justifyContent = 'center';
                                                    
                                                    // Trigger fade in
                                                    requestAnimationFrame(() => {
                                                        appDetailView.classList.add('show');
                                                        requestAnimationFrame(() => {
                                                            appDetailView.classList.add('showing');
                                                        });
                                                    });
                                                    
                                                    // Get app data if available, otherwise use defaults
                                                    const appDetailAbout = document.querySelector('.app-about-text');
                                                    const appPrivacyLink = document.querySelector('.app-privacy-link');
                                                    
                                                    // Reset privacy link
                                                    if (appPrivacyLink) {
                                                        appPrivacyLink.style.display = 'none';
                                                        appPrivacyLink.href = '#';
                                                    }
                                                    
                                                    // Handle app-specific data
                                                    if (appNumber === '1') {
                                                        // RidePal
                                                        appDetailName.textContent = 'RidePal';
                                                        if (appDetailStats) {
                                                            appDetailStats.textContent = '100K+ DOWNLOADS • 6K+ 5 STAR REVIEWS';
                                                        }
                                                        if (appDetailAbout) {
                                                            appDetailAbout.textContent = 'Discover the best MTB trails, track your rides, compete with friends, and share your mountain biking adventures.';
                                                        }
                                                        if (appDetailIcon) {
                                                            appDetailIcon.style.background = `url('https://ik.imagekit.io/atlht1jbt/400x400ia-75%20(3).webp') center/cover no-repeat`;
                                                        }
                                                        if (appPrivacyLink) {
                                                            appPrivacyLink.href = 'ride-pal-privacy-policy/';
                                                            appPrivacyLink.style.display = 'inline-block';
                                                        }
                                                    } else if (appNumber === '2') {
                                                        // AutoLab
                                                        appDetailName.textContent = 'AutoLab';
                                                        if (appDetailStats) {
                                                            appDetailStats.textContent = '90K+ DOWNLOADS • 3K+ 4.9 STAR REVIEWS';
                                                        }
                                                        if (appDetailAbout) {
                                                            appDetailAbout.textContent = 'Customize your real car with AI. Add new wheels, body kits, wraps, and more all with the tap of a button.';
                                                        }
                                                        if (appDetailIcon) {
                                                            appDetailIcon.style.background = `url('https://ik.imagekit.io/atlht1jbt/400x400ia-75%20(4).webp') center/cover no-repeat`;
                                                        }
                                                    } else if (appNumber === '3') {
                                                        // Ignite
                                                        appDetailName.textContent = 'Ignite';
                                                        if (appDetailStats) {
                                                            appDetailStats.textContent = 'JUST LAUNCHED';
                                                        }
                                                        if (appDetailAbout) {
                                                            appDetailAbout.textContent = 'Rewire your discipline in 70 days, with personalized daily tasks, AI task verification, screen time blocking, and more. Reset your life.';
                                                        }
                                                        if (appDetailIcon) {
                                                            appDetailIcon.style.background = `url('https://ik.imagekit.io/atlht1jbt/400x400ia-75%20(2).webp') center/cover no-repeat`;
                                                        }
                                                        if (appPrivacyLink) {
                                                            appPrivacyLink.href = 'ignite-privacy-policy/';
                                                            appPrivacyLink.style.display = 'inline-block';
                                                        }
                                                    } else if (appNumber === '4') {
                                                        // Prepzi AI
                                                        appDetailName.textContent = 'Prepzi AI';
                                                        if (appDetailStats) {
                                                            appDetailStats.textContent = '1,000+ USERS';
                                                        }
                                                        if (appDetailAbout) {
                                                            appDetailAbout.textContent = 'Ace your interviews with AI-powered practice. Practice with realistic AI interviewers and get personalized feedback to land your dream job.';
                                                        }
                                                        if (appDetailIcon) {
                                                            appDetailIcon.style.background = `url('https://ik.imagekit.io/atlht1jbt/prepzi-ai.webp') center/cover no-repeat`;
                                                        }
                                                    } else {
                                                        // Other apps - use defaults
                                                        appDetailName.textContent = appName;
                                                        if (appDetailStats) {
                                                            // Fallback to random values for apps without data
                                                            const downloads = Math.floor(Math.random() * 900000) + 100000;
                                                            const reviews = Math.floor(Math.random() * 5000) + 1000;
                                                            
                                                            // Format downloads with K+ notation
                                                            const downloadsFormatted = downloads >= 1000 
                                                                ? `${Math.floor(downloads / 1000)}K+` 
                                                                : `${downloads}+`;
                                                            
                                                            // Format reviews with K+ notation
                                                            const reviewsFormatted = reviews >= 1000 
                                                                ? `${Math.floor(reviews / 1000)}K+` 
                                                                : `${reviews}+`;
                                                            
                                                            appDetailStats.textContent = `${downloadsFormatted} DOWNLOADS • ${reviewsFormatted} 5 STAR REVIEWS`;
                                                        }
                                                        // Copy icon style to detail icon
                                                        appDetailIcon.style.background = iconStyle.background;
                                                        appDetailIcon.style.backgroundImage = '';
                                                    }
                                                    
                                                    // Store which app was clicked
                                                    appDetailView.setAttribute('data-current-app', appNumber);
                                                });
                                            }
                                            
                                            // Back button handler
                                            document.addEventListener('click', function(e) {
                                                if (e.target.closest('.back-button')) {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    const appDetailView = document.querySelector('.app-detail-view');
                                                    if (appDetailView) {
                                                        // Trigger fade out
                                                        appDetailView.classList.remove('showing');
                                                        setTimeout(() => {
                                                            appDetailView.classList.remove('show');
                                                            appDetailView.style.display = 'none';
                                                        }, 300); // Match transition duration
                                                    }
                                                    // Don't close the apps container, just hide the detail view
                                                    return false;
                                                }
                                            });
                                            
                                        }, 100); // Small delay after glitch completes
                                    }
                                }, 150); // Faster glitch duration
                            }, 100); // Wait 0.1 seconds after animation completes
                        }
                    }
                    
                    // Continue animation until background is complete
                    if (backgroundProgress < 1) {
                        requestAnimationFrame(animateBoth);
                    } else {
                        // Ensure final values are set exactly
                        if (vantaEffect && vantaEffect.options) {
                            vantaEffect.options.zoom = targetZoom;
                        }
                        if (heroLogo && !logoAnimationComplete) {
                            heroLogo.style.transform = `rotate(${targetRotation}deg)`;
                            heroLogo.style.width = `${targetWidth}rem`;
                        }
                    }
                }
                
                requestAnimationFrame(animateBoth);
            }, 500);
        } else {
            // Retry if Vanta isn't loaded yet
            setTimeout(initVanta, 100);
        }
    }
    
    initVanta();

    // Add hover effects to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.6';
        });
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

