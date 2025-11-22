// =========================
// PLAYTEST FORM SUBMISSION
// =========================
const form = document.getElementById('playtest-form');
const thankyou = document.getElementById('thankyou');

if (form && thankyou) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(() => {
        form.reset();
        thankyou.style.display = 'block';
        thankyou.style.opacity = 0;

        setTimeout(() => (thankyou.style.transition = 'opacity 1s'), 10);
        setTimeout(() => (thankyou.style.opacity = 1), 50);

        setTimeout(() => {
          thankyou.style.opacity = 0;
          setTimeout(() => {
            thankyou.style.display = 'none';
          }, 1000);
        }, 5000);
      })
      .catch(() => {
        alert('Something went wrong — please try again later.');
      });
  });
}


// =========================
// PAGE INTERACTIVITY
// =========================
document.addEventListener('DOMContentLoaded', function () {

  // -------------------------
  // CONTACT MODAL
  // -------------------------
  const fab = document.getElementById('contactFab');
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('contactClose');
  const backdrop = document.getElementById('contactBackdrop');

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (fab) fab.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });


  // ------------------------------------
  // CONTACT FORM → GOOGLE FORM SUBMISSION
  // ------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const CONTACT_ENDPOINT =
      "https://docs.google.com/forms/d/e/1FAIpQLSczpkzbyD9RH3u33TWgSOd_pVqiV7yI4_hptxAizOmJkdke6A/formResponse";

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const params = new URLSearchParams();

      params.append("entry.211252331", formData.get("name") || "");
      params.append("entry.1154168035", formData.get("email") || "");
      params.append("entry.1551975172", formData.get("subject") || "");
      params.append("entry.1604542587", formData.get("message") || "");

      fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: params,
      })
        .then(() => {
          contactForm.reset();
          alert("Thank you — your message has been sent.");
          closeModal();
        })
        .catch(() => {
          alert("Something went wrong — please try again later.");
        });
    });
  }


  // =========================
  // ESSENCE → CARD PREVIEW
  // =========================
  const essCards = document.querySelectorAll('.ess-card');
  const previewPanel = document.getElementById('essence-preview');
  const previewImg = document.getElementById('essencePreviewImg');
  const previewTitle = document.getElementById('essencePreviewTitle');
  const previewBody = document.getElementById('essencePreviewBody');
  const leySection = document.getElementById('ley');

  const essenceData = {
    oath: {
      img: "/assets/images/Ashenfield_War_Ram.jpg",
      title: "Oath — Ashenfield War Ram",
      body: "Noble siege engines that reward precise, disciplined assaults."
    },
    fury: {
      img: "/assets/images/Bonecrusher_Catapult.png",
      title: "Fury — Bonecrusher Catapult",
      body: "Brute war machines built to erase walls and morale."
    },
    veil: {
      img: "/assets/images/New_Card_Dev.png",
      title: "Veil — Trickster Engine Awakening",
      body: "Illusions, misdirection, and tempo swings."
    },
    ash: {
      img: "/assets/images/New_Card_Dev.png",
      title: "Ash — Outcast Survivors",
      body: "What survives the fire learns to burn brighter."
    },
    untuned: {
      img: "/assets/images/New_Card_Dev.png",
      title: "Untuned — Raw Ley Energy (Coming Soon)",
      body: "Unaligned, unpredictable, powerful."
    }
  };

  // Immediately hide on load
  function hidePreview() {
    if (!previewPanel) return;
    previewPanel.style.opacity = 0;
    previewPanel.style.visibility = "hidden";
    previewPanel.style.pointerEvents = "none";
  }

  hidePreview();

  function showPreview() {
    previewPanel.style.visibility = "visible";
    previewPanel.style.opacity = 1;
    previewPanel.style.pointerEvents = "auto";
  }

  function setEssencePreview(key) {
    const data = essenceData[key];
    if (!data) return;

    showPreview();

    previewImg.style.opacity = 0;
    previewTitle.style.opacity = 0;
    previewBody.style.opacity = 0;

    setTimeout(() => {
      previewImg.src = data.img;
      previewTitle.textContent = data.title;
      previewBody.textContent = data.body;

      previewImg.style.opacity = 1;
      previewTitle.style.opacity = 1;
      previewBody.style.opacity = 1;
    }, 150);
  }

  essCards.forEach(card => {
    const key = card.dataset.essence;

    card.addEventListener('mouseenter', () => setEssencePreview(key));
    card.addEventListener('mouseleave', hidePreview);

    card.addEventListener('click', () => setEssencePreview(key));
  });

  // Hide when scrolled offscreen
  window.addEventListener('scroll', () => {
    const rect = leySection.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      hidePreview();
    }
  });

});