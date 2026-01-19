import { Component } from '@angular/core';
import { Header } from "../../../components/logged/header/header";
import { Card } from "../../../components/logged/card/card";

@Component({
  selector: 'app-home',
  imports: [Header, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
