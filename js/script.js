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



});
