import { ComponentFixture, TestBed } from '@angular/core/testing';

import LoginComponent from './login.component';
import { of, throwError } from 'rxjs';
import { StateService } from '../../services/state.service';
import { RepoUsersService } from '../../services/repo.users.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: StateService;
  let repoService: RepoUsersService;

  const mockStateService = jasmine.createSpyObj('StateService', {
    getState: of({ loginState: 'logged' }),
    setLoginState: undefined,
    setLogin: undefined,
  });

  const mockRepoService = jasmine.createSpyObj('RepoUsersService', {
    login: of({ token: 'token' }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: StateService, useValue: mockStateService },
        {
          provide: RepoUsersService,
          useValue: mockRepoService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    repoService = TestBed.inject(RepoUsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service with a user name', () => {
    (repoService.login as jasmine.Spy).and.returnValue(of({ token: 'token' }));
    component.formLogin.setValue({
      user: 'test',
      password: 'test',
    });
    component.submit();
    expect(repoService.login).toHaveBeenCalled();
    expect(service.setLogin).toHaveBeenCalled();
  });

  it('should call login service with an email', () => {
    (repoService.login as jasmine.Spy).and.returnValue(of({ token: 'token' }));
    component.formLogin.setValue({ user: 'test@sample.com', password: 'test' });
    component.submit();
    expect(repoService.login).toHaveBeenCalled();
    expect(service.setLogin).toHaveBeenCalled();
  });

  it('should set login state to error', () => {
    (repoService.login as jasmine.Spy).and.returnValue(
      throwError(() => 'error'),
    );
    component.submit();
    expect(service.setLoginState).toHaveBeenCalledWith('error');
  });
});
