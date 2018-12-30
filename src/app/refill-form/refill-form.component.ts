import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../providers.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResponseDialogComponent } from './response-dialog.component';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-refill-form',
  templateUrl: './refill-form.component.html',
  styleUrls: ['./refill-form.component.css']
})
export class RefillFormComponent implements OnInit {
  public operatorIdentifier: string;
  public currencyList: string[];
  public isSuccess: boolean;
  public message: string;

  refillForm = this.formBuilder.group({
    provider: [this.operatorIdentifier],
    phoneNumber: ['', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]],
    amount: ['',
    [Validators.required,
    Validators.min(1),
    Validators.max(1000)]
  ]
  });

  constructor(
    private providerService: ProviderService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.operatorIdentifier = this.providerService.getOperatorIdentifier();
    this.refillForm.controls.provider.setValue(this.operatorIdentifier);
    this.providerService.getCurrencyList()
    .subscribe((response) => {
      this.currencyList = response;
    });
  }

  public getErrorMessage(controlName: string, control: FormControl) {
    return ValidationService.getErrorFormMessage(controlName, control);
  }

  public onSubmit() {
    this.providerService.submitRefillForm(this.refillForm.value)
    .subscribe((response => {
      this.isSuccess = response.success;
      this.message = response.message;
      this.openDialog();
    }));
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ResponseDialogComponent, {
      width: '250px',
      data: this.message
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isSuccess === true) {
        this.router.navigate(['/']);
      }
    });
  }

}
