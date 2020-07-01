import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
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
  imgURL ='https://image.tmdb.org/t/p/w500';
  imgSrc;
  //results;
  results:Movie[];

  //On recupère la swal qui a pour id movieswal grâce au décorateurViewChild
  //et on l'associe à une propriété typescript movieSwal de type SwalComponent
  @ViewChild('movieSwal') private movieSwal : SwalComponent;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  getMovie(movieName) {
    const headers = {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${keys.theMovieDB}`
    }

    //this.http.get<Movie>(`${this.URL}${keys.theMovieDB}&query=${movieName}`,{headers:headers})
    this.http.get<Movie>(`${this.URL}${keys.theMovieDB}&query=${movieName}&language=fr`,{headers:headers})
    .subscribe(data => {
      console.log("data  : ",data);
      this.results = data.results;
    },
      err => {
        console.error("error : ",err);
      })
  }

  retrieveTitle(tvshow) {
    console.log("tvshow save :",tvshow);
    this.favoriteTvShow = tvshow;
    //Recherche de film en anglais, on peut configurer la recherche des films en français.Exemple : un (Pas des resultats)
    //Terminator
    this.getMovie(tvshow);
  }

  cancelRetrieveTitle(e) {
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

  showOverview(movie:Movie) {
    this.movieSwal.update({
      icon:'success',
      title:`${movie.title}`,
      imageUrl:`${this.imgURL}${movie.poster_path}`,
      text:`${this.formatRealDate(movie.release_date)} - ${movie.overview}`
    });
    this.movieSwal.fire(); //On le déclenche dynamiquement
  }

  formatRealDate(releaseDateInString:string) {
    const dateParts = releaseDateInString.split('-');
    if(dateParts.length > 0) {
       return `Année de parution ${dateParts[0]}`

    } else {
      return '';
    }
  }

}
