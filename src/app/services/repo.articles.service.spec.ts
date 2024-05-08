import { TestBed } from '@angular/core/testing';
import { RepoArticlesService } from './repo.articles.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';

const expectedUrl = new URL('articles', environment.apiUrl).href;

describe('RepoArticlesService', () => {
  let service: RepoArticlesService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RepoArticlesService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll', () => {
    service.getArticles().subscribe((articles) => expect(articles).toEqual([]));
    const req: TestRequest = controller.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
