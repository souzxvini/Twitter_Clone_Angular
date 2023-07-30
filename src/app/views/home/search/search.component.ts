import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('searchButton') searchButtonRef!: ElementRef<HTMLDivElement>;

  constructor(){

  }

  focusInput() {
    this.searchInputRef.nativeElement.focus();

     // Adicione uma nova classe à div searchButton quando ela for clicada
     this.searchButtonRef.nativeElement.classList.add('clicked');
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any) {
    // Verifica se o clique foi fora da div searchButton
    if (!this.searchButtonRef.nativeElement.contains(target)) {
      this.searchButtonRef.nativeElement.classList.remove('clicked');
    }
  }
}
