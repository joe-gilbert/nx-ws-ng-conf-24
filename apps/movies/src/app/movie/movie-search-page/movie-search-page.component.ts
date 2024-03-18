import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchMovieService } from 'movies/data-access-movies';
import { Observable, switchMap } from 'rxjs';
import { MovieModel } from 'shared/models';

import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-movie-search-page',
  templateUrl: './movie-search-page.component.html',
  styleUrls: ['./movie-search-page.component.scss'],
  standalone: true,
  imports: [NgIf, MovieListComponent, AsyncPipe],
})
export class MovieSearchPageComponent implements OnInit {
  movies$!: Observable<MovieModel[]>;

  constructor(
    private searchMovieService: SearchMovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movies$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.searchMovieService.searchMovies(params['query']);
      })
    );
  }
}
