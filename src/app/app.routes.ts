import { Routes } from '@angular/router';
import { PageStartsComponent } from './pages/page-starts/page-starts.component';

export const routes: Routes = [
    {path: '', redirectTo: 'page-starts', pathMatch: 'full'},
    {path: 'page-starts', component: PageStartsComponent },
];
