$(window).on('load', function () {
    // 1. Preloader Fadeout
    setTimeout(function () {
        $('#preloader').addClass('preloader-hidden');
        setTimeout(() => $('#preloader').remove(), 1000);

        // Start floating particles after load
        initParticles();
    }, 1500); // give it a sec to show the beauty
});

$(document).ready(function () {

    // --- 2. Music Player with Icon Animation ---
    const audio = document.getElementById("bg-music");
    const playBtn = $("#music-toggle");
    const icon = $("#music-icon");
    let isPlaying = false;

    if (audio) {
        audio.volume = 0.3;
    }

    playBtn.click(function () {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            icon.removeClass("fa-pause").addClass("fa-music").addClass("fa-beat");
            setTimeout(() => icon.removeClass("fa-beat"), 1000);
            isPlaying = false;
        } else {
            audio.play().then(() => {
                icon.removeClass("fa-music").addClass("fa-pause");
                isPlaying = true;
            }).catch(e => {
                console.error("Audio playback failed:", e);
            });
        }
    });

    // --- 3. Scroll to Content ---
    $("#scroll-down").click(function () {
        $("html, body").animate({
            scrollTop: $("#countdown-section").offset().top
        }, 1200, "swing");
    });

    // --- 4. Countdown Timer ---
    const weddingDate = new Date("May 07, 2026 09:30:00").getTime();

    const countdownTimer = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            $("#countdown").html("<h3 class='text-5xl text-gold font-script mx-auto'>Happily Ever After Begins Today</h3>");
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $("#days").text(days < 10 ? "0" + days : days);
        $("#hours").text(hours < 10 ? "0" + hours : hours);
        $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
        $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
    }, 1000);

    // --- 5. Custom Floating Dust Particles ---
    function initParticles() {
        const particleCount = 30;
        const container = $('#particles');

        for (let i = 0; i < particleCount; i++) {
            createParticle(container);
        }
    }

    function createParticle(container) {
        let size = Math.random() * 4 + 1; // 1px to 5px
        let posX = Math.random() * window.innerWidth;
        let delay = Math.random() * 20;
        let duration = Math.random() * 15 + 10; // 10s to 25s

        // Colorful Particles array (Gold, Rose, Teal, Purple glow)
        const colors = [
            'radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0) 70%)',  // Gold
            'radial-gradient(circle, rgba(255,42,84,0.8) 0%, rgba(255,42,84,0) 70%)',   // Pink/Rose
            'radial-gradient(circle, rgba(67,52,255,0.7) 0%, rgba(67,52,255,0) 70%)',   // Neon Blue/Purple
            'radial-gradient(circle, rgba(0,240,255,0.7) 0%, rgba(0,240,255,0) 70%)'    // Teal/Cyan
        ];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];

        let particle = $('<div class="particle"></div>');
        particle.css({
            width: size + 'px',
            height: size + 'px',
            left: posX + 'px',
            bottom: '-20px',
            background: randomColor,
            animationDelay: delay + 's',
            animationDuration: duration + 's'
        });

        container.append(particle);

        // recreate after animation ends to keep it infinite but varying
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, (duration + delay) * 1000);
    }

    // --- 6. GSAP Scroll Animations ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const revealElements = document.querySelectorAll('.gs-reveal');
        revealElements.forEach((elem) => {
            gsap.fromTo(elem,
                { autoAlpha: 0, y: 100, scale: 0.98 },
                {
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        const revealFastElements = document.querySelectorAll('.gs-reveal-fast');
        revealFastElements.forEach((elem) => {
            gsap.fromTo(elem,
                { autoAlpha: 0, scale: 0.8, rotationX: 10 },
                {
                    duration: 1,
                    autoAlpha: 1,
                    scale: 1,
                    rotationX: 0,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 95%", // triggers earlier
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // --- 7. RSVP Form & Dexie DB ---
    const db = new Dexie("WeddingRSVP");
    db.version(1).stores({
        rsvps: '++id, name, attendance, food, song, timestamp'
    });

    let checkAnimation;
    try {
        if (typeof lottie !== 'undefined') {
            checkAnimation = lottie.loadAnimation({
                container: document.getElementById('lottie-success'),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'https://assets9.lottiefiles.com/packages/lf20_rc5d0f61.json'
            });
            checkAnimation.setSpeed(0.7);
        }
    } catch (e) { }

    $("#rsvp-form").on("submit", async function (e) {
        e.preventDefault();

        const guestData = {
            name: $("#guest-name").val().trim(),
            attendance: $("#attendance").val(),
            food: $("#food-pref").val(),
            song: $("#song-req").val().trim() || "N/A",
            timestamp: new Date().toISOString()
        };

        const submitBtn = $(this).find('button[type="submit"]');

        submitBtn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin"></i> <span class="ml-2 relative z-10">Confirming...</span>');

        try {
            await db.rsvps.add(guestData);

            // Create WhatsApp Message text
            let attendanceText = guestData.attendance === 'attending' ? 'Yes, I am attending! 🎉' : 'Sorry, I cannot attend. 😔';
            let message = `Hello!\n\nHere is my RSVP for Sumudu & Malintha's Wedding:\n\n*Name:* ${guestData.name}\n*Attending:* ${attendanceText}\n*Food:* ${guestData.food}\n*Song Request:* ${guestData.song}`;

            // Encode the message for URL
            let encodedMessage = encodeURIComponent(message);

            // Your WhatsApp Number (Include country code, e.g., 94 for Sri Lanka)
            let whatsappNumber = "94770833202"; // REPLACE THIS NUMBER WITH YOURS

            // WhatsApp Link
            let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            $(this).fadeOut(500, function () {
                $("#rsvp-success").removeClass('hidden').hide().fadeIn(800);
                if (checkAnimation) checkAnimation.play();

                // Fire beautiful confetti
                if (typeof confetti !== 'undefined') {
                    var duration = 3000;
                    var end = Date.now() + duration;

                    (function frame() {
                        confetti({
                            particleCount: 8,
                            angle: 60,
                            spread: 70,
                            origin: { x: 0 },
                            colors: ['#D4AF37', '#FF2A54', '#4334FF', '#ffffff', '#00f0ff']
                        });
                        confetti({
                            particleCount: 8,
                            angle: 120,
                            spread: 70,
                            origin: { x: 1 },
                            colors: ['#D4AF37', '#FF2A54', '#4334FF', '#ffffff', '#00f0ff']
                        });

                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());
                }

                // Open WhatsApp after a short delay so they see the success animation
                setTimeout(() => {
                    window.open(whatsappURL, '_blank');
                }, 1200);
            });

        } catch (error) {
            console.error("Database Error:", error);
            alert("Something went wrong. Please try again.");
            submitBtn.prop('disabled', false).html('<span class="relative z-10 transition-transform duration-300 group-hover:-translate-x-2">Confirm RSVP</span><i class="fas fa-paper-plane relative z-10 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"></i>');
        }
    });

    // Form select styling fix on change
    $('select').on('change', function () {
        $(this).removeClass('text-gray-400 text-gray-800').addClass('text-white');
    });
});
