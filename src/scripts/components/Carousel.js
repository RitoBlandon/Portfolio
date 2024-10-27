// Importation de la bibliothèque Swiper pour créer un carrousel.
import Swiper from 'swiper/bundle';

// Déclaration de la classe Carousel pour encapsuler la logique du carrousel.
export default class Carousel {
  // Constructeur de la classe, initialisant les éléments nécessaires.
  constructor(element) {
    // L'élément DOM où le carrousel sera monté.
    this.element = element;

    // Options de configuration pour le carrousel, incluant les options d'espacement et de pagination.
    this.options = {
      spaceBetween: 20, // Espace entre les diapositives du carrousel.
      pagination: {
        el: '.swiper-pagination', // Sélecteur pour l'élément de pagination.
      },
      navigation: {
        // Sélecteurs pour les boutons de navigation (précédent et suivant).
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };

    // Appel de la méthode init pour initialiser le carrousel.
    this.init();
  }

  // Méthode d'initialisation du carrousel.
  init() {
    // Définition des options additionnelles avant l'initialisation.
    this.setOptions();

    // Création d'une nouvelle instance de Swiper avec les options spécifiées.
    var swiper = new Swiper(this.element, this.options);
  }

  // Méthode pour ajuster les options du carrousel en fonction des attributs de l'élément DOM.
  setOptions() {
    // Si l'attribut "split" est défini dans les datasets de l'élément, ajout de points de rupture.
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        1440: { slidesPerView: 3 }, // 3 diapositives visibles pour des écrans larges.
        768: { slidesPerView: 2 }, // 2 diapositives visibles pour les écrans moyens.
        375: { slidesPerView: 1 }, // 1 diapositive visible pour les petits écrans.
      };
    }

    // Si l'attribut "autoplay" est présent, activation du défilement automatique des diapositives.
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 5000, // Délai entre chaque diapositive.
        pauseOnMouseEnter: true, // Pause lors du survol de la souris.
        disableOnInteraction: true, // Désactivation automatique après une interaction utilisateur.
      };
    }

    // Si l'attribut "loop" est défini, le carrousel défile en boucle.
    if ('loop' in this.element.dataset) {
      this.options.loop = {
        loop: true, // Activation de la boucle.
      };
    }

    // Si un nombre spécifique de diapositives est défini, il est appliqué.
    if ('slides' in this.element.dataset) {
      this.options.slidesPerView =
        this.element.dataset.slides || this.options.slidesPerView;
    }
  }
}
