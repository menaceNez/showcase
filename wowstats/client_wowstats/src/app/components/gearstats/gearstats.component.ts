import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../models/character';
import { GearServiceService } from '../../services/gear/gear-service.service';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Gearpiece } from '../../models/gearpiece';
import { CharacterTemplate } from '../../models/character-template';
import { CharactertemplateService } from '../../services/characterTemplate/charactertemplate.service';

@Component({
  selector: 'app-gearstats',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gearstats.component.html',
  styleUrl: './gearstats.component.css'
})
export class GearstatsComponent implements OnInit {
  chara: Character;
  searchForm: FormGroup;
  gearpieces: Gearpiece[];
  piecesPerPage: number = 10;
  currentPage: number = 1;
  pages: number = 0;
  isHidden: boolean = true;
  charTemplate!: CharacterTemplate;
  test?: Gearpiece;

  statsObj = {
    stamina: 0,
    strength: 0,
    intellect: 0,
    agility: 0,
    spirit: 0,
    armor: 0,
    dps: 0,
  }
  prevStatsObj = {

    stamina: 0,
    strength: 0,
    intellect: 0,
    agility: 0,
    spirit: 0,
    armor: 0,
    dps: 0,
  }

  @ViewChildren('gearslot') gearslots!: QueryList<ElementRef>;
  // elementref gives direct access to dom elements with .nativeElement
  // query list is an array that is angular complient with directives like *ngFor *ngIf

  constructor(private router: Router, private gearService: GearServiceService, private fb: FormBuilder, private charTemplateService: CharactertemplateService, private cdRef: ChangeDetectorRef) {
    // retrieve data passed from previous navigate (our character that was clicked)
    this.chara = JSON.parse(this.router.getCurrentNavigation()?.extras.state?.['chara']);
    this.gearpieces = [];

    this.charTemplate = charTemplateService.charTemplate;

    this.searchForm = fb.group({
      gearSearchField: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.charTemplateService.getCharacterTemplate(this.chara._id).subscribe({
      next: (temp: any) => { // needs to be any type because the data backend object is slightly different
        console.log("This is tem before ststObj init: ", temp.stats);
        console.log("Before : ", this.charTemplate);
        if (temp.stats) {
          this.statsObj = temp.stats;
        }

        if (temp.template) {
          for (let tp in temp.template) {
            const itm = temp.template[tp as keyof CharacterTemplate];

            if (itm.gearpiece.mediaLink) {
              this.charTemplate[tp as keyof CharacterTemplate] = itm.gearpiece;
            }
          }
        }
        console.log("after: ", this.charTemplate);
        Object.entries(this.charTemplate).map( ([key,val]) => {
          console.log("KEY: ", key, " VAL: ", val);
        });

      }
    });

    this.loadGear('');
    this.calculateBonusStats();
  }

  navCharSelect() {
    this.router.navigate(['/characters']);
  }

  loadGear(userInput: string): void {
    this.isHidden = false;
    this.searchForm.get('gearSearchField')?.disable();

    this.gearService.getGearpieces(userInput, this.chara.class).subscribe({
      next: (resGearpieces) => {
        this.gearpieces = resGearpieces;
        this.pages = Math.ceil(this.gearpieces.length / this.piecesPerPage);

        this.isHidden = true;
        this.searchForm.get('gearSearchField')?.enable();
      }
    });
  }

  handleGearlist(gearpiece: Gearpiece): void { // click event on gear list item
    // need to subract current stats gearpiece from one about to be added.
    if (gearpiece.invintory_type.toLowerCase() === 'ranged') {
      return; // dont handle ranged cliks
    }
    for (let piece in this.charTemplate) { // iterate over 
      let curPiece = this.charTemplate[piece as keyof CharacterTemplate]

      if (gearpiece?.invintory_type.toLowerCase() === 'two-hand') {
        gearpiece!.invintory_type = 'One-hand'; // changed this shouldnt break
      }
      if (curPiece?.invintory_type.toLowerCase() === gearpiece.invintory_type.toLowerCase()) {
        let pieceStats = curPiece.stats;
        this.statsObj = {
          stamina: this.statsObj.stamina - pieceStats.stamina,
          strength: this.statsObj.strength - pieceStats.strength,
          intellect: this.statsObj.intellect - pieceStats.intellect,
          agility: this.statsObj.agility - pieceStats.agility,
          spirit: this.statsObj.spirit - pieceStats.spirit,
          armor: this.statsObj.armor - pieceStats.armor,
          dps: this.statsObj.dps - pieceStats.dps,
        }
      }
    }
    this.charTemplateService.fillSlot(this.charTemplate, gearpiece, this.gearslots);

    this.gearService.putGearpiece(gearpiece, this.chara._id).subscribe({
      next: (data: any) => {
        this.statsObj = {
          stamina: this.statsObj.stamina + Number(data.stamina),
          strength: this.statsObj.strength + data.strength,
          intellect: this.statsObj.intellect + data.intellect,
          agility: this.statsObj.agility + data.agility,
          spirit: this.statsObj.spirit + data.spirit,
          armor: this.statsObj.armor + data.armor,
          dps: this.statsObj.dps + data.dps,
        }
        // save the stats to gearpiece
        gearpiece.stats = data;
        // console.log(gearpiece);
        // console.log("INSPECT THIS: ", this.charTemplate);
        // update total stats for backend character document:
        this.gearService.putStats(this.statsObj, this.chara._id).subscribe({
          next: (data) => {
            // console.log("putStats return data: ", data);
          }
        });
      }
    });
    this.calculateBonusStats();
  }

  // printState(): void {
  //   console.log(this.charTemplate);
  // }

  infoHidden: boolean = false;
  modalGearpiece?: Gearpiece;
  showGearpiece(gearpiece: Gearpiece): void {
    if (gearpiece === undefined) {
      return undefined;
    }
    // load gearpiece in
    // console.log("Showing up correct? ", this.modalGearpiece);
    this.modalGearpiece = gearpiece;

    // this.infoHidden = true;
  }

  hideGearpiece() {
    // this.infoHidden = false;
  }

  addedStats = {
    attackPower: 0,
    spellPower: 0,
    critChance: 0,
    dodge: 0,
    spellCrit: 0,
    addedHealth: 0, // from stamina
    addedMana: 0,
    manaRegen: 0,
    healthRegen: 0
  }

  calculateBonusStats() {
    this.addedStats.addedHealth = this.statsObj.stamina * 10;
    if (this.chara.class === 'mage') {
      this.addedStats.attackPower = this.statsObj.strength
      this.addedStats.addedMana = this.statsObj.intellect * 15;
      this.addedStats.spellCrit = this.statsObj.intellect/59.5;
      if(this.statsObj.spirit !== 0) {
        this.addedStats.manaRegen = (this.statsObj.spirit / 4) + 12.5;
      }
    }
    else {
      this.addedStats.attackPower = this.statsObj.strength * 2
    }
    if(this.statsObj.spirit !== 0) {
      this.addedStats.healthRegen = (this.statsObj.spirit / 4) + 12.5;
    }
    this.addedStats.dodge = this.statsObj.agility / 20;
    this.addedStats.critChance = this.statsObj.agility / 20;
  }

  onSubmit(): void {
    const userInput = this.searchForm.value.gearSearchField;
    this.loadGear(userInput);
  }

  paginatedPieces(): Gearpiece[] {
    const start = (this.currentPage - 1) * this.piecesPerPage;
    return this.gearpieces.slice(start, start + this.piecesPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.piecesPerPage) < this.gearpieces.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
