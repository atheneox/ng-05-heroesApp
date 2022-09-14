import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px;
  }
  `]
})
export class ShowComponent implements OnInit {

  hero!: Hero;

  constructor(
    private activateRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroesById(id)), tap(console.log))
      .subscribe(hero => this.hero = hero);
  }

  back(){
    this.router.navigate(['/heroes/list']);
  }

}
