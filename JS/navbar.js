fetch("navbar.html")
  .then((response) => response.text())
  .then((navbar) => {
    const container = document.querySelector("[data-navbar]");

    if (!container) {
      return;
    }

    container.innerHTML = navbar;
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const currentLink = container.querySelector(`[data-page="${currentPage}"]`);

    if (currentLink) {
      currentLink.setAttribute("aria-current", "page");
    }
  });