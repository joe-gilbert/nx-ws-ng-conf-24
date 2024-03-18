import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { MovieService } from 'movies/data-access-movies';
import { Observable } from 'rxjs';
import {
  MovieModel,
  TMDBMovieCreditsModel,
  TMDBMovieDetailsModel,
} from 'shared/models';
import { StarRatingComponent } from 'shared/ui-star-rating';
import { MovieImagePipe } from 'shared/utils';

import { DetailGridComponent } from '../../ui/component/detail-grid/detail-grid.component';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DetailGridComponent,
    StarRatingComponent,
    FastSvgComponent,
    MovieListComponent,
    MovieImagePipe,
  ],
})
export class MovieDetailPageComponent implements OnInit {
  recommendations$!: Observable<{ results: MovieModel[] }>;
  credits$!: Observable<TMDBMovieCreditsModel>;
  movie$!: Observable<TMDBMovieDetailsModel>;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.movie$ = this.movieService.getMovieById(params['id']);
      this.credits$ = this.movieService.getMovieCredits(params['id']);
      this.recommendations$ = this.movieService.getMovieRecommendations(
        params['id']
      );
    });
  }
}
