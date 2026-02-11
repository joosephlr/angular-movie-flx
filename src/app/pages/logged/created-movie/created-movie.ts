import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from "../../../components/not-logged/header/header";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-created-movie',
  imports: [Header, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './created-movie.html',
  styleUrl: './created-movie.css',
})
export class CreatedMovie implements OnInit {
  movieForm!: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = true;

  // Arrays para armazenar categorias e provedores do API
  categories: any[] = [];
  providers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategoriesAndProviders();
  }

  loadCategoriesAndProviders(): void {
    this.isLoading = true;
    
    forkJoin({
      categories: this.movieService.getCategories(),
      providers: this.movieService.getProviders()
    }).subscribe({
      next: (result) => {
        this.categories = result.categories;
        this.providers = result.providers;
        console.log('Categorias carregadas:', this.categories);
        console.log('Provedores carregados:', this.providers);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar categorias e provedores:', error);
        this.errorMessage = 'Erro ao carregar categorias e provedores.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  initializeForm(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      releaseDate: ['', Validators.required],
      approval: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      provider: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Converter a data do formato YYYY-MM-DD para DD/MM/YYYY
    const releaseDate = this.movieForm.get('releaseDate')?.value;
    const [year, month, day] = releaseDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Obter os IDs das categorias e serviços (já são números do select)
    const categoryId = parseInt(this.movieForm.get('category')?.value, 10);
    const serviceId = parseInt(this.movieForm.get('provider')?.value, 10);

    // Validar se os IDs são válidos
    if (!categoryId || !serviceId) {
      this.errorMessage = 'Erro: categoria ou provedor inválido.';
      this.isSubmitting = false;
      return;
    }

    // Preparar os dados do filme conforme esperado pelo backend
    const movieData = {
      title: this.movieForm.get('title')?.value,
      description: this.movieForm.get('description')?.value,
      releaseDate: formattedDate, // Formato: DD/MM/YYYY
      rating: parseFloat(this.movieForm.get('approval')?.value),
      categories: [categoryId], // Array com IDs numéricos de categorias
      services: [serviceId], // Array com IDs numéricos de serviços (providers)
    };

    console.log('Enviando filme:', movieData);
    console.log('Category ID:', categoryId, 'Service ID:', serviceId);

    this.movieService.createMovie(movieData as any).subscribe({
      next: (response: any) => {
        console.log('Filme criado com sucesso:', response);
        this.successMessage = 'Filme cadastrado com sucesso! Redirecionando...';
        this.isSubmitting = false;
        this.movieForm.reset();
        
        // Aguardar 2 segundos e redirecionar para home
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao criar filme:', error);
        console.error('Resposta do servidor:', error.error);
        this.isSubmitting = false;
        
        let mensagem = 'Erro ao cadastrar filme. ';
        if (error.status === 0) {
          mensagem += 'Não foi possível conectar ao servidor.';
        } else if (error.status === 401) {
          mensagem += 'Não autorizado. Faça login novamente.';
        } else if (error.status === 400) {
          mensagem += `Dados inválidos: ${error.error?.message || ''}`;
        } else if (error.status === 403) {
          mensagem += 'Acesso proibido.';
        } else {
          mensagem += `Erro ${error.status}: ${error.error?.message || error.message}`;
        }
        
        this.errorMessage = mensagem;
      }
    });
  }

  get title() {
    return this.movieForm.get('title');
  }

  get description() {
    return this.movieForm.get('description');
  }

  get releaseDate() {
    return this.movieForm.get('releaseDate');
  }

  get approval() {
    return this.movieForm.get('approval');
  }

  get provider() {
    return this.movieForm.get('provider');
  }

  get category() {
    return this.movieForm.get('category');
  }
}
