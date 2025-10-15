import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { RetrieveCharacterService } from '../../services/characters/retrieve-character.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-char-select',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './char-select.component.html',
  styleUrl: './char-select.component.css'
})
export class CharSelectComponent implements OnInit {
  createCharForm: FormGroup; 
  chars: Character[] = [];
  currentPage: number = 1;
  charsPerPage: number = 5;
  pages: number = 0;
  hideList: boolean = true;

  constructor(private characterService: RetrieveCharacterService, private formBuilder: FormBuilder, private router: Router) {
    this.createCharForm = this.formBuilder.group({
      charName: ['', [Validators.required, Validators.minLength(4)]],
      className: ['Warrior', [Validators.required]]
    })
  };

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService.getCharacters().subscribe({
      next: (chars) => {
        // console.log(chars);
        if(chars) {
          this.chars = chars;
          this.pages = Math.ceil(this.chars.length/this.charsPerPage);
        }
      },
      error: (err) => {
        console.log("Error getting characters", err);
      }
    });
  }

  handleCharSelectClick(char: Character): void {
    // console.log("THIS IS CHAR: ", char);
    this.router.navigate(['gearstats'], { state: { chara: JSON.stringify(char) } }); // sends data to next route
  }

  deleteCharacters(): void {
    this.characterService.deleteCharacters().subscribe();
    this.chars = [];
    this.loadCharacters();
  }

  onSubmit(): void {
    let formVals = this.createCharForm.value;
    console.log("Submitted: ", formVals);
    let chara: Character = {
      name: formVals.charName,
      class: formVals.className,
      _id: ''
    };

    this.characterService.createCharacter(chara).subscribe({
      next: (id) => {
        chara._id = id;           
        this.loadCharacters();
      }
    });
  }

  paginatedChars(): Character[] {
    const start = (this.currentPage - 1) * this.charsPerPage;
    return this.chars.slice(start, start+ this.charsPerPage);
  }

  nextPage() {
    if((this.currentPage * this.charsPerPage) < this.chars.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if(this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
