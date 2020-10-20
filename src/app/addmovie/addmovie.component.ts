import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-addmovie",
  templateUrl: "./addmovie.component.html",
  styleUrls: ["./addmovie.component.css"],
})
export class AddmovieComponent {
  title: string = "";
  year: number = 0;
  moviesDB: any[] = [];
  constructor(private dbService: DatabaseService, private router: Router) {}
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovies(obj).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }
}