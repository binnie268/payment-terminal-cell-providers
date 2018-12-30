import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../providers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public providerList: string[];

  constructor(
    private providersService: ProviderService,
    private router: Router
    ) { }

  ngOnInit() {
    this.providersService.getProviderList()
    .subscribe(response => {
      this.providerList = response;
    });
  }

  public initiateCall(name: string) {
    this.providersService.setOperatorIdentifier(name);
    this.redirectToRefill(name);
  }

  public redirectToRefill(name: string) {
    this.router.navigate(['/refill']);
  }
}
