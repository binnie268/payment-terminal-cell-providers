import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProviderService {
  constructor(private http: HttpClient) {}

  private providerListUrl = './assets/providers.json';
  private currencyListUrl = './assets/currency.json';
  private submitFormUrl = '';
  // in real backend server, only one response is returned.
  private urlResponseObject = {
    'Beeline' : [
      './assets/Beelinerefillsubmittederror.json',
      './assets/Beelinerefillsubmittedsuccess.json'],
    'Megafon': [
      './assets/Megafonefillsubmittederror.json',
      './assets/Megafonefillsubmittedsuccess.json'
    ],
    'MTS': [
      './assets/MTSrefillsubmittederror.json',
      './assets/MTSrefillsubmittedsuccess.json'
    ]
  };


  private operatorIdentifier = '';

  public getProviderList(): Observable<string[]> {
    return this.http.get(this.providerListUrl)
    .map((response) => {
      return response['results'];
    })
    .catch((err: HttpErrorResponse) => {

      console.error('An error occurred:', err.error);
      return Observable.throw(err.statusText);
    });
  }

  public getCurrencyList(): Observable<string[]> {
    return this.http.get(this.currencyListUrl)
    .map((response) => {
      return response['results'];
    })
    .catch((err: HttpErrorResponse) => {

      console.error('An error occurred:', err.error);
      return Observable.throw(err.statusText);
    });
  }

  public setOperatorIdentifier(operator: string) {
    this.operatorIdentifier = operator;
  }

  public getOperatorIdentifier() {
    return this.operatorIdentifier;
  }

  public submitRefillForm(form: any) {
    this.submitFormUrl = this.urlResponseObject[form.provider][Math.floor(Math.random() * this.urlResponseObject.Beeline.length)];
    console.log(this.submitFormUrl);
    return this.http.get(this.submitFormUrl)
    .map((response) => {
      return response['results'];
    })
    .catch((err: HttpErrorResponse) => {

      console.error('An error occurred:', err.error);
      return Observable.throw(err.statusText);
    });
  }
}
