import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateBoardComponent } from './create-board/create-board.component';
//import { NotedisplayComponent } from './notedisplay/notedisplay.component'
import { AuthGuard } from './auth-guard.service';
import { FacebookComponent } from './facebook/facebook.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';


const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'auth/facebook/callback', component: FacebookComponent},
    {path:'create',component: CreateBoardComponent, canActivate:[AuthGuard]},
    {path:'explore',component: ExplorePageComponent, canActivate:[AuthGuard]},
    {path:'profile',component: ProfilePageComponent,canActivate:[AuthGuard]}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = []
