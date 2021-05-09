import { Component, OnInit } from '@angular/core';
import Character from 'src/app/models/character.interface';
import CharactersResponse from 'src/app/models/characters-response.interface';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offset: number = 0;
  loading: Boolean = true;
  characters: Character[] = [];

  constructor(
    private readonly marvelService: MarvelService
  ) { }

  ngOnInit(): void {
    this.getCharactersData();
  }

  getCharactersData(): void {
    this.loading = true;
    this.marvelService.getCharacters(this.offset).subscribe((response: CharactersResponse) => {
      this.loading = false;
      if(response.code === 200) {
        this.offset += 20;
        this.characters = this.characters.concat(response.data.results);
      }
    });
  }


}
