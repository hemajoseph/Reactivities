import { makeAutoObservable } from "mobx";

//Going to track all user interface elements in our store 
export class UiStore {
    isLoading = false;

    constructor() {
        // Automatically make all properties observable
        makeAutoObservable(this);
    }

    isBusy() {
         this.isLoading = true;
    }   

    isIdle() {
        this.isLoading = false;
    }
    
}