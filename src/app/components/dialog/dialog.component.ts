import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NotesService } from '../../core/services/notes.service';
import { log } from 'console';
import { Notedata } from '../../core/interfaces/notedata';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatFormFieldModule ,ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {


  private readonly _NotesService = inject(NotesService)

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notedata,
  ) {}



noteForm:FormGroup = new FormGroup({
  title: new FormControl(this.data.title? this.data.title :''),
  content:new FormControl(this.data.content? this.data.content:'')
})

noteSubmit(form:FormGroup):void{
  if (!this.data.title && !this.data.content) {
    this.addNote(form.value)

  }else{
    this.updateNote(form.value)
  }

}


addNote(newNote:Notedata):void{
  this._NotesService.addNotes(newNote).subscribe({
    next:(res)=>{
      // console.log(res);
      this.dialogRef.close();

    },
    error:(err)=>{console.log(err);
    }
  })

}


updateNote(updatedNote:Notedata):void{
  this._NotesService.updateNote(updatedNote , this.data._id).subscribe({
    next:(res)=>{
      // console.log(res);
      this.dialogRef.close();
    },
    error:(err)=>{console.log(err)}
  })
}
}
