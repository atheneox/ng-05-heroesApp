import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  query: string = '';
  heroes: Hero[] = [];
  heroSelected!: Hero | undefined;

  constructor(
    private heroeService: HeroesService
  ) { }

  ngOnInit(): void {

  }

  searching() {
    this.heroeService.getHeroBySuggestion(this.query.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  optionSelected(e: MatAutocompleteSelectedEvent) {


    if (!e.option.value) {
      this.heroSelected = undefined;
      return;
    }

    const hero: Hero = e.option.value;
    this.query = hero.superhero;
    this.heroeService.getHeroesById(hero.id!)
      .subscribe(hero => this.heroSelected = hero);

  }

}
