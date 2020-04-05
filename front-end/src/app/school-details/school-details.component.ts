import { Router } from '@angular/router';
import { Group } from './../model/group';
import { HttpService } from './../services/http.service';
import { ServiceService } from './../services/service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {

@Input() load = false;
public form: FormGroup;
public school: any;
public open: boolean;
public openSchool: boolean;
public openGroup: boolean;
public openGroupEdit: boolean;
public group: Group;
public groups: any;
public groupSelect: any;

  constructor(
    private service: ServiceService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.open = true;
    this.openSchool = false;
    this.openGroup = false;
    this.openGroupEdit = false;
    this.school = this.service.selected;
    this.groupSelect = this.service.selectedGroup;
    this.getGroup();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(50), Validators.maxLength(50), Validators.required])],
      quantity: [Number, Validators.required],
      idSchool: this.school.id
    });
  }

  enterGroup() {
    this.load = false;
    this.open = false;
    this.openSchool = false;
    this.openGroup = true;
    this.openGroupEdit = false;
  }


  edit() {
    this.load = false;
    this.open = false;
    this.openSchool = true;
    this.openGroup = false;
    this.openGroupEdit = false;
  }

  close() {
    this.open = true;
    this.openSchool = false;
    this.openGroup = false;
    this.openGroupEdit = false;
  }

  save() {
    this.httpService.updateSchools(this.school.id, this.school).subscribe((res) => {
      this.loading();
    });
  }

  saveGroup() {
    this.httpService.updateGroup(this.groupSelect.id, this.groupSelect).subscribe((res) => {
      this.loading();
    });
  }


  createGroup() {
    this.httpService.createGroup(this.form.value).subscribe((res) => {
      this.loading();
      this.form.reset();
      this.buildForm();
    });

  }

  editGroup(group) {
    this.load = false;
    this.service.selectedGroup = group;
    this.groupSelect = this.service.selectedGroup;
    this.open = false;
    this.openSchool = false;
    this.openGroup = false;
    this.openGroupEdit = true;
  }

  getGroup() {
    this.httpService.getGroup().subscribe((res) => {
      const allGroups = res;
      this.groups = allGroups.filter(r => r.idSchool === this.school.id );
      console.log(this.groups);
    });
  }

  removeSchool(id: string) {
    if (this.groups.length === 0) {
    this.httpService.deleteSchoolsId(id).subscribe((res) => {
      alert('A escola foi removido com sucesso!');
      this.router.navigateByUrl('/dashboard');
    });
    } else {
      alert('Não é possível excluir a entidade Escola enquanto existirem Classes!');
    }
  }

  removeGroup(id: string) {
    this.httpService.deleteGroupId(id).subscribe((res) => {
     alert('A classe foi removido com sucesso!');
     this.loading();
    });
  }

  loading() {
    this.load = true;
    setTimeout(() => {
      this.open = true;
      this.openSchool = false;
      this.openGroup = false;
      this.openGroupEdit = false;
      this.getGroup();
    }, 2000);
  }
}
