import {LitElement} from 'lit';

// remove shadow dom and add mobx state management
export default class LitBase extends LitElement {
    createRenderRoot() { return this }
  }