export default class Lottie {
  constructor() {
    this.init();
  }

  init() {
    // Votre code pourrait commencer comme ceci
    // const animation = lottieWeb.loadAnimation({
    //   ..
    // });

    const animation = lottie.loadAnimation({
      container: document.getElementById('animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/dist/assets/lottie/boutonprojets.json',
    });
  }
}
