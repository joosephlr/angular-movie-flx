import { Component } from '@angular/core';
import { Header } from "../../../components/not-logged/header/header";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-created-movie',
  imports: [Header, RouterLink, RouterLinkActive],
  templateUrl: './created-movie.html',
  styleUrl: './created-movie.css',
})
export class CreatedMovie {

}
