!function(){"use strict";class t{constructor(t){this.element=t,this.options={threshold:.2,autoHide:!1},this.scrollPosition=0,this.lastScrollPosition=0,this.html=document.documentElement,this.init(),this.initNavMobile()}init(){this.setOptions(),window.addEventListener("scroll",this.onScroll.bind(this))}setOptions(){"threshold"in this.element.dataset&&(this.options.threshold=parseFloat(this.element.dataset.threshold)),"autoHide"in this.element.dataset&&(this.options.autoHide=!0)}onScroll(){this.lastScrollPosition=this.scrollPosition,this.scrollPosition=document.scrollingElement.scrollTop,this.setHeaderState(),this.setDirections()}setHeaderState(){this.scrollPosition>document.scrollingElement.scrollHeight*this.options.threshold?(this.html.classList.add("header-is-hidden"),1==this.options.autoHide&&(console.log("allo"),this.html.classList.remove("header-is-hidden"))):this.html.classList.remove("header-is-hidden")}setDirections(){this.scrollPosition>=this.lastScrollPosition?(this.html.classList.add("is-scrolling-down"),this.html.classList.remove("is-scrolling-up")):(this.html.classList.remove("is-scrolling-down"),this.html.classList.add("is-scrolling-up"))}initNavMobile(){this.element.querySelector(".js-toggle").addEventListener("click",this.onToggleNav.bind(this))}onToggleNav(t){this.html.classList.toggle("nav-is-active")}}class s{constructor(t){this.element=t,this.formElements=this.element.elements,this.html=document.documentElement,this.init()}init(){this.element.setAttribute("novalidate","");for(let t=0;t<this.formElements.length;t++){const s=this.formElements[t];s.required&&s.addEventListener("input",this.validateInput.bind(this))}this.element.addEventListener("submit",this.onSubmit.bind(this))}onSubmit(t){t.preventDefault(),console.log("submit"),this.validate()?(console.log("sucess"),this.showConfirmation()):console.log("fail")}validate(){console.log("validate");let t=!0;for(let s=0;s<this.formElements.length;s++){const e=this.formElements[s];e.required&&!this.validateInput(e)&&(t=!1)}return t}validateInput(t){const s=t.currentTarget||t;return s.validity.valid?this.removeError(s):this.addError(s),s.validity.valid}addError(t){(t.closest("[data-input-container]")||t.closest(".input")).classList.add("error")}removeError(t){console.log("yo"),(t.closest("[data-input-container]")||t.closest(".input")).classList.remove("error")}showConfirmation(){this.element.classList.add("is-sent")}}class e{constructor(){this.componentInstances=[],this.componentList={Header:t,Form:s},this.init()}init(){const t=document.querySelectorAll("[data-component]");for(let s=0;s<t.length;s++){const e=t[s],i=e.dataset.component;if(this.componentList[i]){const t=new this.componentList[i](e);this.componentInstances.push(t)}else console.log(`La composante ${i} n'existe pas`)}}}class i{static load(t){t=t||"assets/icons.svg",fetch(t).then((t=>{if(t.ok)return t.text();throw new Error("Le fichier icons est introuvable.")})).then((t=>{const s=document.createElement("div");s.style.display="none",s.innerHTML=t,document.body.appendChild(s)})).catch((t=>{console.log(`Une erreur est survenur : ${t.message}`)}))}}new class{constructor(){this.init()}init(){document.documentElement.classList.add("has-js"),new e,i.load()}}}();