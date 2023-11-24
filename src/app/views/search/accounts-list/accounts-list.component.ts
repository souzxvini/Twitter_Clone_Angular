import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {

  loaded = false;
  searchValue: string;
  filteredProfiles: any[] = [];

  constructor(
    private accountsService: AccountsService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private globalVariablesService: GlobalVariablesService
  ){}

  ngOnInit(){
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.searchValue = params.get('searchvalue');
    });

    this.getProfilesByUsername();
  }

  getProfilesByUsername() {
    this.loaded = false;
    this.accountsService.getProfilesByUsername(this.searchValue, 0, 12).subscribe({
      next: (res) => {
        setTimeout(() => {
            this.filteredProfiles = res;
            this.loaded = true;
        }, 300);
      }
    })
  }

  //Método para redirecionar o usuario logado para o perfil de outra pessoa
  redirectToProfile(profile: any) {

    if (profile.username == localStorage.getItem('userName')) {
      this.router.navigate(['profile']);
    } else {
      this.globalVariablesService.setAnotherUser(profile);

      // Navega para a nova URL 
      this.router.navigate(['profile', profile.username]);
    }
  }
}
