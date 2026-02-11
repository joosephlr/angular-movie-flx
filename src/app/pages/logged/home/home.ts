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
  providersMap: { [key: number]: string } = {};

  constructor(
    private movieService: MovieService,
    private movieGeneratorService: MovieGeneratorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.movieService.getProviders().subscribe({
      next: (providers: any[]) => {
        console.log('Provedores carregados:', providers);
        // Criar mapa de ID -> nome do provedor
        providers.forEach(provider => {
          this.providersMap[provider.id] = provider.name;
        });
        console.log('Mapa de provedores:', this.providersMap);
        this.loadMovies();
      },
      error: (error) => {
        console.error('Erro ao carregar provedores:', error);
        // Continuar carregando filmes mesmo se os provedores falharem
        this.loadMovies();
      }
    });
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

          // Obter o nome do provedor usando o mapa
          let providerName = 'N/A';
          if (movie.services && Array.isArray(movie.services) && movie.services.length > 0) {
            const serviceId = movie.services[0];
            // Se for um objeto com id, usar serviceId.id; se for um número direto, usar serviceId
            const id = typeof serviceId === 'object' ? serviceId.id : serviceId;
            providerName = this.providersMap[id] || 'N/A';
          }

          return {
            id: movie.id || 0,
            title: movie.title || '',
            description: movie.description || '',
            duration: defaults.duration, // Valor aleatório gerado
            ageRating: defaults.ageRating, // Valor aleatório gerado
            approval: movie.rating * 10 || 0,
            provider: providerName,
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
