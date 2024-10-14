export default class Modale {
  constructor() {
    this.images = document.querySelectorAll('[data-component="Modale"]'); // Récupérer toutes les images
    this.overlay = this.createOverlay(); // Créer l'overlay
    document.body.appendChild(this.overlay); // Ajoute l'overlay au DOM
    this.bindEvents();
  }

  createOverlay() {
    const overlay = document.createElement('div'); // Créer l'overlay
    overlay.classList.add('modale-overlay');
    overlay.innerHTML = `
      <div class="modale-content">
        <button class="modale-close" aria-label="Fermer la modale">&times;</button>
        <img src="" alt="Image de la modale" />
      </div>
    `;

    // Fermer la modale quand on clique sur l'overlay ou sur le bouton "X"
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('modale-close')) {
        this.closeModale();
      }
    });

    return overlay; // Retourne l'élément overlay pour l'utilisation dans le constructeur
  }

  bindEvents() {
    this.images.forEach((img) => {
      img.addEventListener('click', () => this.openModale(img.src, img.alt));
    });
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  openModale(imgSrc, imgAlt) {
    const imgElement = this.overlay.querySelector('img');
    imgElement.src = imgSrc; // Met à jour la source de l'image
    imgElement.alt = imgAlt; // Met à jour l'attribut alt

    this.overlay.classList.add('is-visible'); // Affiche la modale
    document.documentElement.classList.add('modale-is-active'); // Ajoute une classe au document
  }

  closeModale() {
    this.overlay.classList.remove('is-visible'); // Cache la modale
    document.documentElement.classList.remove('modale-is-active'); // Enlève la classe du document
  }

  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.closeModale(); // Ferme la modale avec la touche Échap
    }
  }
}

// Instancier la modale après que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  new Modale();
});
