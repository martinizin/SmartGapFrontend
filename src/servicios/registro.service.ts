import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8000/api/v1/register';

  constructor(private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl, usuario, { headers }).pipe(
      catchError((error) => {
        console.error('Error en el registro:', error);
        return throwError(error);
      })
    );
  }
  
}
