import { action, computed, makeAutoObservable, observable } from "mobx"

//---------------------- class syntax ----------------------- //
class Counter {
    
    private _count:number;

    constructor() {       
        this._count = 0
        makeAutoObservable(this) // mobx magic
    }
 
    public increment() {
        this._count = this.count + 1
        //console.log("increment", this.count)
    }

    public decrement() {
        this._count = this._count - 1    
        //console.log("decrement", this._count)
    }

    public reset() {
        this._count = 0
        //console.log("reset", this._count)
    }

    public get count() { return this._count }


}
// ----------------------- decorator syntax   --------------------------- //
class Store {     
    @observable
    private _count = 0;
    
    @action
    public increment() {
        this._count = this.count + 1;
        //console.log("store increment", this.count)
    }

    @action
    public decrement() {
        this._count = this.count - 1;       
        //console.log("store decrement", this.count)
    }

    @action
    public reset() {
        this._count = 0;
        //console.log("store reset", this.count)
    }

    @computed
    public get count(): number {         
        return this._count 
    }

}

export const store = new Store();
export const counter = new Counter();


