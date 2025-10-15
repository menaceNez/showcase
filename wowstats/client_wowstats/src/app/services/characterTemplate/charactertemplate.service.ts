import { ElementRef, Injectable, QueryList } from '@angular/core';
import { CharacterTemplate } from '../../models/character-template';
import { Gearpiece } from '../../models/gearpiece';
import { GearServiceService } from '../gear/gear-service.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CharactertemplateService {
  apiUrl: string = 'http://localhost:3000';
  charTemplate: CharacterTemplate;

  constructor(private http: HttpClient, private gearService: GearServiceService, private authService: AuthService) {
     this.charTemplate = { // empty template
      head: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      neck: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      back: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      shoulders: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      waist: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      legs: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',

        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }
      },
      feet: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      hands: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',

        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }
      },
      wrist: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',

        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }
      },
      onehand: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',

        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }
      },
      offhand: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',

        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }
      },
      trinket: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }

      },
      finger: {
        name: '', itemID: 0, mediaID: 0, invintory_type: '', subclass_name: '', required_level: 0, quality: '', mediaLink: '',
        stats: {
          stamina: 0,
          strength: 0,
          intellect: 0,
          agility: 0,
          spirit: 0,
          armor: 0,
          dps: 0,
        }
      }
    };
   }

  getCharacterTemplate(charID: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/api/items/${charID}`, {withCredentials: true}).pipe(
      tap({
        error: error => {
          console.log("hit error on char template: ", error);
          if (error.status === 401) {
            this.authService.logout();
          }
        }
      })
    );
  }

  // return the specified gearslot filled with clicked gearpiece
  fillSlot(characterTemplate: CharacterTemplate, gearpiece: Gearpiece, gearslots: QueryList<ElementRef>): CharacterTemplate {
    let geartype = gearpiece.invintory_type.toLowerCase();
    let detError: boolean = false;
    gearslots.forEach((gearSlot) => {

      switch (geartype) {
        case 'one-hand':
          // fill one hand img 
          if (gearSlot.nativeElement.id === 'one-hand') {
            // console.log("setting onehand");
            characterTemplate.onehand = gearpiece;
          }
          break;
        case 'two-hand':
          if (gearSlot.nativeElement.id === 'one-hand') {
            // console.log("setting twohand");
            characterTemplate.onehand = gearpiece;
            characterTemplate.offhand = undefined; // if two hand dont display in offhand
          }
          break;
        case 'off hand':
          // console.log("setting off hand");
          if (gearSlot.nativeElement.id === 'offhand') {
            characterTemplate.offhand = gearpiece;
            // console.log("HIT", characterTemplate.offhand);
          }
          break;
        case 'head':
          // console.log("setting head");
          if (gearSlot.nativeElement.id === 'head') {
            characterTemplate.head = gearpiece;
          }
          break;
        case 'neck':
          // console.log("setting neck");
          if (gearSlot.nativeElement.id === 'neck') {
            characterTemplate.neck = gearpiece;
          }
          break;
        case 'back':
          // console.log("setting back");
          if (gearSlot.nativeElement.id === 'back') {
            characterTemplate.back = gearpiece;
          }
          break;
        case 'shoulder':
          // console.log("setting shoulder");
          if (gearSlot.nativeElement.id === 'shoulder') {
            characterTemplate.shoulders = gearpiece;
          }
          break;
        case 'chest':
          // console.log("setting chest");
          if (gearSlot.nativeElement.id === 'chest') {
            characterTemplate.chest = gearpiece;
          }
          break;
        case 'waist':
          // console.log("setting waist");
          if (gearSlot.nativeElement.id === 'waist') {
            characterTemplate.waist = gearpiece;
          }
          break;
        case 'legs':
          // console.log("setting legs");
          if (gearSlot.nativeElement.id === 'legs') {
            characterTemplate.legs = gearpiece;
          }
          break;
        case 'feet':
          // console.log("setting feet");
          if (gearSlot.nativeElement.id === 'feet') {
            characterTemplate.feet = gearpiece;
          }
          break;
        case 'hands':
          // console.log("setting hands");
          if (gearSlot.nativeElement.id === 'hands') {
            characterTemplate.hands = gearpiece;
          }
          break;
        case 'wrist':
          // console.log("setting wrist");
          if (gearSlot.nativeElement.id === 'wrist') {
            characterTemplate.wrist = gearpiece;
          }
          break;
        case 'trinket':
          // console.log("setting trinket");
          if (gearSlot.nativeElement.id === 'trinket') {
            characterTemplate.trinket = gearpiece;
          }
          break;
        case 'finger':
          // console.log("setting finger");
          if (gearSlot.nativeElement.id === 'finger') {
            characterTemplate.finger = gearpiece;
          }
          break;
        default:
          console.log("Nothing happened! Probably not suppored item type: ", geartype);
          detError = true;
          break;
      }
    })
    // console.log("returned Successfully: ", characterTemplate);

    return characterTemplate;
  }

}
