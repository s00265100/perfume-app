import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Perfume } from '../models/perfume.model';

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/perfumes';

  getPerfumes(): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(this.apiUrl);
    
  }
  getPerfumeById(id: string): Observable<Perfume> {
  return this.http.get<Perfume>(`${this.apiUrl}/${id}`);
}
}
