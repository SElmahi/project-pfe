import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private baseUrl = '/api/home';

  constructor(private http: HttpClient) {}

  // ...

  updateHome(id: number, home: any) {
    return this.http.put(`${this.baseUrl}/${id}`, home);
  }
}