import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  @Input() load = false;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }


  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  async login() {
    const response = await this.form.value;
    this.auth.login(response)
    .then((res) => {
      localStorage.setItem('auth', 'autenticado');
      this.loading();
    }).catch((err) => {
    alert('Ops... Algo deu errado, tente mais tarde!');
    });
  }

  loading() {
    this.load = true;
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 2000);
  }

}
