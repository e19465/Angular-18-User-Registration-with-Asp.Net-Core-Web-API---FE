import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import AbstractControl
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../../layouts/auth/auth-layout/auth-layout.component';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

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
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
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
      const submitData = {
        Email: formData.email,
        Password: formData.password,
      };
      this.loading = true;
      this.authService.userLogin(submitData).subscribe({
        next: (response: any) => {
          this.loading = false;
          console.log(response);
          this.userService.saveCredentialsToLocalStorage(response);
          this.form.reset();
          this.toastr.success('Login successful!', '');
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
          if (err.error?.message) {
            this.toastr.error(err.error.message, '');
          } else {
            this.toastr.error('Login failed!', '');
          }
        },
      });
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
