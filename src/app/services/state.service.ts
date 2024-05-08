import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { RepoArticlesService } from './repo.articles.service';
import { RepoUsersService } from './repo.users.service';
import { Article } from '../models/article.model';

type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: unknown | null;
  articles: Article[];
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
  articles: [],
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private repoArticles = inject(RepoArticlesService);
  private repoUsers = inject(RepoUsersService);
  jwtDecode = jwtDecode;

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  // get token(): string | null {
  //   return this.state$.value.token;
  // }

  get state(): State {
    return this.state$.value;
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currenPayload = this.jwtDecode(token) as Payload;
    localStorage.setItem('week7.ng', JSON.stringify({ token }));
    this.repoUsers.getById(currenPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currenPayload,
        currenUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('week7.ng');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
    });
  }

  loadArticles() {
    this.repoArticles.getArticles().subscribe((articles) => {
      this.state$.next({ ...this.state$.value, articles });
    });
  }
}
