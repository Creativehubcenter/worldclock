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
    "Pacific/Auckland": "Auckland 🇳🇿"
  };

  // Format date/time for a timezone, safely
  function formatPartsForZone(timeZone) {
    try {
      const now = new Date();

      const optsDate = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone
      };

      const optsTime = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone
      };

      const dateStr = new Intl.DateTimeFormat(undefined, optsDate).format(now);
      const timeStr = new Intl.DateTimeFormat(undefined, optsTime).format(now);

      // Try to extract a short time-zone name (may not be available in all engines)
      let tzAbbrev = '';
      try {
        const parts = new Intl.DateTimeFormat(undefined, { timeZone, timeZoneName: 'short' }).formatToParts(now);
        const tzPart = parts.find(p => p.type === 'timeZoneName');
        tzAbbrev = tzPart ? ` (${tzPart.value})` : '';
      } catch (e) {
        // not critical — some browsers/older engines won't support formatToParts with timeZoneName
        tzAbbrev = '';
      }

      return { dateStr, timeStr, tzAbbrev };
    } catch (err) {
      // If an invalid time zone was supplied or Intl isn't available, log and return placeholders
      console.error('Error formatting date/time for timezone:', timeZone, err);
      return { dateStr: '—', timeStr: '—', tzAbbrev: '' };
    }
  }

  // When user picks a city
  citySelect.addEventListener('change', (e) => {
    const tz = e.target.value;
    if (!tz) {
      featuredTitle.textContent = 'Pick a city from the dropdown';
      featuredDate.textContent = '—';
      featuredTime.textContent = '—';
      return;
    }

    const { dateStr, timeStr, tzAbbrev } = formatPartsForZone(tz);
    featuredTitle.textContent = cityNames[tz] || tz;
    featuredDate.textContent = dateStr;
    featuredTime.textContent = `${timeStr}${tzAbbrev}`;

    // Alert for UX (optional)
    alert(`It is ${dateStr} ${timeStr}${tzAbbrev} in ${cityNames[tz] || tz}`);
  });

  // Update the small clocks (grid) and the featured area if a city is selected
  function updateClocks() {
    document.querySelectorAll('.city').forEach(node => {
      const tz = node.getAttribute('data-timezone');
      if (!tz) return;
      const { dateStr, timeStr, tzAbbrev } = formatPartsForZone(tz);
      node.querySelector('.date').textContent = dateStr;
      node.querySelector('.time').textContent = `${timeStr}${tzAbbrev}`;
    });

    const selectedTz = citySelect.value;
    if (selectedTz) {
      const { dateStr, timeStr, tzAbbrev } = formatPartsForZone(selectedTz);
      featuredDate.textContent = dateStr;
      featuredTime.textContent = `${timeStr}${tzAbbrev}`;
    }
  }

  // initial tick + interval
  updateClocks();
  setInterval(updateClocks, 1000);
});
