import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from "../../../components/logged/header/header";
import { Card } from "../../../components/logged/card/card";
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../../interfaces/movie';
import { MovieService } from '../../../services/movie.service';
import { MovieGeneratorService } from '../../../services/movie-generator.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Card, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  cards: MovieCard[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private movieService: MovieService,
    private movieGeneratorService: MovieGeneratorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.movieService.getAllMovies().subscribe({
      next: (movies: any) => {
        console.log('Resposta bruta do backend:', movies);

        // Garante que é um array
        let moviesArray: any[] = [];
        
        if (Array.isArray(movies)) {
          moviesArray = movies;
        } else if (movies && typeof movies === 'object') {
          // Se for um objeto com propriedade de array
          moviesArray = (movies as any).data || (movies as any).movies || [];
        } else {
          moviesArray = [];
        }

        // Mapear os dados do backend para o formato esperado pelo frontend
        this.cards = moviesArray.map((movie: any) => {
          // Gerar valores aleatórios para duration e ageRating
          const defaults = this.movieGeneratorService.generateMovieDefaults();

          return {
            id: movie.id || 0,
            title: movie.title || '',
            description: movie.description || '',
            duration: defaults.duration, // Valor aleatório gerado
            ageRating: defaults.ageRating, // Valor aleatório gerado
            approval: movie.approval || movie.rating || 0,
            provider: movie.provider || movie.services?.[0]?.name || 'N/A',
            isTop10: movie.isTop10 || false,
            topLabel: movie.topLabel || 'TOP 10'
          };
        });

        console.log('Filmes após mapeamento:', this.cards);
        console.log('Primeiro filme:', this.cards[0]);
        
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro completo ao carregar filmes:', error);
        console.error('Status:', error.status);
        console.error('Mensagem:', error.message);
        console.error('Resposta:', error.error);
        
        let mensagem = 'Erro ao carregar filmes. ';
        if (error.status === 0) {
          mensagem += 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
        } else if (error.status === 401) {
          mensagem += 'Não autorizado. Verifique seu token de autenticação.';
        } else if (error.status === 403) {
          mensagem += 'Acesso proibido.';
        } else if (error.status === 404) {
          mensagem += 'Endpoint não encontrado.';
        } else {
          mensagem += `Erro ${error.status}: ${error.error?.message || error.message}`;
        }
        
        this.errorMessage = mensagem;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
