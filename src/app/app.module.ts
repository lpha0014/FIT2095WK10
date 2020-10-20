import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ActorComponent } from "./actor/actor.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MovieComponent } from './movie/movie.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { AddactorComponent } from './addactor/addactor.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { RouterModule, Routes } from "@angular/router";
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { AddactortomovieComponent } from './addactortomovie/addactortomovie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';

const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "listmovies", component: ListmoviesComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "addactortomovie", component: AddactortomovieComponent },
  { path: "viewnotfound", component: ViewnotfoundComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  {path: '**', component: ViewnotfoundComponent}
];
RouterModule.forRoot(appRoutes)

@NgModule({
  declarations: [AppComponent, ActorComponent, MovieComponent, ListactorsComponent, AddactorComponent, UpdateactorComponent, DeleteactorComponent, ListmoviesComponent, AddmovieComponent, DeletemovieComponent, AddactortomovieComponent, ViewnotfoundComponent],
  imports: [ RouterModule.forRoot(appRoutes, {useHash:true}), BrowserModule, HttpClientModule, FormsModule],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}