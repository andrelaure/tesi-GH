import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { CustomOAuthService } from './services/custom-oauth.service';
import LocalStorageService from './services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private oauthService: CustomOAuthService,
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        if (!environment.onlyDesignMode) {
            this.oauthService.login();
        }
    }
}
