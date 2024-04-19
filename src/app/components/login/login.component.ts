import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepoUsersService } from '../../services/repo.users.service';
import { UserLoginDto } from '../../models/user.model';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'isdi-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="formLogin" (ngSubmit)="submit()">
      <label for="username">Username</label>
      <input id="username" type="text" formControlName="username" />
      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password" />
      <button type="submit" [disabled]="formLogin.invalid">Submit</button>
    </form>
  `,
  styles: ``,
})
export class LoginComponent {
  private repo = inject(RepoUsersService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.repo.login(this.formLogin.value as UserLoginDto).subscribe({
      next: ({ token }) => {
        this.state.setLogin(token);
        console.log('Logged in', token);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
      },
    });
  }
}
