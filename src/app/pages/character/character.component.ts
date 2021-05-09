import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Character from 'src/app/models/character.interface';
import CharactersResponse from 'src/app/models/characters-response.interface';
import Comic from 'src/app/models/comic.interface';
import ComicsResponse from 'src/app/models/comics-response.interface';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  isLoadingCharacter: boolean = true;
  isLoadingComics: boolean = true;
  character?: Character;
  mostExpensiveComic?: Comic;

  constructor(
    private marvelService: MarvelService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.getCharacterData(params.id);
      this.getCharacterComics(params.id);
    })
  }

  /**
   * Busca o personagem na api e faz a tratativa dos dados recebidos
   * @param id id do personagem
   */
  getCharacterData(id: number): void {
    this.isLoadingCharacter = true;
    this.marvelService.getCharacter(id).subscribe((response: CharactersResponse) => {
      if(response.code === 200) {
        this.character = response.data.results[0]
      }
      this.isLoadingCharacter = false;
    })
  }

  /**
   * Busca as HQs do personagem e seta a mais cara
   * @param id id do personagem
   */
  getCharacterComics(id: number): void {
    this.isLoadingComics = true;
    this.marvelService.getComicsFromCharacter(id).subscribe((response: ComicsResponse) => {
      if(response.code === 200) {
        this.mostExpensiveComic = this.getMostExpensiveComic(response.data.results);
      }
      this.isLoadingComics = false;
    })
  }

  /**
   * Busca a HQ mais cara em um array de HQs
   * @param comics expects Comic[]
   * @returns Comic
   */
  getMostExpensiveComic(comics: Comic[]): Comic {
    let mostExpensiveComic: Comic = comics[0];

    comics.forEach(comic => {
      if(comic.prices[0].price > mostExpensiveComic.prices[0].price) {
        mostExpensiveComic = comic;
      }
    })

    return mostExpensiveComic;
  }

}
