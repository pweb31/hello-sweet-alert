import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { keys } from 'my-keys';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message;
  favoriteTvShow;
  URL = 'https://api.themoviedb.org/3/search/movie?api_key=';
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  getMovie(movieName) {
    const headers = {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${keys.theMovieDB}`
    }

    this.http.get<Movie>(`${this.URL}${keys.theMovieDB}&query=${movieName}`,{headers:headers})
    .subscribe(data => {
      console.log("data  : ",data);
    },
      err => {
        console.error("error : ",err);
      })
  }

  saveTVshow(tvshow) {
    console.log("tvshow save :",tvshow);
    this.favoriteTvShow = tvshow;
    //Recherche de film en anglais, on peut configurer la recherche des films en français.Exemple : un (Pas des resultats)
    //Terminator
    this.getMovie(tvshow);
  }

  cancelTVshow(e) {
    console.log("event cancel:",e);
    switch(e ) {
      case 'esc' :
        this.message = 'Echap bien pris en compte';
        this.hideMessage(1500); //1500 milli secondes
        break;
      case 'backdrop':
        this.message = 'Vous avez clique sur l\'arriere plan';
        break;
      default:
        break;
    }
  }

   hideMessage(ms:number) {
    setTimeout(()=>this.message = '',ms)
  }

}
