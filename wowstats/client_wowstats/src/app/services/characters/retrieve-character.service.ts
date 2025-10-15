import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RetrieveCharacterService {
  private apiUrl = 'http://localhost:3000/api/characters'
  private chars = 'characters'

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('/api/characters', {withCredentials: true}).pipe(
      tap({ // tap used for logging, still able to mutate objects
        error: err => {
          console.log("ERROR IN GET CHARACTERS: ", err);
          if(err.status === 401) {
            this.authService.logout();
          }
        } 
      })
    );
  } 

  createCharacter(chara: Character): Observable<string> {
    return this.http.post<string>('/api/characters', chara, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).pipe(
      tap({
        next: (data) => {
          console.log("TOken or usome ", data);
        },
        error: (err) => {
          if(err.status === 401) {
            this.authService.logout();
          }
        }
      })
    );
  }

  deleteCharacters(): Observable<any> {
    return this.http.delete<any>(this.apiUrl).pipe(
      tap({
        next: data => {
          if(data) {
            console.log("reicieved: ", data);
          }
        },
        error: err => {
          console.log("Error in deleteCharacters: ", err);
          if(err.status === 401) {
            this.authService.logout();
          }
          console.log(err);
        }
      })
    );
  }
}
