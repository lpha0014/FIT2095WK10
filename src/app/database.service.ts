import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateMovie(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteaYear(id) {
    let url = "/moviesaYear/" + id;
    return this.http.delete(url, httpOptions);
  }
  
  getMovies() {
    return this.http.get("/movies");
  }
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }
  createMovies(data) {
    return this.http.post("/movies", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/movies/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  onDeleteaYear(ayear) { //qn3
    let url = "/removeayear/" + ayear;
    return this.http.delete(url, httpOptions);
  }

  addExistAuthor(mId,aId) { //qn4
    let url = "/movie/" + mId + "/" + aId;
    return this.http.post(url, httpOptions);
  }
  // app.post('/actor/:mId/:aId', actors.addExistMovie) //to add a movie - qn4
  addExistMovie(aId,mId) { //qn4
    let url = "/actor/" + aId + "/" + mId;
    return this.http.post(url, httpOptions);
  }
}