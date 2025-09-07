(function(){
  const citySelect = document.getElementById('city-select');
  const featuredTitle = document.getElementById('featured-title');
  const featuredDate = document.getElementById('featured-date');
  const featuredTime = document.getElementById('featured-time');

  function formatPartsForZone(timeZone){
    const now = new Date();
    const optsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone };
    const optsTime = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone };
    const dateStr = new Intl.DateTimeFormat(undefined, optsDate).format(now);
    const timeStr = new Intl.DateTimeFormat(undefined, optsTime).format(now);
    return { dateStr, timeStr };
  }

  citySelect.addEventListener('change', (e)=>{
    const tz = e.target.value;
    if(!tz) return;
    const {dateStr, timeStr} = formatPartsForZone(tz);
    const message = `It is ${dateStr} ${timeStr} in ${tz}`;
    alert(message);

    featuredTitle.textContent = tz.replace('_',' ');
    featuredDate.textContent = dateStr;
    featuredTime.textContent = timeStr;
  });

  function updateClocks(){
    document.querySelectorAll('.city').forEach(node => {
      const tz = node.getAttribute('data-timezone');
      const {dateStr, timeStr} = formatPartsForZone(tz);
      node.querySelector('.date').textContent = dateStr;
      node.querySelector('.time').textContent = timeStr;
    });

    const selectedTz = citySelect.value;
    if(selectedTz){
      const {dateStr, timeStr} = formatPartsForZone(selectedTz);
      featuredDate.textContent = dateStr;
      featuredTime.textContent = timeStr;
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
})();

