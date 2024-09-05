import { Component, OnInit } from '@angular/core';
import { CadastroPage } from '../cadastro/cadastro.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }
  navigateToNovaPagina() {
    this.router.navigate(['/cadastro']);
  }
  ngOnInit() {
  }

}
