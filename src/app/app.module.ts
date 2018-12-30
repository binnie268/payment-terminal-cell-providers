import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RefillFormComponent } from './refill-form/refill-form.component';
import { ResponseDialogComponent } from './refill-form/response-dialog.component';

import { ProviderService } from './providers.service';
import { ValidationService } from './validation.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RefillFormComponent,
    ResponseDialogComponent,
  ],
  entryComponents: [ResponseDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ProviderService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
