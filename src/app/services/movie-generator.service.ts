import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieGeneratorService {

  private ageRatings = [
    'L (Livre)',
    '+10',
    '+12',
    '+14',
    '+16',
    '+18'
  ];

  constructor() { }

  /**
   * Gera uma duração aleatória de filme em formato HH:MMh
   * Filmes típicos variam de 1h30min a 3h
   * @returns string no formato "2h15min"
   */
  generateRandomDuration(): string {
    const minMinutes = 90; // 1h30
    const maxMinutes = 180; // 3h
    
    const randomMinutes = Math.floor(
      Math.random() * (maxMinutes - minMinutes + 1) + minMinutes
    );
    
    const hours = Math.floor(randomMinutes / 60);
    const minutes = randomMinutes % 60;
    
    return `${hours}h${minutes > 0 ? minutes + 'min' : ''}`;
  }

  /**
   * Retorna uma classificação etária aleatória
   * @returns string com classificação etária
   */
  generateRandomAgeRating(): string {
    return this.ageRatings[
      Math.floor(Math.random() * this.ageRatings.length)
    ];
  }

  /**
   * Gera valores aleatórios para duration e ageRating
   * @returns objeto com duration e ageRating
   */
  generateMovieDefaults(): { duration: string; ageRating: string } {
    return {
      duration: this.generateRandomDuration(),
      ageRating: this.generateRandomAgeRating()
    };
  }
}
