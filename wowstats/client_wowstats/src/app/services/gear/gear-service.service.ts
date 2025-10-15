import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Gearpiece } from '../../models/gearpiece';
import { Character } from '../../models/character';
import { CharacterTemplate } from '../../models/character-template';

@Injectable({
  providedIn: 'root'
})
export class GearServiceService {
  apiUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getGearpieces(userInput: string, userClass: string): Observable<Gearpiece[]> {
    // console.log(userInput, userClass);
    return this.http.get<Gearpiece[]>(this.apiUrl + 'api/items' + `?search=${userInput}&className=${userClass}`).pipe(
      tap({
        next: (res: Gearpiece[]) => {
        },
        error: (err) => {
          if (err.status === 401) {
            this.authService.logout();
          }
        }
      })
    );
  }

  putGearpiece(gearpiece: Gearpiece, charID?: String): Observable<any> {
    return this.http.put<any>(this.apiUrl + `api/items/${gearpiece.itemID}`, { charID: charID, gearpiece: gearpiece }).pipe(
      tap({
        next: (data) => {
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout();
          }
          console.log("Putgearpeice error: ", error);
        }
      })
    );
  }

  putStats(stats: Object, charID: string) {
    return this.http.put<any>(this.apiUrl + `api/items/${charID}/stats`, { statsObj: stats }).pipe(
      tap({
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout();
          }
        }
      })
    );
  }
}
