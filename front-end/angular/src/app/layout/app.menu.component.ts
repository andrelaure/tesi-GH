import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { LayoutService } from "./service/app.layout.service";
import { environment } from "src/environments/environment";
import { CustomOAuthService } from "src/app/services/custom-oauth.service";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private oauthService: CustomOAuthService
    ) {}

    async ngOnInit() {
        if (environment.onlyDesignMode) {
            this.model = [
                {
                    label: "Notifiche",
                    icon: "pi pi-fw pi-bell",
                    routerLink: ["/notice"],

                },
                
                {
                    label: "Prenota",
                    icon: "pi pi-fw pi-calendar-plus",
                    routerLink: ["/reservation"],

                },
            ];
        } else if (await this.oauthService.isAdminUser()) {
            this.model = [
                {
                    label: "Notifiche",
                    icon: "pi pi-fw pi-bell",
                    routerLink: ["/notice"],

                },
                {
                    label: "Prenota",
                    icon: "pi pi-fw pi-calendar-plus",
                    routerLink: ["/reservation"],

                },
                
                {
                    label: "Panoramica uffici (A)",
                    icon: "pi pi-fw pi-star",
                    routerLink: ["/viewsManagement"],

                },
                {
                    label: "Gestione uffici (A)",
                    icon: "pi pi-fw pi-star",
                    routerLink: ["/officesManagement"],

                },
                {
                    label: "Gestione notifiche (A)",
                    icon: "pi pi-fw pi-star",
                    routerLink: ["/noticesManagement"],

                }
            ];
        } else if (await this.oauthService.isBaseUser()) {
            this.model = [
                {
                    label: "Notifiche",
                    icon: "pi pi-fw pi-bell",
                    routerLink: ["/notice"],

                },
                {
                    label: "Prenota",
                    icon: "pi pi-fw pi-calendar-plus",
                    routerLink: ["/reservation"],

                },
                /*
                {
                    label: "Profilo personale",
                    icon: "pi pi-fw pi-profile",
                    routerLink: ["/profile"],

                }
                */
            ];
        } else {
            this.model = [];
        }
        this.model = [{ label: 'Main Menu', items: [ ...this.model ] }]
    }
}
