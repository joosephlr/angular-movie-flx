import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserRegister } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})

export class SignUp {
  @ViewChild('registerForm') registerForm!: NgForm;

  user: UserRegister = {
    name: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso!';
        this.errorMessage = '';
        
        // Reseta o formulário sem disparar validações
        this.registerForm.resetForm();
        
        // Redireciona para o login após 4 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (error) => {
        this.errorMessage = error.error;
        this.successMessage = '';
      }
    });
  }
}
