import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { StateService } from '../../services/state.service';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: StateService;
  let router: Router;

  const mockStateService = jasmine.createSpyObj('StateService', {
    getState: of({ loginState: 'logged' }),
    setLoginState: undefined,
    setLogout: undefined,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, AsyncPipe],
      providers: [
        { provide: StateService, useValue: mockStateService },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the user is logged', () => {
    let buttons: DebugElement[];
    beforeEach(() => {
      mockStateService.getState.and.returnValue(of({ loginState: 'logged' }));
      fixture.detectChanges();
      buttons = fixture.debugElement.queryAll(By.css('button'));
    });
    it('should show the articles and logout buttons', () => {
      expect(buttons.length).toBe(2);
      expect(buttons[0].nativeElement.textContent).toBe('Artículos');
      expect(buttons[1].nativeElement.textContent).toBe('Logout');
    });
    it('should call the onClickArticles method when the articles button is clicked', () => {
      spyOn(component, 'onClickArticles').and.callThrough();
      spyOn(Router.prototype, 'navigate');
      buttons[0].nativeElement.click();
      expect(component.onClickArticles).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['articles']);
    });
    it('should call the onClickLogout method when the logout button is clicked', () => {
      spyOn(component, 'onClickLogout').and.callThrough();
      buttons[1].nativeElement.click();
      expect(component.onClickLogout).toHaveBeenCalled();
      expect(service.setLogout).toHaveBeenCalled();
    });
  });
  describe('When the user is NOT logged', () => {
    let buttons: DebugElement[];
    beforeEach(() => {
      mockStateService.getState.and.returnValue(of({ loginState: 'idle' }));
      fixture.detectChanges();
      buttons = fixture.debugElement.queryAll(By.css('button'));
    });

    it('should show the register and login buttons', () => {
      expect(buttons.length).toBe(2);
      expect(buttons[0].nativeElement.textContent).toBe('Registro');
      expect(buttons[1].nativeElement.textContent).toBe('Login');
    });
    it('should call the onClickRegister method when the register button is clicked', () => {
      spyOn(component, 'onClickRegister').and.callThrough();
      buttons[0].nativeElement.click();
      expect(component.onClickRegister).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['register']);
    });
    it('should call the onClickLogin method when the login button is clicked', () => {
      spyOn(component, 'onClickLogin').and.callThrough();
      buttons[1].nativeElement.click();
      expect(component.onClickLogin).toHaveBeenCalled();
      expect(service.setLoginState).toHaveBeenCalledWith('logging');
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    });
  });
});
