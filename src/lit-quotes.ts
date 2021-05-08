import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import LitBase from './lit-base'

class Quote {
  quote: string = '';
  author: string = '';
  rate: number = 0;
}

/* ----------------- Quote Component ------------- */
@customElement('lit-quote')
export class LitQuote extends LitBase {
 
  @property({type: Object}) 
  quote: Quote = new Quote();
  
  render() {
    return html`
      <div class="card shadow rounded m-5">
        <div class="card-header text-warning bg-dark">
          <p>${this.quote.author}</p>
        </div> 
        <div class="card-body">
          <p>
            ${this.quote.quote}
            <span class="badge rounded-pill bg-info text-dark">${this.quote.rate}</span>           
          </p>          
        </div>       
      </div>
    `
  }
}

/* ----------------- Quotes Container ------------- */
@customElement('lit-quotes-container')
export class LitQuotesContainer extends LitBase {
   
  private url =   "https://fakerapi.amcc.repl.co/quotes/"
  
  @property({type: Array}) 
  data: Quote[] = [];
 
  // called when component mounted
  async connectedCallback() {
    super.connectedCallback()  
    await this._load();
  }

  // render the view
  render() {
    return html`
      <h3>Quotes</h3>
      ${this.data.map(e => html`<lit-quote .quote=${e}></lit-quote>`)}
    `;
  }
  // load data from api 
  private async _load() {
    const resp = await fetch(this.url);
    const json = await resp.json();
    this.data = json;
    console.log(this.data);
  }
}


/* ----------------- Random Quote Component ------------- */
@customElement('lit-random-quote')
export class LitRandomQuote extends LitBase {
  private  url = "https://fakerapi.amcc.repl.co/quotes/"         
  
  @property({type: Object})     
  quote: Quote = new Quote();

  @property({type: Boolean})    
  loading: boolean = false;         
     
  connectedCallback() {
      super.connectedCallback()    
      this._loadQuotes()
  }

  async _loadQuotes() {
      this.loading = true
      const resp = await fetch(this.url);
      // add artificial 1s delay
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000))
      
      const json = await resp.json();
      // select random quote
      this.quote = json[ Math.floor(Math.random() * json.length) ]
      this.loading = false         
  }

  render() {
      return html`       
          <div class="m-4 p-3 shadow bg-light rounded"> 
              <div>
                  <lit-quote .quote="${this.quote}"></lit-quote>                 
                  <button class="btn btn-warning" @click="${() => this._loadQuotes()}">Generate</button>
              </div>
              <lit-loader ?loading="${this.loading}"></lit-loader>              
          </div>          
          `    
  }
}


