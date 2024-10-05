import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notedata } from '../interfaces/notedata';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
private readonly _HttpClient = inject(HttpClient)


addNotes(noteData:Notedata):Observable<any>{
  return this._HttpClient.post(`${environment.noteUrl}notes` ,
    noteData,
  {
    headers:{
      token:localStorage.getItem('token') || ''
    }
  }

)
}

getUserNotes():Observable<any>{
  return this._HttpClient.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
    headers:{
      token:localStorage.getItem("token")||''
    }
  })
}




deleteNotes(notesId:string):Observable<any>{
  return this._HttpClient.delete(`${environment.noteUrl}notes/${notesId}` , {
    headers:{
      token:localStorage.getItem('token') || ''
    }
  })
}





updateNote( noteData:Notedata,notesId:string ):Observable<any>{
  return this._HttpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${notesId}` ,noteData, {
    headers:{
      token:localStorage.getItem('token') || ''
    }
  })
}
}
