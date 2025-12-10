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
                                    
                                    // Fade in "OUR APPS" text after glitch
                                    const ourAppsText = document.querySelector('.our-apps-text');
                                    if (ourAppsText) {
                                        setTimeout(() => {
                                            ourAppsText.classList.add('visible');
                                            
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
                                                    appDetailView.classList.add('show');
                                                    
                                                    // Force display
                                                    appDetailView.style.display = 'flex';
                                                    appDetailView.style.flexDirection = 'column';
                                                    appDetailView.style.alignItems = 'center';
                                                    appDetailView.style.justifyContent = 'center';
                                                    
                                                    // Update detail view
                                                    appDetailName.textContent = appName;
                                                    
                                                    // Update stats (you can customize these values per app)
                                                    if (appDetailStats) {
                                                        // Example: generate random values for demo
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
                                                        appDetailView.classList.remove('show');
                                                        appDetailView.style.display = 'none';
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

