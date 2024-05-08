import { ComponentFixture, TestBed } from '@angular/core/testing';
import RegisterComponent from './register.component';
import { of } from 'rxjs';
import { RepoUsersService } from '../../services/repo.users.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: RepoUsersService;
  let router: Router;

  const mockRepoService = jasmine.createSpyObj('RepoUsersService', {
    create: of({ id: 'user_id' }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: RepoUsersService,
          useValue: mockRepoService,
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RepoUsersService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call repoService.create with the form values', () => {
    component.registerForm.setValue({
      name: 'name',
      email: 'email',
      password: '12345',
      avatar: 'avatar',
      birthDateString: '2021-10-10',
    });
    component.onSubmit();
    expect(service.create).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should patch the avatar value', () => {
    const avatarElement: HTMLInputElement = fixture.debugElement.query(
      By.css('input[type="file"]'),
    ).nativeElement;

    const dataTransfer = new DataTransfer();
    const file = new File([''], 'avatar.png', { type: 'image/png' });
    dataTransfer.items.add(file);

    avatarElement.files = dataTransfer.files;
    fixture.detectChanges();
    component.onFileChange();
    expect(component.registerForm.get('avatar')!.value).toEqual(file);
  });
});
