import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PicType } from './pics.model';

@Injectable({
  providedIn: 'root'
})
export class PicOfDayService {

  private apiUrl: string = 'https://api.nasa.gov/planetary/apod';
  private key: string = 'DEMO_KEY';

  constructor(private http: HttpClient) { }

  findPicsInRange(from: string, to: string): Observable<PicType[]> {
    const url = `${this.apiUrl}?start_date=${from}&end_date=${to}&api_key=${this.key}`;
    console.log(url);
    return this.http.get<PicType[]>(url);
  }
}
