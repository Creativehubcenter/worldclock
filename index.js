document.addEventListener('DOMContentLoaded', () => {
  const citySelect = document.getElementById('city-select');
  const featuredTitle = document.getElementById('featured-title');
  const featuredDate = document.getElementById('featured-date');
  const featuredTime = document.getElementById('featured-time');

  const cityNames = {
    "Africa/Johannesburg": "Johannesburg 🇿🇦",
    "Europe/London": "London 🇬🇧",
    "Europe/Paris": "Paris 🇫🇷",
    "Asia/Tokyo": "Tokyo 🇯🇵",
    "Australia/Sydney": "Sydney 🇦🇺",
    "Pacific/Auckland": "Auckland 🇳🇿",
    "local": "Your Location 🌍"
  };

  function formatPartsForZone(timeZone) {
    try {
      const now = new Date();
      if (timeZone === 'local') {
        // User’s current location
        return {
          dateStr: now.toLocaleDateString(undefined, { weekday: 'long', year:'numeric', month:'long', day:'numeric' }),
          timeStr: now.toLocaleTimeString(undefined, { hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true }),
          tzAbbrev: ''
        };
      } else {
        const optsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone };
        const optsTime = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone };
        const dateStr = new Intl.DateTimeFormat(undefined, optsDate).format(now);
        const timeStr = new Intl.DateTimeFormat(undefined, optsTime).format(now);
        return { dateStr, timeStr, tzAbbrev: '' };
      }
    } catch (err) {
      console.error('Error formatting date/time for timezone:', timeZone, err);
      return { dateStr:'—', timeStr:'—', tzAbbrev:'' };
    }
  }

  citySelect.addEventListener('change', (e) => {
    const tz = e.target.value;
    if (!tz) {
      featuredTitle.textContent = 'Pick a city from the dropdown';
      featuredDate.textContent = '—';
      featuredTime.textContent = '—';
      return;
    }

    const { dateStr, timeStr } = formatPartsForZone(tz);
    featuredTitle.textContent = cityNames[tz] || tz;
    featuredDate.textContent = dateStr;
    featuredTime.textContent = timeStr;
    // Optional alert
    alert(`It is ${dateStr} ${timeStr} in ${cityNames[tz] || tz}`);
  });

  function updateClocks() {
    document.querySelectorAll('.city').forEach(node => {
      const tz = node.getAttribute('data-timezone');
      if (!tz) return;
      const { dateStr, timeStr } = formatPartsForZone(tz);
      node.querySelector('.date').textContent = dateStr;
      node.querySelector('.time').textContent = timeStr;
    });

    const selectedTz = citySelect.value;
    if (selectedTz) {
      const { dateStr, timeStr } = formatPartsForZone(selectedTz);
      featuredDate.textContent = dateStr;
      featuredTime.textContent = timeStr;
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
});
