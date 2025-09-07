const citySelector = document.getElementById("citySelector");
const clocksContainer = document.getElementById("clocksContainer");

function createClock(timezone) {
  const clockDiv = document.createElement("div");
  clockDiv.className = "clock";
  clockDiv.setAttribute("data-timezone", timezone);
  clocksContainer.appendChild(clockDiv);
}

function updateClocks() {
  const clocks = document.querySelectorAll(".clock");
  clocks.forEach(clock => {
    const tz = clock.getAttribute("data-timezone");
    const now = new Date().toLocaleString("en-US", {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    clock.innerHTML = `<strong>${tz}</strong><br>${now}`;
  });
}

citySelector.addEventListener("change", () => {
  const selected = citySelector.value;
  if (selected) {
    createClock(selected);
    citySelector.value = ""; // Reset dropdown
  }
});

setInterval(updateClocks, 1000);
