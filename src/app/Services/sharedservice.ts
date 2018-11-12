import { Injectable } from '@angular/core';
import { Task } from 'src/app/Models/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials' : 'true'})
};
 
 
@Injectable({
 providedIn: 'root'
})
 
 
export class SharedService {
 
  tasksUrl: string = "http://localhost/TaskManager.API/api/task";
 
  /** Generic Error Handler */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead 
      return of(result as T);
    };
  }
 
  constructor(private http: HttpClient) {
  }
 
  /** Service to Add a Task */  
  addTask(task:Task)
  {    
    return this.http.post<Task>(this.tasksUrl,JSON.stringify(task),httpOptions);
  }
 
  /** Service to Gat All Tasks */
  getTasks(): Observable<Task[]> {    
    return this.http.get<Task[]>(this.tasksUrl);
  }

  getTask(ID:number):Observable<Task>{    
    const url=`${this.tasksUrl}/${ID}`;
    return this.http.get<Task>(url);
  }
 
  /** Service to Update Task */
  updateTask(id: Number, task: Task): Observable<any> {        
    const url = `${this.tasksUrl}/${id}`;    
    return this.http.put(url, JSON.stringify(task), httpOptions);
  }
 
  /** Service to End Task */
  endTask(id: Number):Observable<any> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url);  
  }  
}

 