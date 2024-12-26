document.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

class Modal {
  constructor(id) {
    this.id = id;
    this.window = document.getElementById(id);
    this.modal = this.window.querySelector(".modal");
    this.closeBtn = this.window.querySelector(".modal-close");
    this.form = this.window.querySelector("form");
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  open() {
    this.window.classList.add("opened");
    this.window.addEventListener("click", (e) => this._handleClick(e));
    this.closeBtn?.addEventListener("click", () => this.close());
    this.form?.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    document.addEventListener("keydown", this._handleKeydown);

    this.window.closest(".wrap-modals-all").classList.add("opened");
  }

  close() {
    this.window.removeEventListener("click", (e) => this._handleClick(e));
    this.closeBtn?.removeEventListener("click", () => this.close());
    document.removeEventListener("keydown", this._handleKeydown);
    this.window.classList.remove("opened");

    this.window.closest(".wrap-modals-all").classList.remove("opened");
  }

  _handleClick(e) {
    if (e.target === this.window || e.target.matches(".modal-link")) {
      this.close();
    }
  }

  _handleKeydown(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
}

(function () {
  const modalButtons = document.querySelectorAll("[data-modal-id]");

  modalButtons.forEach((btn) => {
    if (btn) {
      const id = btn.dataset.modalId;
      const modal = new Modal(id);
      btn.addEventListener("click", () => modal.open());
    }
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const menuOverlay = document.querySelector(".menu-overlay");
  const burger = document.querySelector(".burger");
  const headerMenu = document.querySelector(".header__menu");
  const menuLinks = document.querySelectorAll(".menu__link");

  // Функция для открытия/закрытия меню
  burger.addEventListener("click", function () {
    this.classList.toggle("active");
    headerMenu.classList.toggle("active");

    if (this.classList.contains("active")) {
      document.body.style.overflowY = "hidden";
      menuOverlay.classList.add("visible");
    } else {
      document.body.style.overflowY = "visible";
      menuOverlay.classList.remove("visible");
    }
  });

  // Закрытие меню при клике на ссылки или кнопки
  menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Закрытие меню при клике вне меню
  menuOverlay.addEventListener("click", function (e) {
    if (!e.target.closest(".header__menu")) {
      closeMenu();
    }
  });

  // Функция для закрытия меню
  function closeMenu() {
    burger.classList.remove("active");
    headerMenu.classList.remove("active");
    document.body.style.overflowY = "auto";
    menuOverlay.classList.remove("visible");
  }
});
