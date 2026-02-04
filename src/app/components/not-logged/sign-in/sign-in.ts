import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {

  user: User = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {

    if (this.user.email === '' || this.user.password === '') {
      alert('E-mail e senha são obrigatórios');
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (response) => {
        // Aqui você pode salvar o token no localStorage
        localStorage.setItem('token', response.token);
  
        // Redirecionar para a página principal após o login
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.error;
        this.cdr.detectChanges();
      }
    });
  }
}
