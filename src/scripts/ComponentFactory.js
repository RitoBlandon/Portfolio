import Carousel from './components/Carousel';
import Header from './components/Header';
import Youtube from './components/Youtube';
import Form from './components/Form';
import Modale from './components/Modale';
import Scrolly from './components/Scrolly';
import Accordion from './components/Accordion';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Carousel,
      Header,
      Form,
      Youtube,
      Modale,
      Scrolly,
      Accordion,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
