//Warning display
let countdown = 1;
const countdownEl = document.getElementById('countdown');
const modal = document.getElementById('warningModal');

const timer = setInterval(() => {
  countdown--;
  countdownEl.textContent = countdown;
  if (countdown === 0) {
    clearInterval(timer);
    modal.style.display = 'none';
    modal.style.zIndex = '-10';
  }
}, 1000);


//Category selector
const selectFilter = document.getElementById('categoryFilter');
const sections = document.querySelectorAll('section');

selectFilter.addEventListener('change', () => {
  const filter = selectFilter.value;
  sections.forEach(section => {
    if (filter === 'all' || section.getAttribute('data-category') === filter) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
});
window.addEventListener('DOMContentLoaded', () => {
  const filter = selectFilter.value;
  sections.forEach(section => {
    if (filter === 'all' || section.getAttribute('data-category') === filter) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
});


//Link checker button
const btn = document.getElementsByClassName("Btn")[0];
const divLinkChecker = document.getElementById("displayLink");
const hrefList = Array.from(document.querySelectorAll('a[href]')).map(el => el.href);
let downSite = [];

async function checkLink() {
  const errors = [];
  const hrefList = Array.from(document.querySelectorAll('a[href]')).map(el => el.href);

  for (const url of hrefList) {
    try {
      const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
    } catch (e) {
      const msg = e.message || "";
      
      if (
        msg.includes("Cross-Origin-Resource-Policy") ||
        msg.includes("CORP") ||
        msg.includes("NS_ERROR_DOM_CORP_FAILED")
      ) {
        continue;
      }

      errors.push({
        url,
        code: "JS_ERR",
        msg
      });
    }
  }

  return errors;
}


btn.addEventListener("click", async () => {
  divLinkChecker.innerHTML = `
    <div class="loader">
      <span class="loader-text">Just a moment...</span>
      <span class="load"></span>
    </div>
  `;

  const result = await checkLink();

  divLinkChecker.innerHTML = "";

  if (result.length === 0) {
    const ok = document.createElement("p");
    ok.textContent = "✅ All links seem accessible.";
    divLinkChecker.appendChild(ok);
  } else {
    result.forEach(({ url, code, msg }) => {
      const p = document.createElement("p");
      p.textContent = `❌ ${url} → [${code}] ${msg}`;
      divLinkChecker.appendChild(p);
    });
  }
});

