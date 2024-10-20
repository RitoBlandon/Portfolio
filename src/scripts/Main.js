import ComponentFactory from './ComponentFactory.js';
import Icons from './utils/Icons';

class Main {
  constructor() {
    this.init();
    var copy = document.querySelector('.logos-slide').cloneNode(true);
    document.querySelector('.logos').appendChild(copy);
  }

  init() {
    document.documentElement.classList.add('has-js');
    new ComponentFactory();
    Icons.load();
  }
}
new Main();
