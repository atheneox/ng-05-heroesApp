import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img:{
      width:100%;
      border-radius:5px;
    }
  `]
})
export class AddComponent implements OnInit {

  title: string = 'Edit Hero';

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  publishers = [
    {
      id: 'DC Commics',
      description: 'description for DC Commics'
    },
    {
      id: 'Marvel Commics',
      description: 'description for Marvel'
    }
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) {
      this.title = 'New Hero'
      return;
    }


    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroesById(id)))
      .subscribe((hero) => this.hero = hero);

  }

  //save or update
  save() {

    if (this.hero.superhero.trim().length === 0) { return }

    //update
    if (this.hero.id) {
      this.heroesService
        .updateHero(this.hero)
        .subscribe(r => {
          this.showSnackBar('Registro actualizado!');
        });
      //save
    } else {
      if (this.hero.alt_img) {
        this.heroesService
          .addHero(this.hero)
          .subscribe(hero => {
            this.router.navigate(['/heroes/edit', hero.id]);
            this.showSnackBar('Registro creado!');
          });
      }
    }

  }

  delete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.hero }
    })

    //optimizar a switchMap
    dialog.afterClosed().subscribe(
      (r) => {
        if (r) {
          this.heroesService
            .deleteHero(this.hero.id!)
            .subscribe(r => {
              this.router.navigate(['/heroes/list']);
            });
        }
      }
    );


  }

  showSnackBar(msg: string) {

    this.snackBar.open(msg, 'ok', {
      duration: 2500
    })

  }

}
