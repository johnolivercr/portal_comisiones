import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { HomeComponent } from "../home/home.component";
import { SignInComponent } from "../sign-in/sign-in.component";
import { AccountComponent } from "../account/account.component";

export const LayoutRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'signin',
                component: SignInComponent
            },
            {
                path: 'account',
                component: AccountComponent
            }
        ]
    }
]