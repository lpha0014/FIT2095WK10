import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  section = 1;

  title: string = "";
  year: number = 0;
  actors = [];
  movieId: string = "";
  ayear: number = 0;
  actorsDB: any[] = [];
  mId: any[] = [];
  aId: any[] = [];
  movSelect =""
  actSelect=""
  name: string = "";
  bYear: number = 0;

  constructor(private dbService: DatabaseService) {}

  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year};
    this.dbService.createMovies(obj).subscribe(result => {
      this.changeSection(7)
      this.changeSection(1)
      this.onGetMovies();
    });
  }
  // Update a Movie
  onSelectUpdate(item) {
    this.title = item.title;
    this.year = item.year;
    this.actors.push(item._id);
  }

  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

    //Delete Movie
    onDeleteaYear() { //qn3
      this.dbService.onDeleteaYear(this.ayear).subscribe(result => {
        this.onGetMovies();
      });
    }
//qn4
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

// This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.actors = [];
  }
}