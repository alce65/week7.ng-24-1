import { TestBed } from '@angular/core/testing';

import { RepoArticlesService } from './repo.articles.service';

describe('RepoArticlesService', () => {
  let service: RepoArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
