import { Injectable } from '@angular/core';
import { Task } from 'src/app/Models/task';
import { Project } from 'src/app/Models/project';
import { User } from 'src/app/Models/user';
import { ParentTask } from 'src/app/Models/parenttask';
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
 
  tasksUrl: string = "http://localhost/TaskManager.API/api/project";
  projectUrl:string="http://localhost/TaskManager.API";
 
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
    var newUrl=this.projectUrl+"/AddTask";
    return this.http.post<Task>(newUrl,JSON.stringify(task),httpOptions);
  }
 
  /** Service to Gat All Tasks */
  getTasks(): Observable<Task[]> { 
    var newUrl=this.projectUrl+"/GetAllTasks";   
    return this.http.get<Task[]>(newUrl);
  }

  getTask(ID:number):Observable<Task>{    
    const url=`${this.projectUrl+"/GetTask"}/${ID}`;
    return this.http.get<Task>(url);
  }
 
  /** Service to Update Task */
  updateTask(id: Number, task: Task): Observable<any> {        
    const url = `${this.projectUrl+"/UpdateTask"}/${id}`;    
    return this.http.put(url, JSON.stringify(task), httpOptions);
  }
 
  /** Service to End Task */
  endTask(id: Number):Observable<any> {
    const url = `${this.projectUrl+"DeleteTask"}/${id}`;
    return this.http.delete(url);  
  }  

  addProject(project:Project)
  {    
    var newUrl=this.projectUrl+"/AddProject";
    return this.http.post<Project>(newUrl,JSON.stringify(project),httpOptions);
  }
 
  /** Service to Gat All Tasks */
  getProjects(): Observable<Project[]> { 
    var newUrl=this.projectUrl+"/GetAllProjects";   
    return this.http.get<Project[]>(newUrl);
  }
 
  /** Service to Update Task */
  updateProject(id: Number, project: Project): Observable<any> {        
    const url = `${this.projectUrl+"/UpdateProject"}/${id}`;    
    return this.http.put(url, JSON.stringify(project), httpOptions);
  }
 
  /** Service to End Task */
  endProject(id: Number):Observable<any> {
    const url = `${this.projectUrl+"DeleteProject"}/${id}`;
    return this.http.delete(url);  
  }  

  addUser(user:User)
  {    
    var newUrl=this.projectUrl+"/AddUser";
    return this.http.post<Project>(newUrl,JSON.stringify(user),httpOptions);
  }
 
  /** Service to Gat All Tasks */
  getUsers(): Observable<User[]> { 
    var newUrl=this.projectUrl+"/GetAllUsers";   
    return this.http.get<User[]>(newUrl);
  }
 
  /** Service to Update Task */
  updateUser(id: Number, user: User): Observable<any> {        
    const url = `${this.projectUrl+"/UpdateUser"}/${id}`;    
    return this.http.put(url, JSON.stringify(user), httpOptions);
  }
 
  /** Service to End Task */
  endUser(id: Number):Observable<any> {
    const url = `${this.projectUrl+"DeleteUser"}/${id}`;
    return this.http.delete(url);  
  }  

  loadProject(projectname:string):Observable<Project>{
    const url=`${this.projectUrl+"/GetProject"}/${projectname}`;
    return this.http.get<Project>(url);
  }
  loadUser(username:string):Observable<User>{
    const url=`${this.projectUrl+"/GetUser"}/${username}`;
    return this.http.get<User>(url);
  }
  loadParent():Observable<ParentTask[]>{
    var newUrl=this.projectUrl+"/GetParentTasks";   
    return this.http.get<ParentTask[]>(newUrl);
  }
  addParent(parent:ParentTask)
  {    
    var newUrl=this.projectUrl+"/AddParent";
    return this.http.post<ParentTask>(newUrl,JSON.stringify(parent),httpOptions);
  }
  
}

 