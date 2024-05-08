import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { of } from 'rxjs';
import { RepoUsersService } from './repo.users.service';
import { RepoArticlesService } from './repo.articles.service';

describe('StateService', () => {
  let service: StateService;

  const mockUsersRepoService = jasmine.createSpyObj('RepoUsersService', {
    login: of({ token: 'token' }),
    getById: of({ id: '1', role: 'admin' }),
  });

  const mockArticlesRepoService = jasmine.createSpyObj('RepoArticlesService', {
    getArticles: of([]),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RepoUsersService, useValue: mockUsersRepoService },
        { provide: RepoArticlesService, useValue: mockArticlesRepoService },
      ],
    });
    service = TestBed.inject(StateService);
    spyOn(service, 'jwtDecode').and.returnValue({ id: '1', role: 'admin' });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set login state', () => {
    service.setLoginState('logged');
    expect(service.state.loginState).toBe('logged');
  });

  it('should set login', () => {
    service.setLogin('token');
    expect(service.state.token).toBe('token');
    expect(service.state.currenPayload).toEqual({ id: '1', role: 'admin' });
  });

  it('should get state', () => {
    service.getState().subscribe((state) => {
      expect(state).toEqual(service.state);
    });
  });

  it('should set logout', () => {
    service.setLogout();
    expect(service.state).toEqual({
      loginState: 'idle',
      token: null,
      currenPayload: null,
      currenUser: null,
      articles: [],
    });
  });

  it('should set articles', () => {
    service.loadArticles();
    expect(service.state.articles).toEqual([]);
  });
});
