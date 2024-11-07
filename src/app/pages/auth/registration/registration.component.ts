import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../../layouts/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, RouterLink, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: [],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  title = 'Sign Up';
  imageSrc = '/images/loginbgsec.png';
  loading = false;

  // List of password requirements
  passwordRequirements = [
    { id: 'minLength', text: 'At least 6 characters long', met: false },
    { id: 'uppercase', text: 'At least one uppercase letter', met: false },
    { id: 'lowercase', text: 'At least one lowercase letter', met: false },
    { id: 'digit', text: 'At least one digit', met: false },
    { id: 'specialChar', text: 'At least one special character', met: false },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup(
      {
        name: this.formBuilder.control('', Validators.required),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(6),
          this.passwordStrengthValidator.bind(this),
        ]),
        confirmPassword: this.formBuilder.control('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  // Custom validator for password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    let hasUppercase = /[A-Z]/.test(value);
    let hasLowercase = /[a-z]/.test(value);
    let hasDigit = /[0-9]/.test(value);
    let hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
    let minLength = value.length >= 6;

    // Update the password requirements status
    this.passwordRequirements = [
      { id: 'minLength', text: 'At least 6 characters long', met: minLength },
      {
        id: 'uppercase',
        text: 'At least one uppercase letter',
        met: hasUppercase,
      },
      {
        id: 'lowercase',
        text: 'At least one lowercase letter',
        met: hasLowercase,
      },
      { id: 'digit', text: 'At least one digit', met: hasDigit },
      {
        id: 'specialChar',
        text: 'At least one special character',
        met: hasSpecialChar,
      },
    ];

    if (
      !minLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasDigit ||
      !hasSpecialChar
    ) {
      return { passwordStrength: 'Password does not meet all requirements.' };
    }
    return null;
  }

  // Password match validator
  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  };

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const submitData = {
        FullName: formData.name.trim(),
        Email: formData.email,
        Password: formData.password,
        ConfirmPassword: formData.confirmPassword,
      };
      this.loading = true;
      this.authService.userRegister(submitData).subscribe({
        next: (response: any) => {
          if (response.succeeded) {
            this.form.reset();
            this.toastr.success('Registration successful!', '');
            this.router.navigate(['/sign-in']);
          } else {
            this.toastr.error('Registration failed', 'Something went wrong');
            console.error(response);
          }
          this.loading = false;
        },
        error: (err: any) => {
          if (err.error && Array.isArray(err.error)) {
            let error_message = '';
            for (const errorItem of err.error) {
              if (
                errorItem?.code &&
                (errorItem.code === 'InvalidUserName' ||
                  errorItem.code === 'DuplicateUserName')
              ) {
                continue;
              }
              error_message += errorItem.description + ',';
            }

            // remove last comma
            error_message = error_message.slice(0, -1);
            this.toastr.error(error_message, 'Registration failed');
          } else if (err?.error && err?.error?.message) {
            this.toastr.error(err.error.message, 'Registration failed');
          } else {
            this.toastr.error('Registration failed', 'Something went wrong');
          }
          this.loading = false;
          console.error(err);
        },
      });
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors() {
    const formControls = this.form.controls;
    if (formControls['name'].hasError('required')) {
      this.toastr.error('Name is required', '');
    }
    if (formControls['email'].hasError('required')) {
      this.toastr.error('Email is required', '');
    } else if (formControls['email'].hasError('email')) {
      this.toastr.error('Invalid email format', '');
    }
    if (formControls['password'].hasError('required')) {
      this.toastr.error('Password is required', '');
    }
    if (formControls['confirmPassword'].hasError('required')) {
      this.toastr.error('Confirm Password is required', '');
    }
    if (this.form.hasError('mismatch')) {
      this.toastr.error('Passwords do not match', '');
    }
  }
}
