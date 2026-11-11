document.addEventListener("DOMContentLoaded", () => {
  // 1. Custom Loader
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 600);
  });

  // 2. Intro Screen -> Main Website Transition
  const introScreen = document.getElementById("intro-screen");
  const enterBtn = document.getElementById("enter-btn");
  const mainContent = document.getElementById("main-content");

  enterBtn.addEventListener("click", () => {
    introScreen.classList.add("exit");
    setTimeout(() => {
      introScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
      triggerScrollReveal();
    }, 750);
  });

  // 3. Live Digital Clock
  const clockEl = document.getElementById("live-clock");
  function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 4. Animated Typing Text
  const typingEl = document.getElementById("typing-text");
  const phrases = [
    "A rare soul in a crowded world...",
    "Elegance, warmth, and pure magic ✨",
    "Made to shine brighter than the stars 💫",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIdx];
    typingEl.textContent = isDeleting
      ? current.substring(0, charIdx--)
      : current.substring(0, charIdx++);

    let speed = isDeleting ? 40 : 75;
    if (!isDeleting && charIdx === current.length + 1) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400;
    }
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  // 5. Universe Canvas (Stars + Mouse/Touch Sparkles)
  const canvas = document.getElementById("universe-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let sparkles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < 90; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
    });
  }

  function addSparkle(x, y) {
    for (let i = 0; i < 4; i++) {
      sparkles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        r: Math.random() * 2.5 + 1,
        alpha: 1,
        color: Math.random() > 0.5 ? "#ff2e93" : "#fbbf24",
      });
    }
  }

  window.addEventListener("mousemove", (e) => addSparkle(e.clientX, e.clientY));
  window.addEventListener("touchmove", (e) => {
    if (e.touches[0]) addSparkle(e.touches[0].clientX, e.touches[0].clientY);
  });

  function animateUniverse() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s) => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.1) s.speed *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    });

    sparkles.forEach((sp, idx) => {
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= 0.025;
      if (sp.alpha <= 0) {
        sparkles.splice(idx, 1);
      } else {
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    requestAnimationFrame(animateUniverse);
  }
  animateUniverse();

  // 6. Floating Hearts
  const heartsContainer = document.getElementById("floating-hearts");
  const heartSymbols = ["💗", "💖", "✨", "💜", "🩷"];

  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 4 + 5 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  }, 650);

  // 7. Interactive Compliment Cards
  document.querySelectorAll(".compliment-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("glow-active");
      const noteEl = card.querySelector(".card-note");
      noteEl.textContent = card.classList.contains("glow-active")
        ? card.dataset.note
        : "";
    });
  });

  // 8. Secret Gift Unlock
  const unlockBtn = document.getElementById("unlock-btn");
  const lockIcon = document.getElementById("lock-icon");
  const secretHint = document.getElementById("secret-hint");
  const secretReveal = document.getElementById("secret-reveal");

  unlockBtn.addEventListener("click", () => {
    lockIcon.textContent = "🔓";
    lockIcon.classList.add("unlocked");
    secretHint.textContent = "Unlocked with love ✨";
    unlockBtn.classList.add("hidden");
    secretReveal.classList.remove("hidden");

    // Mini heart burst
    const rect = unlockBtn.getBoundingClientRect();
    for (let i = 0; i < 18; i++) {
      addSparkle(rect.left + rect.width / 2, rect.top);
    }
  });

  // 9. Final Surprise Modal & Heart Explosion
  const surpriseBtn = document.getElementById("surprise-btn");
  const surpriseModal = document.getElementById("surprise-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const expCanvas = document.getElementById("heart-explosion-canvas");
  const expCtx = expCanvas.getContext("2d");
  let expParticles = [];
  let expAnimId;

  function launchHeartExplosion() {
    expCanvas.width = window.innerWidth;
    expCanvas.height = window.innerHeight;
    expParticles = [];
    for (let i = 0; i < 65; i++) {
      expParticles.push({
        x: expCanvas.width / 2,
        y: expCanvas.height / 2,
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.5) * 9,
        size: Math.random() * 18 + 12,
        alpha: 1,
        char: Math.random() > 0.3 ? "❤️" : "✨",
      });
    }

    function drawExplosion() {
      expCtx.clearRect(0, 0, expCanvas.width, expCanvas.height);
      expParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.012;
        if (p.alpha > 0) {
          expCtx.globalAlpha = p.alpha;
          expCtx.font = `${p.size}px serif`;
          expCtx.fillText(p.char, p.x, p.y);
          expCtx.globalAlpha = 1;
        }
      });
      expAnimId = requestAnimationFrame(drawExplosion);
    }
    drawExplosion();
  }

  surpriseBtn.addEventListener("click", () => {
    surpriseModal.classList.remove("hidden");
    launchHeartExplosion();
  });

  closeModalBtn.addEventListener("click", () => {
    surpriseModal.classList.add("hidden");
    cancelAnimationFrame(expAnimId);
  });

  // 10. Ambient Background Music Toggle (Offline Web Audio API Synth - OFF by default)
  const musicBtn = document.getElementById("music-toggle");
  const musicIcon = musicBtn.querySelector(".music-icon");
  const musicLabel = musicBtn.querySelector(".music-label");
  let audioCtx = null;
  let isPlaying = false;
  let musicInterval = null;

  function playAmbientChord() {
    if (!audioCtx) return;
    const notes = [261.63, 329.63, 392.0, 493.88]; // Cmaj7 dreamy chord
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.03, audioCtx.currentTime + 1);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.15);
      osc.stop(audioCtx.currentTime + 4.2);
    });
  }

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      playAmbientChord();
      musicInterval = setInterval(playAmbientChord, 4200);
      isPlaying = true;
      musicBtn.classList.add("active");
      musicIcon.textContent = "🔊";
      musicLabel.textContent = "Music: ON";
    } else {
      clearInterval(musicInterval);
      isPlaying = false;
      musicBtn.classList.remove("active");
      musicIcon.textContent = "🔇";
      musicLabel.textContent = "Music: OFF";
    }
  });

  // 11. Scroll Reveal & Back to Top
  const backToTop = document.getElementById("back-to-top");

  function triggerScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
