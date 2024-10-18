document.addEventListener('DOMContentLoaded', () => {
  // Gestion pour les images dans le swiper intégration
  const imagesIntegration = document.querySelectorAll(
    '[data-component="ModaleIntegration"]'
  );
  const overlayIntegration = document.querySelector(
    '.modale-content.integration'
  );
  const imgElementIntegration =
    overlayIntegration.querySelector('.modale-image');
  const closeButtonIntegration =
    overlayIntegration.querySelector('.modale-close');

  if (overlayIntegration && imgElementIntegration && closeButtonIntegration) {
    imagesIntegration.forEach((img) => {
      img.addEventListener('click', function () {
        imgElementIntegration.src = this.src; // Met à jour la source de l'image
        overlayIntegration.classList.add('is-visible'); // Affiche la modale
      });
    });

    closeButtonIntegration.addEventListener('click', () => {
      overlayIntegration.classList.remove('is-visible'); // Cache la modale
    });

    overlayIntegration.addEventListener('click', (e) => {
      if (e.target === overlayIntegration) {
        overlayIntegration.classList.remove('is-visible'); // Cache la modale si on clique sur l'overlay
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlayIntegration.classList.remove('is-visible'); // Ferme la modale avec la touche Échap
      }
    });
  }

  // Gestion pour les images dans le swiper code
  const imagesCode = document.querySelectorAll('[data-component="ModaleCode"]');
  const overlayCode = document.querySelector('.modale-content.code');
  const imgElementCode = overlayCode.querySelector('.modale-image');
  const closeButtonCode = overlayCode.querySelector('.modale-close');

  if (overlayCode && imgElementCode && closeButtonCode) {
    imagesCode.forEach((img) => {
      img.addEventListener('click', function () {
        imgElementCode.src = this.src; // Met à jour la source de l'image
        overlayCode.classList.add('is-visible'); // Affiche la modale
      });
    });

    closeButtonCode.addEventListener('click', () => {
      overlayCode.classList.remove('is-visible'); // Cache la modale
    });

    overlayCode.addEventListener('click', (e) => {
      if (e.target === overlayCode) {
        overlayCode.classList.remove('is-visible'); // Cache la modale si on clique sur l'overlay
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlayCode.classList.remove('is-visible'); // Ferme la modale avec la touche Échap
      }
    });
  }
});
