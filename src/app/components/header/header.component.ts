import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'isdi-header',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <header>
      <h1>
        <span>Week 7 </span>
        <div>
          @if ( (stateService.getState() | async)!.loginState === 'logged') {
          <button (click)="onClickArticles()">Artículos</button>
          <button (click)="onClickLogout()">Logout'</button>
          } @else {
          <button (click)="onClickRegister()">Registro</button>
          <button (click)="onClickLogin()">Login</button>
          }
        </div>
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
  router = inject(Router);

  onClickLogin() {
    this.stateService.setLoginState('logging');
    this.router.navigate(['login']);
  }

  onClickLogout() {
    this.stateService.setLogout();
  }

  onClickArticles() {
    this.router.navigate(['articles']);
  }

  onClickRegister() {
    console.log('Registro');
    this.router.navigate(['register']);
  }
}
