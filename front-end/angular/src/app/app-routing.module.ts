import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";

import { GuestUserGuard } from "./guards/guest-user.guard";
import { BaseUserGuard } from "./guards/base-user.guard";
import { VipUserGuard } from "./guards/vip-user.guard";
import { AdminUserGuard } from "./guards/admin-user.guard";
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UsersPageComponent } from "./pages/users-page/users-page.component";
import { FilesPageComponent } from "./pages/files-page/files-page.component";

import { NoticeComponent } from "./components/notice/notice.component";
import { ReservationComponent } from "./components/reservation/reservation.component";
import { OfficesManagementComponent } from "./components/admin/officesManagement/officesManagement.component";
import { NoticesManagementComponent } from "./components/admin/noticesManagement/noticesManagement.component";
import { ViewsManagementComponent } from "./components/admin/viewsManagement/viewsManagement.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: "", redirectTo: "/notice", pathMatch: "full" },
                {
                    path: "",
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: "notice",
                            component: NoticeComponent,
                            canActivate: [GuestUserGuard, BaseUserGuard, VipUserGuard, AdminUserGuard],
                            resolve: { noticeData: "NoticeResolver"},
                        },
                        {
                            path: "reservation",
                            component: ReservationComponent,
                            canActivate: [GuestUserGuard, BaseUserGuard, VipUserGuard, AdminUserGuard],
                        },       
                        
                        //  Admin
                        {
                            path: "officesManagement",
                            component: OfficesManagementComponent,
                            canActivate: [AdminUserGuard],
                            resolve: {officesData: "OfficesResolver"}
                        },                      
                        {
                            path: "viewsManagement",
                            component: ViewsManagementComponent,
                            canActivate: [AdminUserGuard],
                            resolve: {officesData: "OfficesResolver"}
                        },                        
                        {
                            path: "noticesManagement",
                            component: NoticesManagementComponent,
                            canActivate: [AdminUserGuard],
                            resolve: { noticeData: "NoticeResolver"},
                        },
                        
                        //non porta a nulla TODO
                        {
                            path: "files",
                            component: FilesPageComponent,
                            canActivate: [BaseUserGuard],
                        },
                        {
                            path: "users",
                            component: UsersPageComponent,
                            canActivate: [AdminUserGuard],
                            resolve: {
                                users: "UsersResolver",
                                groups: "GroupsResolver",
                            },
                        },
                    ],
                },
                { path: "error", component: AppErrorComponent },
                { path: "access", component: AppAccessdeniedComponent },
                { path: "notfound", component: AppNotfoundComponent },
                { path: "login", component: AppLoginComponent },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
    providers: [GuestUserGuard, BaseUserGuard, VipUserGuard, AdminUserGuard],
})
export class AppRoutingModule {}
