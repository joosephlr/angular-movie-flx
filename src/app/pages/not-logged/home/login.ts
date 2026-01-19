import { Component } from '@angular/core';
import { Header } from "../../../components/not-logged/header/header";
import { SignIn } from '../../../components/not-logged/sign-in/sign-in';

@Component({
  selector: 'app-login',
  imports: [Header, SignIn],  
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
