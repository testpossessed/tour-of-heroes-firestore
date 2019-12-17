import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Hero } from "./hero";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private angularFirestore: AngularFirestore
  ) {}

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");

    // this looks a bit complicated but it is necessary to use
    // the auto generated id as the id of the entity
    return this.angularFirestore
      .collection<Hero>("heroes")
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(change => {
            const data = change.payload.doc.data() as Hero;
            const id = change.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    // this looks a bit complicated but it is necessary to use
    // the auto generated id as the id of the entity
    return this.angularFirestore
      .doc<Hero>(`heroes/${id}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return { id, ...changes.payload.data() };
        })
      );
  }

  addHero(hero: Hero) {
    this.angularFirestore
      .collection<Hero>("heroes")
      .add(hero)
      .then( doc  => {
        this.messageService.add(`HeroService: Successfuly added ${hero.name}`);
        hero.id = doc.id; // map generated id onto new hero
      });
  }

  deleteHero(hero: Hero) {
    this.angularFirestore
      .doc<Hero>(`heroes/${hero.id}`)
      .delete()
      .then(() =>
        this.messageService.add(
          `HeroService: Successfully deleted ${hero.name}`
        )
      );
  }
}
