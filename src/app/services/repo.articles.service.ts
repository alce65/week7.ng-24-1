import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class RepoArticlesService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/articles';

  getArticles() {
    return this.httpClient.get<Article[]>(this.url);
  }
}
