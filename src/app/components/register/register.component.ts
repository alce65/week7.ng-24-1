import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RepoUsersService } from '../../services/repo.users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'isdi-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Registro de usuario</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <div class="form-control">
        <label>
          <span>Nombre</span>
          <input type="text" formControlName="name" />
        </label>
      </div>
      <div class="form-control">
        <label>
          <span>Email</span>
          <input type="email" formControlName="email" />
        </label>
      </div>
      <div class="form-control">
        <label>
          <span>Contraseña</span>
          <input type="password" formControlName="password" />
        </label>
      </div>
      <div class="form-control">
        <label>
          <span>Avatar</span>
          <input type="file" #avatar (change)="onFileChange()" />
        </label>
      </div>
      <div class="form-control">
        <label>
          <span>Fecha de nacimiento</span>
          <input type="date" formControlName="birthDateString" />
        </label>
      </div>
      <button type="submit" [disabled]="registerForm.invalid">Enviar</button>
    </form>
  `,
  styles: ``,
})
export default class RegisterComponent {
  fb = inject(FormBuilder);
  repo = inject(RepoUsersService);
  router = inject(Router);
  registerForm: FormGroup;
  @ViewChild('avatar') avatar!: ElementRef;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      password: [''],
      avatar: [null],
      birthDateString: [''],
    });
  }

  onFileChange() {
    const htmlElement: HTMLInputElement = this.avatar.nativeElement;
    const file = htmlElement.files![0];
    console.log(file);
    this.registerForm.patchValue({ avatar: file });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    const fd = new FormData();
    fd.append('name', this.registerForm.value.name);
    fd.append('email', this.registerForm.value.email);
    fd.append('password', this.registerForm.value.password);
    fd.append('birthDateString', this.registerForm.value.birthDateString);
    fd.append('avatar', this.registerForm.value.avatar);

    return this.repo.create(fd).subscribe((data) => {
      console.log(data);
      this.router.navigate(['home']);
    });
  }
}
