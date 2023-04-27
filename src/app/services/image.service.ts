import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/images'; 

  constructor(private http: HttpClient) { }
   getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  uploadImage(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<Image>(this.apiUrl, formData);
  }

  deleteImage(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete(url);
  }

  updateImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url, formData);
  }
}
