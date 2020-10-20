import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  movSelect =""
  actSelect=""

  constructor(private dbService: DatabaseService, private router: Router) { }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
    onSelectActor(item) { 
      this.actSelect = item._id;
    }
    onSelectMovie(data) {
      this.movSelect = data._id;
    }

    onAddActor() { //adding actor to movie
      this.dbService.addExistAuthor(this.movSelect, this.actSelect).subscribe(result => {
      this.onGetMovies();
      });
    }
    onAddMovie() { //adding movie to actor
        this.dbService.addExistMovie(this.actSelect, this.movSelect).subscribe(result => {
        this.onGetMovies();
        });
  }
  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

}
