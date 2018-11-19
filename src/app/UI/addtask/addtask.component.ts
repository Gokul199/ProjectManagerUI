import { Component, OnInit,TemplateRef } from '@angular/core';
import{Task} from 'src/app/Models/task';
import{Project} from 'src/app/Models/Project'
import{User} from 'src/app/Models/User'
import{NgModule} from '@angular/core';
import{FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{SharedService} from 'src/app/Services/sharedservice';
import{BsModalService,ModalModule,BsModalRef} from 'ngx-bootstrap/modal/'
import { getLocaleDateTimeFormat } from '@angular/common/src/i18n/locale_data_api';
import { DatePipe } from '@angular/common/src/pipes/date_pipe';
import { Observable } from 'rxjs/internal/Observable';
import { ParentTask } from 'src/app/Models/ParentTask';
import { ActivatedRoute,RouterModule } from '@angular/router/';
import { ROUTES } from '@angular/router/src/router_config_loader';
import { Router } from '@angular/router/';

@NgModule({  
imports:[
  [BrowserModule,FormsModule],
  BsModalService,
  BsModalRef,
  ModalModule.forRoot()]
})

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})


export class AddtaskComponent implements OnInit {

    modalRef:BsModalRef;
    projects:Observable<Project[]>;
    users:Observable<User[]>;
    parenttasks:Observable<ParentTask[]>;
    Tasks:Observable<Task[]>;
    TaskID:Number;
    ParentID:Number;
    ProjectID:Number;
    UserID:Number;
    Task:String;
    ParentTask:String;  
    EmployeeID:String;  
    Priority:Number;  
    StartDate:Date;
    EndDate:Date; 
    Status:String;  
    Project:String;    
    loadprojects:Project[];
    loadparent:ParentTask[];
    loaduser:User[];
    btnTaskTitle:String;
    parentdisable:boolean;
    parentCheck:boolean;
    searchproject:string;
    searchuser:string;
    searchparent;

  constructor(private sharedservice:SharedService,
  private modalService:BsModalService,
  private route:ActivatedRoute,
  private router:Router) {}

  ngOnInit() {    
    this.parentdisable=false;
    if(this.route.snapshot.paramMap.get('id')!=null)
    {
      const Id=this.route.snapshot.paramMap.get('id');       
      this.btnTaskTitle="Update Task";  
      this.sharedservice.getTask(parseInt(Id)).subscribe(data=>
      {
        this.TaskID=data.TaskID,
        this.Task=data.Task;
        this.ParentID=data.ParentID;
        this.ProjectID=data.ProjectID;
        this.UserID=data.UserID;
        this.ParentTask=data.ParentTask;
        this.EmployeeID=data.EmployeeID;
        this.Priority=data.Priority;
        this.StartDate=data.StartDate;
        this.EndDate=data.EndDate;
        this.Status=data.Status;
        this.Project=data.Project;               
      });         
    }  
    else{
      this.btnTaskTitle="Add Task";
    }  
    this.modalService.onHide.subscribe((e)=>{
      console.log('close',this.modalService.config.initialState);
    });
  }

  openModal(template:TemplateRef<any>)
  {        
    this.projects=this.sharedservice.getProjects();
    this.projects.subscribe(data=>{this.loadprojects=data});
    this.modalRef=this.modalService.show(template);
  }
  openParentModal(parenttemplate:TemplateRef<any>)
  {    
    this.parenttasks=this.sharedservice.loadParent();
    this.parenttasks.subscribe(data=>{this.loadparent=data});
    this.modalRef=this.modalService.show(parenttemplate);
  }
  openUserModal(usertemplate:TemplateRef<any>)
  {    
    this.users=this.sharedservice.getUsers();
    this.users.subscribe(data=>{this.loaduser=data});
    this.modalRef=this.modalService.show(usertemplate);
  }

  AddTask()
  {    
    let taskdata:Task={
      TaskID:0,
      ParentID:this.ParentID,
      ProjectID:this.ProjectID,
      UserID:this.UserID,
      Task:this.Task,
      ParentTask:this.ParentTask, 
      EmployeeID:this.EmployeeID, 
      Priority:this.Priority,
      StartDate:this.StartDate,
      EndDate:this.EndDate,
      Status:"",
      Project:this.Project      

    };
    if(this.btnTaskTitle=="Add Task")
    {
      this.sharedservice.addTask(taskdata).subscribe(()=>{});      
    }
    else if(this.btnTaskTitle=="Add Parent")
    {
      let lstParent={
        ParentID:0,
        ParentTask:this.Task
      }
      this.sharedservice.addParent(lstParent).subscribe(()=>{});     
      this.parentdisable=false;
      this.btnTaskTitle="Add Task"; 
    }
    else
    {
      this.sharedservice.updateTask(this.TaskID,taskdata).subscribe(()=>{});      
    }
    this.ResetFields();
  }

  ResetFields()
  {
    this.Task="";
    this.ParentTask=null;
    this.Priority=null;
    this.StartDate=null;
    this.EndDate=null;
    this.parentCheck=null;
    this.Project="";
    this.EmployeeID="";    
  }  

  getSelectedProject(ID,ProjectName)
  {    
    this.ProjectID=ID;
    this.Project=ProjectName;
    this.modalRef.hide();
  }
  getSelectedParent(ID,ParentTaskName)
  {
    this.ParentID=ID;
    this.ParentTask=ParentTaskName;
    this.modalRef.hide();
  }
  getSelectedUser(ID,EmployeeID)
  {
    this.UserID=ID;
    this.EmployeeID=EmployeeID;
    this.modalRef.hide();
  }
  AddParent()
  {   
    if(this.parentCheck==true) 
    {
      this.btnTaskTitle="Add Parent"
      this.parentdisable=true;
    }
    else if(this.parentCheck==false) 
    {
      this.btnTaskTitle="Add Task"
      this.parentdisable=false; 
    }
  }
  filterproject()
  {
    if(this.searchproject!=null&&this.searchproject!="")
    {
      this.loadprojects=this.loadprojects.filter(data=>data.Project.startsWith(this.searchproject));
    }
    else{
      this.projects.subscribe(data=>{this.loadprojects=data});
    }
  }
  filteruser()
  {
    if(this.searchuser!=null&&this.searchuser!="")
    {
      this.loaduser=this.loaduser.filter(data=>data.EmployeeID.startsWith(this.searchuser));
    }
    else{
      this.users.subscribe(data=>{this.loaduser=data});
    }
  }
  filterparent()
  {
    if(this.searchparent!=null&&this.searchparent!="")
    {
      this.loadparent=this.loadparent.filter(data=>data.ParentTask.startsWith(this.searchparent));
    }
    else{
      this.parenttasks.subscribe(data=>{this.loadparent=data});
    }
  }
}
