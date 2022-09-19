import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }

  getHeroBySuggestion(query: string, limit: number = 6): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=${limit}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

}
