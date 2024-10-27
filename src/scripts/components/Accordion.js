// Déclaration de la classe Accordion pour gérer un groupe d'accordéons.
export default class Accordion {
  // Constructeur de la classe, prenant l'élément DOM racine du composant en paramètre.
  constructor(element) {
    // Stockage de l'élément racine et sélection de tous les éléments avec la classe "js-accordion".
    this.element = element;
    this.accordions = this.element.querySelectorAll('.js-accordion');

    // Options par défaut pour la gestion du comportement des accordéons.
    this.options = {
      notClosing: false, // Indique si un accordéon actif doit rester ouvert.
      autoOpen: false, // Indique si les accordéons s'ouvrent automatiquement.
    };

    // Référence à l'élément HTML racine du document.
    this.html = document.documentElement;

    // Appel de la méthode d'initialisation.
    this.init();
  }

  // Méthode d'initialisation du comportement des accordéons.
  init() {
    // Applique les options basées sur les attributs de données.
    this.setOptions();

    // Sélectionne tous les éléments accordéons avec l'attribut "data-auto-open".
    this.autoOpenAccordions = this.element.querySelectorAll('[data-auto-open]');

    // Boucle sur chaque accordéon pour ajouter un écouteur d'événement et activer ceux à ouvrir automatiquement.
    for (let i = 0; i < this.accordions.length; i++) {
      const element = this.accordions[i];
      element.addEventListener('click', this.onToggleAccordion.bind(this));

      // Si l'attribut "data-auto-open" est défini, ajoute la classe "is-active".
      if (element.dataset.autoOpen != undefined) {
        element.classList.add('is-active');
      }
    }
  }

  // Méthode pour configurer les options en fonction des attributs de l'élément DOM.
  setOptions() {
    // Si l'attribut "notClosing" est présent, empêche les accordéons de se fermer lorsqu'on en ouvre un autre.
    if ('notClosing' in this.element.dataset) {
      this.options.notClosing = true;
    }
  }

  // Méthode pour gérer l'ouverture et la fermeture des accordéons lorsqu'on en clique un.
  onToggleAccordion(event) {
    // Récupère l'accordéon sur lequel l'utilisateur a cliqué.
    const accordionCliquer = event.currentTarget;

    // Boucle sur chaque accordéon pour mettre à jour leur état actif.
    for (let i = 0; i < this.accordions.length; i++) {
      const accordion = this.accordions[i];

      // Vérifie si l'accordéon dans la boucle est celui qui a été cliqué.
      if (accordionCliquer == accordion) {
        // Active ou désactive la classe "is-active" pour cet accordéon.
        accordion.classList.toggle('is-active');
      } else if (
        !this.options.notClosing && // Si l'option notClosing n'est pas activée.
        accordion.classList.contains('is-active') && // Si l'accordéon est déjà actif.
        this.autoOpenAccordions.length <= 1 // S'il n'y a qu'un seul accordéon auto-ouvert.
      ) {
        // Ferme l'accordéon actif en retirant la classe "is-active".
        accordion.classList.remove('is-active');
      }
    }
  }
}
