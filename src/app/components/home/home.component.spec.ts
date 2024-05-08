import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomeComponent from './home.component';
import { of } from 'rxjs';
import { State, StateService } from '../../services/state.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: StateService;

  const mockStateService = jasmine.createSpyObj('StateService', {
    getState: of({ loginState: 'logged' }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: StateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service.getState).toHaveBeenCalled();
    expect(component.state).toEqual({ loginState: 'logged' } as State);
  });
});
