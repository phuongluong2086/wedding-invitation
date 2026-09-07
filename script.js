const weddingDate = new Date("2026-12-20T17:30:00+07:00");

const loader = document.getElementById("loader");
const openInvitation = document.getElementById("openInvitation");
const musicToggle = document.getElementById("musicToggle");
const music = document.getElementById("weddingMusic");

document.body.classList.add("locked");

openInvitation.addEventListener("click", () => {
  loader.classList.add("hidden");
  document.body.classList.remove("locked");
  // Music starts only if a source has been added.
  if (music.querySelector("source")) {
    music.play().catch(() => {});
  }
});

musicToggle.addEventListener("click", () => {
  if (!music.querySelector("source")) {
    alert("Add your music file in music/wedding.mp3 and uncomment the <source> line in index.html.");
    return;
  }
  if (music.paused) {
    music.play().catch(() => {});
    musicToggle.textContent = "❚❚";
  } else {
    music.pause();
    musicToggle.textContent = "♫";
  }
});

function updateCountdown() {
  const now = new Date();
  let diff = weddingDate - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name");
  const response = data.get("response");
  document.getElementById("formMessage").textContent =
    `Thank you, ${name}! Your response has been recorded as "${response}".`;
  event.currentTarget.reset();
});
