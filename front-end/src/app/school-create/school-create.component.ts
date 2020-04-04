import { Router } from '@angular/router';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Schools } from './../model/schools';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  public form: FormGroup;
  public schools: Schools;
  @Input() load = false;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      address: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      email: ['', Validators.required],
      telephone: ['', Validators.compose([Validators.minLength(12), Validators.maxLength(13), Validators.required])],
    });
  }


  register(schools: Schools) {
    schools = this.form.value;
    this.httpService.createSchools(schools).subscribe((res) => {
      this.loading();
    });
  }

  loading() {
    this.load = true;
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 2000);
  }


}
