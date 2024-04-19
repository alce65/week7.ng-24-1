import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'isdi-header',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <header>
      <h1>
        <span>Week 7 </span>
        @if ( (stateService.getState() | async)!.loginState === 'logged') {
        <button (click)="onClickLogout()">Logout'</button>
        <button (click)="onClickArticles()">Artículos</button>
        } @else {
        <button (click)="onClickLogin()">Login</button>
        }
      </h1>
    </header>
  `,
  styles: `
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: #fff;
  }`,
})
export class HeaderComponent {
  stateService = inject(StateService);

  onClickLogin() {
    this.stateService.setLoginState('logging');
  }

  onClickLogout() {
    this.stateService.setLogout();
  }

  onClickArticles() {
    this.stateService.loadArticles();
  }
}
