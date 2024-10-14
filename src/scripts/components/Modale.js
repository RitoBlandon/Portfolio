document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('[data-component="Modale"]');
  const overlay = document.querySelector('.modale-overlay');
  const imgElement = overlay.querySelector('.modale-image');
  const closeButton = overlay.querySelector('.modale-close');

  images.forEach((img) => {
    img.addEventListener('click', function () {
      imgElement.src = this.src; // Met à jour la source de l'image
      overlay.classList.add('is-visible'); // Affiche la modale
    });
  });

  closeButton.addEventListener('click', () => {
    overlay.classList.remove('is-visible'); // Cache la modale
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('is-visible'); // Cache la modale si on clique sur l'overlay
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('is-visible'); // Ferme la modale avec la touche Échap
    }
  });
});
