import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private logo:any ;
  private imageUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}
  saveLogo(logo:any){
    this.logo=logo;
  }
  getLogo():any{
    return this.logo;
  }
}
