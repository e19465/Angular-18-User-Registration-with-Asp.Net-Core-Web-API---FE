import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import AbstractControl
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../../layouts/auth/auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  title = 'Sign In';
  imageSrc = '/images/loginpc.png';

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = new FormGroup({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Submitted', formData);
      this.toastr.success('Login successful!', '');
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors() {
    const formControls = this.form.controls;

    if (formControls['email'].hasError('required')) {
      this.toastr.error('Please enter your email', '');
    } else if (formControls['email'].hasError('email')) {
      this.toastr.error('Invalid email format', '');
    }

    if (formControls['password'].hasError('required')) {
      this.toastr.error('Please enter your password', '');
    }
  }
}
