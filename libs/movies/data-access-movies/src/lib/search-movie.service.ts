import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { MovieModel } from 'shared/models';
import { Environment, ENVIRONMENT_TOKEN } from 'shared/util-env-token';

@Injectable({ providedIn: 'root' })
export class SearchMovieService {
  constructor(
    @Inject(ENVIRONMENT_TOKEN) private env: Environment,
    private httpClient: HttpClient
  ) {}

  searchMovies(query: string): Observable<MovieModel[]> {
    return this.httpClient
      .get<{ results: MovieModel[] }>(
        `${this.env.tmdbBaseUrl}/3/search/movie`,
        {
          params: { query },
        }
      )
      .pipe(
        tap(() => {
          if (query === 'throwError') {
            throw new Error('you searched for throwError, i am sorry');
          }
        }),
        map(({ results }) => results)
      );
  }
}
