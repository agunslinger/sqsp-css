(function () {
  const sectionSelector = 'section[data-section-id="6a8744d3ad86aa4913bebc56"]';

  const partnerLinks = [
    "https://life-brainhealth.org/",
    "https://www.upike.edu/",
    "https://www.marshall.edu/",
    "https://med.uc.edu/institutes/development/center-for-alzheimers-and-neurodegenerative-diseases-research",
	"https://www.uchealth.com/en/cancer-center",
    "https://www.kroger.com/"
  ];

  function makePartnerCardsClickable() {
    const section = document.querySelector(sectionSelector);

    if (!section) {
      return false;
    }

    const cards = section.querySelectorAll(
      "ul.user-items-list-item-container.user-items-list-simple > li.list-item"
    );

    if (!cards.length) {
      return false;
    }

    cards.forEach(function (card, index) {
      const url = partnerLinks[index];

      if (!url) {
        return;
      }

      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.style.cursor = "pointer";

      if (card.dataset.partnerLinkReady === "true") {
        return;
      }

      card.dataset.partnerLinkReady = "true";

      card.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          return;
        }

        window.open(url, "_blank", "noopener");
      });

      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.open(url, "_blank", "noopener");
        }
      });
    });

    return true;
  }

  function initializePartnerCards() {
    if (makePartnerCardsClickable()) {
      return;
    }

    const observer = new MutationObserver(function () {
      if (makePartnerCardsClickable()) {
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setTimeout(function () {
      observer.disconnect();
    }, 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializePartnerCards
    );
  } else {
    initializePartnerCards();
  }

  window.addEventListener(
    "load",
    initializePartnerCards
  );
})();