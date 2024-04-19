import { Component, OnInit, inject } from '@angular/core';
import { State, StateService } from '../../services/state.service';
import { LoginComponent } from '../login/login.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'isdi-home',
  standalone: true,
  imports: [LoginComponent, JsonPipe],
  template: `
    <h2>Home</h2>

    @switch (state.loginState) { @case ('idle') {
    <p>Esperando al usuario</p>
    } @case ('logging') {
    <isdi-login />
    } @case ('logged') {
    <p>Welcome</p>
    <pre>{{ state.currenUser | json }}</pre>
    } @case ('error') {
    <p>Error de acceso</p>
    } }
  `,
  styles: ``,
})
export default class HomeComponent implements OnInit {
  stateService = inject(StateService);
  state!: State;

  ngOnInit() {
    this.stateService.getState().subscribe((state) => {
      this.state = state;
    });
  }
}
