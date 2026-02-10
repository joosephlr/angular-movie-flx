import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieCard } from '../interfaces/movie';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Lista todos os filmes cadastrados no banco de dados
   * @returns Observable com lista de filmes
   */
  getAllMovies(): Observable<MovieCard[]> {
    const token = this.authService.getToken();
    
    console.log('Token obtido:', token ? 'Presente' : 'Não encontrado');
    console.log('URL da requisição:', `${this.apiUrl}/flix/movie`);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<MovieCard[]>(`${this.apiUrl}/flix/movie`, { headers });
  }

  /**
   * Obtém um filme específico pelo ID
   * @param id ID do filme
   * @returns Observable com dados do filme
   */
  getMovieById(id: number): Observable<MovieCard> {
    const token = this.authService.getToken();
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MovieCard>(`${this.apiUrl}/flix/movie/${id}`, { headers });
  }

  /**
   * Cria um novo filme
   * @param movie Dados do filme
   * @returns Observable com resposta do servidor
   */
  createMovie(movie: any): Observable<any> {
    const token = this.authService.getToken();
    
    console.log('Token para criar filme:', token ? 'Presente' : 'Não encontrado');
    console.log('Dados enviados:', movie);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/flix/movie`, movie, { headers });
  }

  /**
   * Deleta um filme
   * @param id ID do filme
   * @returns Observable com resposta do servidor
   */
  deleteMovie(id: number): Observable<any> {
    const token = this.authService.getToken();
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/flix/movie/${id}`, { headers });
  }
}
