import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string = '';
  pwd: string = '';
  errormsg: boolean = false;

constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('username')?.valueChanges.subscribe(val => this.username = val);
    this.loginForm.get('password')?.valueChanges.subscribe(val => this.pwd = val);
  }

  onSubmit(): void {
    // login here
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.username = username;
      this.pwd = password;

      this.authService.login(this.username, this.pwd).subscribe({
        next: (data) => {
          this.errormsg = false;

          localStorage.setItem('user', data);

          this.router.navigate(['/characters']);
        },
        error: (err) => {
          this.errormsg = true;

          console.error('login Failed', err);
        }
      })
    }
  }
}
