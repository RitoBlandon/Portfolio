// Déclaration de la classe Header pour gérer l'affichage et les interactions de l'en-tête lors du défilement.
export default class Header {
  // Constructeur de la classe, initialisant l'élément DOM et les options par défaut.
  constructor(element) {
    // Référence à l'élément DOM racine de l'en-tête.
    this.element = element;

    // Options de configuration pour le comportement de l'en-tête.
    this.options = {
      threshold: 0.2, // Seuil pour déclencher les changements d'affichage.
      autoHide: false, // Indique si l'en-tête doit se cacher automatiquement.
    };

    // Position de défilement actuelle et précédente.
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;

    // Référence à l'élément HTML racine du document.
    this.html = document.documentElement;

    // Initialisation du comportement de l'en-tête.
    this.init();

    // Initialisation de la navigation mobile.
    this.initNavMobile();
  }

  // Méthode d'initialisation pour configurer les options et ajouter l'écouteur de défilement.
  init() {
    // Applique les options basées sur les attributs de données.
    this.setOptions();

    // Ajoute un écouteur d'événement de défilement pour gérer l'affichage de l'en-tête.
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  // Méthode pour configurer les options en fonction des attributs de l'élément DOM.
  setOptions() {
    // Si un attribut "threshold" est défini, il met à jour le seuil de défilement.
    if ('threshold' in this.element.dataset) {
      this.options.threshold = parseFloat(this.element.dataset.threshold);
    }

    // Si un attribut "autoHide" est présent, active la fonction de masquage automatique de l'en-tête.
    if ('autoHide' in this.element.dataset) {
      this.options.autoHide = true;
    }
  }

  // Méthode déclenchée lors du défilement pour mettre à jour les états de l'en-tête et les directions.
  onScroll() {
    // Stocke la position précédente et actuelle de défilement.
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    // Met à jour l'état d'affichage de l'en-tête.
    this.setHeaderState();

    // Met à jour les classes de direction du défilement.
    this.setDirections();
  }

  // Méthode pour gérer l'affichage de l'en-tête selon la position de défilement et le seuil défini.
  setHeaderState() {
    if (
      this.scrollPosition >
      document.scrollingElement.scrollHeight * this.options.threshold
    ) {
      // Ajoute la classe pour masquer l'en-tête si le seuil est dépassé.
      this.html.classList.add('header-is-hidden');

      // Si l'option autoHide est active, l'en-tête reste visible malgré la condition.
      if (this.options.autoHide == true) {
        console.log('allo');
        this.html.classList.remove('header-is-hidden');
      }
    } else {
      // Supprime la classe pour afficher l'en-tête si le seuil n'est pas atteint.
      this.html.classList.remove('header-is-hidden');
    }
  }

  // Méthode pour définir la direction de défilement et mettre à jour les classes correspondantes.
  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      // Défilement vers le bas.
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      // Défilement vers le haut.
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  // Méthode pour initialiser la navigation mobile et ajouter un écouteur pour le bouton de navigation.
  initNavMobile() {
    // Sélectionne le bouton de basculement de la navigation mobile.
    const toggle = this.element.querySelector('.js-toggle');

    // Ajoute un écouteur d'événement de clic pour gérer l'affichage de la navigation mobile.
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  // Méthode pour basculer l'affichage de la navigation mobile lors du clic sur le bouton.
  onToggleNav(evt) {
    this.html.classList.toggle('nav-is-active');
  }
}
