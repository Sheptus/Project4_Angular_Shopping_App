import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { PasswordValidator } from '../../../validator/password.validator';
import { UniqueEmail } from '../../../validator/unique-email.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFormFirst: FormGroup;
  registerFormSecond: FormGroup;
  stepper = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uniqueEmail: UniqueEmail,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerFormFirst = this.fb.group(
      {
        id: [, Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.uniqueEmail.validate],
        ],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      { validator: PasswordValidator }
    );

    this.registerFormSecond = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onRegisterFirst() {
    if (!this.registerFormFirst.valid) return;
    this.stepper = true;
  }

  onRegisterSecond() {
    const data = {
      ...this.registerFormFirst.value,
      ...this.registerFormSecond.value,
    };
    delete data.passwordConfirm;
    this.authService.createUser(data).subscribe(
      () => this.router.navigate(['/login']),
      (e) => (this.error = e.message)
    );
  }

  get email() {
    return this.registerFormFirst.get('email');
  }

  get name() {
    return this.registerFormSecond.get('name');
  }

  get lastName() {
    return this.registerFormSecond.get('lastName');
  }

  get id() {
    return this.registerFormFirst.get('id');
  }

  get city() {
    return this.registerFormSecond.get('city');
  }

  get street() {
    return this.registerFormSecond.get('street');
  }
}
