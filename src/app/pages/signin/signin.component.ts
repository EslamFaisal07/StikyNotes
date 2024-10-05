import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
isLoading:boolean = false
apiError : string = ''

private readonly _Router  = inject(Router)

  private readonly _FormBuilder  = inject(FormBuilder)
  private readonly _AuthService  = inject(AuthService)


  loginForm:FormGroup =this._FormBuilder.group({
email:[null , [Validators.required , Validators.email]],
password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
  })

  loginSubmit(form:FormGroup):void{
    this.isLoading=true
// console.log(form);
this._AuthService.signIn(form.value).subscribe({
  next:(res)=>{
    // console.log(res)

    this._Router.navigate(['/notes'])
    localStorage.setItem('token', '3b8ny__'+ res.token)

  },
  error:(err)=>{
    // console.log(err);
this.apiError = err.error.msg
this.isLoading = false


  }
})


  }

}
