(function () {
  const blockSelector =
    "#block-73692b27afa2e31d76c8";

  function initializeStudyAboutToggle() {
    const block =
      document.querySelector(blockSelector);

    if (!block) {
      return false;
    }

    const textContainer =
      block.querySelector(".sqs-html-content");

    if (!textContainer) {
      return false;
    }

    const paragraphs =
      Array.from(
        textContainer.querySelectorAll("p")
      );

    const paragraph =
      paragraphs.find(function (item) {
        return item.textContent.trim().length > 100;
      }) ||
      paragraphs[0];

    if (!paragraph) {
      return false;
    }

    paragraph.classList.add(
      "life-study-about-paragraph"
    );

    let button =
      block.querySelector(
        ".life-study-about-toggle"
      );

    if (!button) {
      button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "life-study-about-toggle";

      paragraph.insertAdjacentElement(
        "afterend",
        button
      );
    }

    function updateButton() {
      const expanded =
        paragraph.classList.contains(
          "is-expanded"
        );

      button.textContent =
        expanded ? "Less" : "More";

      button.setAttribute(
        "aria-expanded",
        String(expanded)
      );
    }

    if (
      button.dataset.lifeToggleReady !== "true"
    ) {
      button.dataset.lifeToggleReady = "true";

      button.addEventListener(
        "click",
        function () {
          paragraph.classList.toggle(
            "is-expanded"
          );

          updateButton();
        }
      );
    }

    if (window.innerWidth < 768) {
      paragraph.classList.remove(
        "is-expanded"
      );
    }

    updateButton();

    return true;
  }

  function startStudyAboutToggle() {
    if (initializeStudyAboutToggle()) {
      return;
    }

    const observer =
      new MutationObserver(function () {
        if (initializeStudyAboutToggle()) {
          observer.disconnect();
        }
      });

    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );

    window.setTimeout(function () {
      observer.disconnect();
    }, 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startStudyAboutToggle
    );
  } else {
    startStudyAboutToggle();
  }

  window.addEventListener(
    "load",
    startStudyAboutToggle
  );
})();
