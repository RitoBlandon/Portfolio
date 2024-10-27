// Déclaration de la classe Scrolly pour ajouter des animations aux éléments visibles au défilement.
export default class Scrolly {
  // Constructeur de la classe, initialisant l'élément DOM et les options par défaut.
  constructor(element) {
    // Référence à l'élément DOM racine contenant les éléments à observer.
    this.element = element;

    // Options de configuration pour l'observation d'intersection.
    this.options = {
      rootMargin: '-30px 0px', // Décalage par rapport au viewport pour déclencher l'intersection.
      repeat: 'true', // Indique si l'animation doit se répéter.
    };

    // Initialisation de l'observateur.
    this.init();
  }

  // Méthode d'initialisation pour configurer les options et observer les éléments.
  init() {
    // Applique les options en fonction des attributs de données.
    this.setOptions();

    // Création d'une instance d'IntersectionObserver avec la méthode watch pour observer les changements de visibilité.
    const observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );

    // Sélectionne tous les éléments avec l'attribut "data-scrolly".
    const items = this.element.querySelectorAll('[data-scrolly]');

    // Boucle pour observer chaque élément trouvé.
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item);
    }
  }

  // Méthode pour définir les options en fonction des attributs de données.
  setOptions() {
    // Si l'attribut "noRepeat" est présent, l'animation ne se répétera pas.
    if ('noRepeat' in this.element.dataset) {
      this.options.repeat = false;
    }
  }

  // Méthode de rappel pour l'IntersectionObserver, déclenchée lorsque la visibilité des éléments change.
  watch(entries, observer) {
    // Boucle sur chaque entrée d'intersection pour mettre à jour son état actif.
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      // Si l'élément est visible dans le viewport, ajoute la classe "is-active".
      if (entry.isIntersecting) {
        target.classList.add('is-active');
        console.log(this.element.dataset);

        // Si l'option repeat est désactivée, arrête d'observer cet élément.
        if (!this.options.repeat) {
          observer.unobserve(target);
        }
      } else {
        // Retire la classe "is-active" si l'élément n'est plus visible.
        target.classList.remove('is-active');
      }
    }
  }
}
