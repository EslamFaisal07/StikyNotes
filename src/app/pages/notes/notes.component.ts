import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import {Component, inject, OnInit} from '@angular/core';
import {
  MatDialog,

} from '@angular/material/dialog';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { NotesService } from '../../core/services/notes.service';
import { Notedata } from '../../core/interfaces/notedata';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgStyle, SideNavComponent , SearchPipe , FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {

private readonly _NotesService = inject(NotesService)

allNotes : Notedata[] = []

searchInput:string =''

ngOnInit(): void {


// this.getUserNotes()

this._NotesService.getUserNotes().subscribe({
  next: (res) => {
      this.allNotes = res.notes;
      // console.log(res);



  },
  error: (err) => {
    // console.log(err.error.statusCode);
    if (err.error.msg === "not notes found") {
      this.allNotes = [];
    }



  },

})

}



  constructor(public dialog: MatDialog) {}

  openDialog(noteData?:Notedata): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '500px',
      data: {title:noteData?.title , content:noteData?.content , _id:noteData?._id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.ngOnInit()

    });
  }


deleteNote(id:string , noteIndex:number):void{


Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    }).then(()=>{
      this._NotesService.deleteNotes(id).subscribe({
        next: (res) => {


                this.allNotes.splice(noteIndex , 1)

this.allNotes = [...this.allNotes]


        }

      }
    )

    })
  }
});

}


updateNote(noteData:Notedata , noteIndex:number):void{

this.openDialog({
  title:noteData.title,
  content:noteData.content,
  _id:noteData._id
})


}

}
