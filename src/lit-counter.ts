import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import { MobxReactionUpdate } from '@adobe/lit-mobx'
import { counter } from './store'

// ----------------- Example counter using MobX store --------------
@customElement('lit-counter')
export class LitCounter extends MobxReactionUpdate(LitElement) {
   
    static styles =
        css`
            :host {
                padding: 0;
                margin: 0;    
                font-family: Arial Black;
                font-size: 20px;
            }
            button {
                padding: 5px 15px 5px 15px;
                background-color: coral;
                color: black;
                border: none;
                border-radius: 12px;
                margin: 5px;
                font-size: 1em;
                cursor:pointer;
            }
            button:disabled,
            button[disabled]{
                border: 1px solid #999999;
                background-color: #cccccc;
                color: #666666;
                cursor: default;
            }
            p {
                padding: 0 20px 0 20px;
                background-color: #ede6d3;
                margin-left: 20px;
                margin-right: 20px;
                font-size: 1em
            }
            .row {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    
    private decDisabled() {
        return counter.count == 0 
    }
    private incDisabled() {
        return counter.count == 10
    }

    render() {
        return html`
            <div class="row">
                <h2>Lit MobX Counter Demo</h2>
            </div>
            <div class="row"> 
                <button @click=${() => counter.increment()} 
                        ?disabled=${this.incDisabled()}>
                        +
                </button>               
                <p>${counter.count}</p>               
                <button @click=${() => counter.decrement() } 
                        ?disabled=${this.decDisabled()}>
                        -
                </button> 
                <button @click=${() => counter.reset() } 
                        ?disabled=${this.decDisabled()}>
                        Reset
                </button>    
            </div>
            `;
    }

}
