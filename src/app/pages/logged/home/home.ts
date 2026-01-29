import { Component } from '@angular/core';
import { Header } from "../../../components/logged/header/header";
import { Card } from "../../../components/logged/card/card";
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../../interfaces/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Card, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  cards: MovieCard[] = [
    {
      id: 1,
      title: 'Matrix',
      description: 'Um hacker descobre a verdade sobre sua realidade.',
      duration: '2:16h',
      ageRating: 'Somente +18',
      approval: 87,
      provider: 'NETFLIX',
      isTop10: true,
    },
    {
      id: 2,
      title: 'Senhor dos Anéis',
      description: 'A jornada épica para destruir o Anel.',
      duration: '3:00h',
      ageRating: 'Livre',
      approval: 95,
      provider: 'AMAZON PRIME',
      isTop10: false
    },
    {
      id: 3,
      title: 'Interestelar',
      description: 'Exploração espacial para salvar a humanidade.',
      duration: '2:49h',
      ageRating: 'Livre',
      approval: 91,
      provider: 'NETFLIX',
      isTop10: true,
    },
    {
      id: 4,
      title: 'Casablanca',
      description: 'Durante a Segunda Guerra Mundial, um exilado americano precisa escolher entre o amor da sua vida e ajudar um líder da resistência.',
      duration: '1:40h',
      ageRating: 'Somente +18',
      approval: 82,
      provider: 'NETFLIX',
      isTop10: false,
    },
    {
      id: 5,
      title: 'Cidadão Kane',
      description: 'A história de Charles Foster Kane, um magnata da imprensa que morre dizendo Rosebud e desperta um jornalista a investigar sua vida.',
      duration: '2:00h',
      ageRating: 'Somente +18',
      approval: 91,
      provider: 'CLARO TV',
      isTop10: true,
    },
  ];
}
