import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ListNotesPage } from './list-notes.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ListNotesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [ListNotesPage]
})
export class ListNotesPageModule {}
