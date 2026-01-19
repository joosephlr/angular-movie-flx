import { Component } from '@angular/core';
import { SignUp } from "../../../components/not-logged/sign-up/sign-up";
import { Header } from "../../../components/not-logged/header/header";

@Component({
  selector: 'app-registration',
  imports: [SignUp, Header],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})

export class Registration {

}
