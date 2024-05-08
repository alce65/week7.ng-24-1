import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { StateService } from './services/state.service';

@Component({
  selector: 'isdi-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <isdi-header />
    <router-outlet />
  `,
  styles: ``,
})
export class AppComponent {
  stateService = inject(StateService);

  constructor() {
    this.setInitialLogin();
  }

  setInitialLogin() {
    const stringToken = localStorage.getItem('week7.ng');
    if (stringToken) {
      const { token } = JSON.parse(stringToken);
      this.stateService.setLogin(token);
    }
  }
}
