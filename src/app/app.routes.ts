import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { userdataGuard } from './userdata.guard';
import { verifyUserGuard } from './verify-user.guard';

export const routes: Routes = [
{path:'', redirectTo:'signin' ,pathMatch:"full" },
{path:'signin' ,component:SigninComponent , title:'sign in'  , canActivate:[verifyUserGuard]},
{path:'signup' ,component:SignupComponent , title:'sign up'},


{path:'notes' ,canActivate:[userdataGuard] ,component:NotesComponent , title:'Notes'},
{path:'**' ,component:NotfoundComponent , title:'Page NotFound'},


];
