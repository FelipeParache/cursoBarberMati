const deadline = new Date(2025, 2, 30, 23, 59, 0).getTime();
function tick() {
  const diff = deadline - Date.now();
  if (diff <= 0) {
    document.querySelector(".urgency-bar").style.display = "none";
    return;
  }
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  document.getElementById("t-d").textContent = pad(diff / 86400000);
  document.getElementById("t-h").textContent = pad((diff % 86400000) / 3600000);
  document.getElementById("t-m").textContent = pad((diff % 3600000) / 60000);
  document.getElementById("t-s").textContent = pad((diff % 60000) / 1000);
}
tick();
setInterval(tick, 1000);

document.querySelectorAll(".faq-q").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.closest(".faq-item");
    const open = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".fu").forEach((el) => io.observe(el));
