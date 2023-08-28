import { LOCALE_ID, NgModule } from '@angular/core';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_TABS_CONFIG, MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatRippleModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import '@angular/common/locales/global/pt';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// CDK
import { OverlayModule } from '@angular/cdk/overlay';

// Formata datas para DD/MM/AAAA para PT-BR (Mantendo o '0' Ex: 01/01/2020)
export const MAT_MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'L'
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM/YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMM/YYYY'
  },
};

export function localeFactory() {
  if (localStorage.getItem('Language')) { // Se existir 'Language' no localstorage
    return localStorage.getItem('Language');
  } else { // Se não existir 'Language' no localstorage
    return 'pt';
  }
}

export function datePipeFactory() {
  if (localStorage.getItem('Language')) { // Se existir 'Language' no localstorage
    switch (localStorage.getItem('Language')) {
      case 'en':
        return { dateFormat: 'MM/dd/yyyy' };

      default:
        return { dateFormat: 'dd/MM/yyyy' };
    }
  } else {
    return { dateFormat: 'dd/MM/yyyy' };
  }
}

@NgModule({
  imports: [
    MatTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatToolbarModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    MatChipsModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MatTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatToolbarModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    MatChipsModule,
    OverlayModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: localeFactory },
    { provide: MAT_DATE_LOCALE, useFactory: localeFactory },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useFactory: datePipeFactory },
    // Angular Material Global Options
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { float: 'never' } },
  ]
})

export class SharedMaterialModule { }
