import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)



  apiError:string = ''
isLoading:boolean =false
registerForm:FormGroup = new FormGroup({

  name:new FormControl(null,[ Validators.required ,Validators.minLength(3)  , Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required , Validators.email]),
  password:new FormControl(null,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
  age:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/) ]),

})

registerSubmit(form:FormGroup){
this.isLoading = true
  // console.log(form);
  this._AuthService.signUp(form.value).subscribe({
    next: (res) => {
      // console.log(res)
      this._Router.navigate(['/signin'])

    },
    error: (err) => {
      // console.error(err)
      this.apiError = err.error.msg
      this.isLoading =false


    }
  })

}


}

