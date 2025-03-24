import { Routes } from "@angular/router";
import { ConfigComponent } from "./components/config/config.component";

export const routes: Routes = [
    { path: 'config', component: ConfigComponent },

    { path: '', redirectTo: '/config', pathMatch: 'full' },
  ];
