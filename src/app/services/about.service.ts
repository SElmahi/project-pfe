import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AboutService {
    about:any
    constructor(private httpClient: HttpClient) { }

    getAboutPage(){
        return this.about
    }
    setAboutPage(content:any){
        this.about=content
    }
    
}