const weddingDate = new Date("2026-10-06T09:00:45+07:00");

const loader = document.getElementById("loader");
const openInvitation = document.getElementById("openInvitation");
const musicToggle = document.getElementById("musicToggle");
const music = document.getElementById("weddingMusic");

openInvitation.addEventListener("click", () => {
  loader.classList.add("hidden");
  document.body.classList.remove("locked");
  music.play().then(() => {
    musicToggle.textContent = "❚❚";
  }).catch(() => {
    musicToggle.textContent = "♫";
  });
});

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    musicToggle.textContent = "❚❚";
  } else {
    music.pause();
    musicToggle.textContent = "♫";
  }
});

function updateCountdown(){
  const diff = Math.max(0, weddingDate - new Date());
  document.getElementById("days").textContent = String(Math.floor(diff/86400000)).padStart(2,"0");
  document.getElementById("hours").textContent = String(Math.floor(diff/3600000)%24).padStart(2,"0");
  document.getElementById("minutes").textContent = String(Math.floor(diff/60000)%60).padStart(2,"0");
  document.getElementById("seconds").textContent = String(Math.floor(diff/1000)%60).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("rsvpForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  document.getElementById("formMessage").textContent =
    `Cảm ơn ${data.get("name")}! Chúng mình đã nhận được phản hồi của bạn.`;
  e.currentTarget.reset();
});
