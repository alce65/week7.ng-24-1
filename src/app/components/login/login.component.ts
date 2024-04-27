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
      <div>
        <label for="user">Username / email</label>
        <input id="user" type="text" formControlName="user" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" formControlName="password" />
      </div>

      <button type="submit" [disabled]="formLogin.invalid">Submit</button>
    </form>
  `,
  styles: ``,
})
export default class LoginComponent {
  private repo = inject(RepoUsersService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  formLogin = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    const { user, password } = this.formLogin.value;
    const userLogin = { password } as UserLoginDto;

    if (user!.includes('@')) {
      userLogin.email = this.formLogin.value.user as string;
    } else {
      userLogin.name = this.formLogin.value.user as string;
    }

    this.repo.login(userLogin).subscribe({
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
