// Déclaration de la classe Youtube pour gérer l'intégration de vidéos YouTube avec des options personnalisées.
export default class Youtube {
  // Constructeur de la classe, initialisant l'élément DOM, les options de lecture vidéo et d'autres paramètres.
  constructor(element) {
    // Référence à l'élément DOM racine contenant la vidéo YouTube.
    this.element = element;

    // Conteneur de la vidéo et de l'image d'affiche (poster).
    this.videoContainer = this.element.querySelector('.js-youtube');
    this.poster = this.element.querySelector('.js-poster');

    // ID de la vidéo YouTube obtenu depuis l'attribut de données.
    this.videoId = this.element.dataset.videoId;

    // Détermine si la vidéo doit se lire automatiquement en fonction de l'existence d'un poster.
    this.autoplay = this.poster ? 1 : 0;

    // Indicateur de préparation du lecteur.
    this.playerReady = false;

    // Options de configuration pour les paramètres de lecture de la vidéo.
    this.options = {
      noControls: 1, // Cache les contrôles par défaut.
      rel: 1, // Autorise les vidéos suggérées à la fin.
    };

    // Ajoute l'instance actuelle à la liste des instances Youtube.
    Youtube.instances.push(this);

    // Si un ID vidéo est spécifié, charge le script YouTube.
    if (this.videoId) {
      Youtube.loadScript();
    } else {
      console.log('Vous devez spécifier un id');
    }
  }

  // Méthode statique pour charger le script YouTube uniquement si ce n'est pas déjà fait.
  static loadScript() {
    if (!Youtube.scriptIsLoading) {
      Youtube.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  // Méthode d'initialisation pour configurer les options et le lecteur vidéo.
  init() {
    // Applique les options configurées via les attributs de données.
    this.setOptions();

    // Bind la méthode initPlayer pour l'utiliser comme rappel (callback) de l'événement.
    this.initPlayer = this.initPlayer.bind(this);

    // Si un poster est défini, configure un clic pour démarrer le lecteur.
    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer.bind(this));
    } else {
      // Si aucun poster n'est présent, initialise directement le lecteur.
      thi.initPlayer();
    }
  }

  // Méthode pour définir les options de lecteur vidéo en fonction des attributs de données.
  setOptions() {
    // Si l'attribut "noControls" est présent, les contrôles vidéo sont activés.
    if ('noControls' in this.element.dataset) {
      this.options.noControls = 0;
    }

    // Si l'attribut "rel" est présent, les vidéos suggérées sont désactivées.
    if ('rel' in this.element.dataset) {
      this.options.rel = 0;
    }
  }

  // Méthode pour initialiser le lecteur YouTube et configurer ses options et événements.
  initPlayer(event) {
    // Si l'initiation est déclenchée par un clic, supprime cet écouteur d'événement.
    if (event) {
      this.element.removeEventListener('click', this.initPlayer);
    }

    // Création d'un nouvel objet lecteur YouTube dans le conteneur vidéo.
    this.player = new YT.Player(this.videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: {
        rel: this.options.rel,
        controls: this.options.noControls,
        autoplay: this.autoplay,
      },
      events: {
        onReady: () => {
          // Lorsque le lecteur est prêt, définit playerReady sur true.
          this.playerReady = true;

          // Initialise un observateur d'intersection pour détecter si la vidéo est visible.
          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (event) => {
          // Si la vidéo est en lecture, met en pause toutes les autres instances.
          if (event.data == YT.PlayerState.PLAYING) {
            Youtube.pauseAll(this);
          }
          // Si la vidéo est terminée, revient au début et la met en pause.
          else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  // Méthode de rappel de l'IntersectionObserver pour mettre en pause la vidéo lorsque l'élément quitte le viewport.
  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  // Méthode statique pour initialiser toutes les instances de Youtube.
  static initAll() {
    document.documentElement.classList.add('is-video-ready');
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      instance.init();
    }
  }

  // Méthode statique pour mettre en pause toutes les vidéos, sauf celle actuellement active.
  static pauseAll(currentInstance) {
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

// Initialise un tableau statique pour contenir toutes les instances de Youtube.
Youtube.instances = [];

// Définition de la fonction globale appelée automatiquement lorsque l'API YouTube est prête.
window.onYouTubeIframeAPIReady = Youtube.initAll;
