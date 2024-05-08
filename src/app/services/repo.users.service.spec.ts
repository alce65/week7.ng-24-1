import { TestBed } from '@angular/core/testing';
import { RepoUsersService } from './repo.users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';

const expectedUrl = new URL('users', environment.apiUrl).href;

describe('RepoUsersService', () => {
  let service: RepoUsersService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RepoUsersService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll', () => {
    service.getById('1').subscribe((user) => expect(user).toEqual({}));
    const req: TestRequest = controller.expectOne(expectedUrl + '/1');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call create', () => {
    const data = new FormData();
    service.create(data).subscribe((response) => expect(response).toEqual({}));
    const req: TestRequest = controller.expectOne(expectedUrl + '/register');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call login', () => {
    const data = { email: 'pp@sample.com', password: '123456' };
    service.login(data).subscribe((response) =>
      expect(response).toEqual({
        token: '',
      }),
    );
    const req: TestRequest = controller.expectOne(expectedUrl + '/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: '' });
  });
});
