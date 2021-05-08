import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import LitBase from './lit-base'

// --------------------- NewsArticle -----------------------//
class NewsArticle {
    source: { id: string, name: string } = { id: '', name: '' }
    author: string = ''
    title: string = ''
    description: string = ''
    url: string = ''
    urlToImage: string = ''
    publishedAt: Date = new Date()
    content: string = ''
}

//---------------- News Article Component ----------------//
@customElement("lit-news-article")
export class NewsArticleComponent extends LitBase {

    @property({ type: Object })
    article: NewsArticle = new NewsArticle()

    render() {
        return html`
            <div class="card shadow-lg m-2 rounded" style="width: 20rem;">
                <img src=${this.article.urlToImage} class="card-img-top" >
                <div class="card-body">
                    <h5 class="card-title">${this.article.title}</h5>                
                    <p class="card-text">${this.article.content}</p>
                    <a href=${this.article.url} class="btn btn-primary">More Details</a>
                </div>
            </div>
        `
    }
}

//---------------- News Articles Container ----------------//
@customElement("lit-news-articles")
export class NewsArticleListComponent extends LitBase {

    private url = 'https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=a3f6504d015e4ea1aa06b2699144b925&language=en&q='

    @state()
    query: string = ''

    @state()
    articles: NewsArticle[] = []

    @state()
    loading: boolean = false;
   
    // called when component mounted - place any async actions here
    // async connectedCallback() {
    //     super.connectedCallback() 
    // }

    render() {
        return html`
            <h3>News Articles On: ${this.query}</h3> 
            
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="search.."
                    value=${this.query} @input="${ this._updateQuery }">                       
                <button class="btn btn-primary" type="submit" @click="${ this._load }">Search</button>
            </form>

            <lit-loader ?loading="${this.loading}"></lit-loader> 
            <div class="d-flex flex-wrap">
                ${this.articles.map(a =>
                    html`<lit-news-article .article=${a}></lit-news-article>`
                )}
            </div>
        `
    }

    private _updateQuery(e: any) {
        this.query = e.target.value
    }

    // load data from api 
    private async _load(e: HTMLFormElement) {
        e.preventDefault();
        this.loading = true;
        //console.log(`${this.url}&${this.query}`)
        const resp = await fetch(`${this.url}${this.query}`);
        const json = await resp.json();
        this.articles = json.articles;
        this.loading = false;
        console.log(this.articles);
    }

}
