import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CreateBoardComponent } from './create-board/create-board.component';
//import { NotedisplayComponent } from './notedisplay/notedisplay.component'
import { AuthGuard } from './auth-guard.service';
import { FacebookComponent } from './facebook/facebook.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'auth/facebook/callback', component: FacebookComponent},
//    {path:'notes',component: NotedisplayComponent,canActivate:[AuthGuard]},
    {path:'create',component: CreateBoardComponent, canActivate:[AuthGuard]},
    {path:'users',component: UsersComponent, canActivate:[AuthGuard]},
    {path:'profile',component:ProfilePageComponent }
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
