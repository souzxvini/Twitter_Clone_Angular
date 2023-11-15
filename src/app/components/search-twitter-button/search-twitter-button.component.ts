import { BreakpointObserver } from '@angular/cdk/layout';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, map, of, switchMap } from 'rxjs';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { ModalClearHistoricComponent } from './modal-clear-historic/modal-clear-historic.component';

@Component({
  selector: 'app-search-twitter-button',
  templateUrl: './search-twitter-button.component.html',
  styleUrls: ['./search-twitter-button.component.scss']
})
export class SearchTwitterButtonComponent {
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('searchButton') searchButtonRef!: ElementRef<HTMLDivElement>;
  @ViewChild('filteredProfilesPanel') filteredProfilesPanel!: ElementRef<HTMLDivElement>;
  @Input() filteredProfilesPanelState: boolean;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() searchvalue: string;

  filteredProfiles: any[] = [];
  searchHistoric: any[] = [];

  searchInputValue = null;
  searchInputSubject = new Subject<string>();
  latestSearchedText: string;

  cdkConnectedOverlayPositions: ConnectedPosition[] = [{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' }];

  setProfilePhoto = setProfilePhoto;

  loadedFilteredUsers = true;
  loaded = false;

  isMobileSize: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private accountsService: AccountsService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {
    //Search profiles
    this.searchInputSubject.pipe(
      debounceTime(350),
      switchMap(value => of(value))
    ).subscribe((value) => {
      this.latestSearchedText = value;
      this.getProfilesByUsername(value);
    });
  }

  ngOnInit() {
    if(this.searchvalue){
      this.searchInputValue = this.searchvalue;
      this.latestSearchedText = this.searchvalue;
      this.getProfilesByUsername(this.searchInputValue);
    }
    this.getSearchHistoric();
  }

  getSearchHistoric() {
    this.accountsService.getSearchHistoric().subscribe({
      next: (res) => {
        this.searchHistoric = res;
      }
    })
  }

  focusInput() {
    this.filteredProfilesPanelState = true;
    this.searchInputRef.nativeElement.focus();

    // Adicione uma nova classe à div searchButton quando ela for clicada
    this.searchButtonRef.nativeElement.classList.add('clicked');
    this.newItemEvent.emit(true);
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any) {
    // Verifica se o clique foi fora da div searchButton
    if (!this.searchButtonRef.nativeElement.contains(target)) {
      this.searchButtonRef.nativeElement.classList.remove('clicked');
    }

    if (this.filteredProfilesPanel) {
      this.breakpointObserver
        .observe(["(max-width: 498px)"])
        .pipe(map((result) => result.matches))
        .subscribe((matches) => {
          if (!matches) {
            if (!this.filteredProfilesPanel.nativeElement.contains(target) && !this.searchButtonRef.nativeElement.contains(target)) {

              const backdrop = document.querySelector('.modalStyleBackdrop');
              if (backdrop && backdrop.contains(target)) {
                return; // Não faça nada se o clique foi no backdrop
              }

              this.filteredProfilesPanelState = false;
            }
          }
        });
    }
  }

  searchAccounts(event) {
    this.searchInputValue = event.target.value.trim();

    if (this.searchInputValue) {
      if (event.key === 'Enter') {
        this.searchByText();
      } else {
        this.searchInputSubject.next(event.target.value);
      }
    }
    else {
      this.filteredProfiles = [];
      this.loaded = false;
    }
  }

  searchByText(searchByText?: string){
    this.filteredProfilesPanelState = false;
    this.postSearchHistoric(null, searchByText ? searchByText : this.latestSearchedText);
    this.router.navigate(['search', searchByText ? searchByText : this.latestSearchedText]);
  }

  getProfilesByUsername(searchInputValue) {
    this.loadedFilteredUsers = false;
    this.accountsService.getProfilesByUsername(searchInputValue, 0, 12).subscribe({
      next: (res) => {
        setTimeout(() => {
          if (this.searchInputValue) {
            this.filteredProfiles = res;
          } else {
            this.filteredProfiles = [];
          }
          this.loadedFilteredUsers = true;
          this.loaded = true;
        }, 300);
      }
    })
  }

  postSearchHistoric(username: string, text: string) {
    const payload = {
      targetUserIdentifier: username ? username : null,
      text: text ? text : null
    }

    this.accountsService.postSearchHistoric(payload).subscribe({
      complete: () => {
        this.getSearchHistoric();
      }
    })
  }

  clearHistoric() {
    const dialogRef = this.dialog.open(ModalClearHistoricComponent, {
      width: '320px',
      panelClass: 'bordered-dialog',
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.searchHistoric = [];
          this.filteredProfilesPanelState = true;
        }
      }
    })
  }

  deleteFromHistoric(identifier: string) {
    const searchHistoricBackup = this.searchHistoric;
    this.searchHistoric = this.searchHistoric.filter(h => h.identifier != identifier);
    this.accountsService.deleteFromHistoric(identifier).subscribe({
      error: () => {
        this.searchHistoric = searchHistoricBackup;
      }
    })
  }

  redirectToProfile(username: string) {
    this.loaded = false;
    this.filteredProfilesPanelState = false;
    this.newItemEvent.emit(false);
    this.searchInputValue = '';
    this.filteredProfiles = [];
    this.postSearchHistoric(username, null);
    this.accountsService.clearUserData();
    this.router.navigate(['profile', username]);
  }


}
