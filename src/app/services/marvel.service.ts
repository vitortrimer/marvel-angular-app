import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private baseUrl = 'https://gateway.marvel.com:443/v1/public';
  private readonly limit = 20;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Busca lista de personagens na API da Marvel
   * @param offset quantidade de itens que a API irá pular
   * @returns observable com a resposta da chamada de API
   */
  getCharacters(offset: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters?${this.getAuthenticationSheet()}&limit=${this.limit}&offset=${offset}`);
  }

  /**
   * Busca personagem específico na API da Marvel
   * @param id id do personagem
   * @returns observable de resposta da API
   */
  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters/${id}?${this.getAuthenticationSheet()}`);
  }

  /**
   * Busca HQs de um personagem específico
   * @param id id do personagem
   * @returns observable de resposta da API
   */
  getComicsFromCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters/${id}/comics?${this.getAuthenticationSheet()}`);
  }

  /**
   * get timestamp, apikey and hash
   * @returns dados necessários de autenticaćão em formato de parâmetros
   */
  private getAuthenticationSheet(): string {
    return `ts=${this.getTimestamp()}&apikey=${environment.publicKey}&hash=${this.getHash()}`;
  }

  /**
   *
   * @returns Timestamp atual
   */
  private getTimestamp(): string {
    return Date.now().toString();
  }

  /**
   * Faz a hash com o timestamp, chave privada e chave pública
   * @returns string da hash md5
   */
  private getHash(): string {
    return new Md5().appendStr(`${this.getTimestamp()}${environment.marvelKey}${environment.publicKey}`).end().toString();
  }

}
