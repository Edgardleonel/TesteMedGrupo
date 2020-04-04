import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from './../services/service.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

@Input() public search: boolean = false;
public schools: any;
public nSchools: number;
public groups: any;
public nGroups: number;
public nAlunos: number;
public schoolsSearch: any;



  constructor(
    private httpService: HttpService,
    private service: ServiceService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.load();
    this.search = false;
  }

  openSearch() {
    this.search = true;
  }

  closeSearch() {
    this.search = false;
    this.load();
  }


  load() {
    this.httpService.getSchools().subscribe((res) => {
      this.schools = res;
      this.schoolsSearch = this.schools;
      console.log('escola para busca', this.schoolsSearch);
      console.log(this.schools);
      this.nSchools = this.schools.length;
    });
    this.httpService.getGroup().subscribe((res) => {
      this.groups = res;
      this.nGroups = this.groups.length;
      const alunos = this.groups.map(r => r.quantity);
      console.log('alunos', alunos);
      this.nAlunos = alunos.reduce((total, numero) => {
        return total + numero;
       }, 0);
    });
  }

  open(school) {
    this.service.selected = school;
    console.log('Escola selecionada', this.service.selected);
    this.router.navigateByUrl('/school-details');
  }


  public setFilteredItems(event) {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    this.schools = this.filterItems(searchTerm);
  }

    public filterItems(searchTerm) {
      if ( searchTerm.length === 0 ) { return this.schoolsSearch; }
      return this.schoolsSearch.filter((item) => {
          return item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.address.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('auth');
  }


}
