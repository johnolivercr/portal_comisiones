import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { HomeComponent } from "../home/home.component";

export const LayoutRoutes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {
                path: '', component: HomeComponent
            }
        ]
    }
]