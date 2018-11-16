import { Component, OnInit,TemplateRef } from '@angular/core';
import { Project } from 'src/app/Models/Project';
import { User } from 'src/app/Models/user';
import { ActivatedRoute,RouterModule } from '@angular/router/';
import { ROUTES } from '@angular/router/src/router_config_loader';
import { Router } from '@angular/router/';
import{SharedService} from 'src/app/Services/sharedservice';
import { Observable } from 'rxjs/internal/Observable';
import{FormsModule,FormGroup} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{BsModalService,ModalModule,BsModalRef} from 'ngx-bootstrap/modal/'
import{NgModule} from '@angular/core';

@NgModule({  
  imports:[
    [BrowserModule,FormsModule],
    BsModalService,
    BsModalRef,
    ModalModule.forRoot()]
  })

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  Projects:Observable<Project[]>;
  User:Observable<User[]>;
  filteredProject:Project[];
  loadManager:User[];
  filterProject:string;
  btnProjectTitle:String;
  ProjectID:Number;
  Project:String;
  ProjectStartDate:Date;
  ProjectEndDate:Date;
  ProjectPriority:Number;
  ProjectManager:String; 
  modalRef:BsModalRef; 
  UserID:string;
  EmployeeID:string;
  DateCheck:boolean;
  errormessage:string;
  searchmanager:string;
  

  constructor(private route:ActivatedRoute,
    private router:Router,
    private sharedservice:SharedService,
    private modalService:BsModalService) { }

  ngOnInit() {    
    this.DateCheck=false;
    this.btnProjectTitle="Add Project";
    this.GetProjects();
  }
  openModal(template:TemplateRef<any>)
  {        
    this.User=this.sharedservice.getUsers();
    this.User.subscribe(data=>{this.loadManager=data});
    this.modalRef=this.modalService.show(template);
  }
  GetProjects()
  {    
    this.Projects=this.sharedservice.getProjects();
    this.Projects.subscribe(data=>{this.filteredProject=data});
  }
  AddProject()
  {    
    let projectData:Project={
      ProjectID:0,
      Project:this.Project,
      ProjectStartDate:this.ProjectStartDate,
      ProjectEndDate:this.ProjectEndDate,
      ProjectPriority:this.ProjectPriority,
      ProjectManager:this.ProjectManager,
      NumberOfTasks:0,
      Completed:"Active"
    }
    if(this.btnProjectTitle=="Add Project")
    {
      this.sharedservice.addProject(projectData).subscribe(()=>{this.GetProjects();});
    }
    else
    {
      this.sharedservice.updateProject(this.ProjectID,projectData).subscribe(()=>{this.GetProjects();});
    }
    this.ResetFields();    
  }
  editProject(ID)
  {
    this.btnProjectTitle="Update Project";
    this.ProjectID=ID;
    this.Project=this.filteredProject.find(data=>data.ProjectID=ID).Project;
    this.ProjectStartDate=this.filteredProject.find(data=>data.ProjectID=ID).ProjectStartDate;
    this.ProjectEndDate=this.filteredProject.find(data=>data.ProjectID=ID).ProjectEndDate;
    this.ProjectPriority=this.filteredProject.find(data=>data.ProjectID=ID).ProjectPriority;
    this.ProjectManager=this.filteredProject.find(data=>data.ProjectID=ID).ProjectManager;
    this.ResetFields();    
  }
  deleteProject(ID)
  {
    this.sharedservice.endProject(ID).subscribe(()=>{this.GetProjects();});      
  }
  ResetFields()
  {
    this.Project="";
    this.ProjectStartDate=null;
    this.ProjectEndDate=null;
    this.ProjectPriority=0;
    this.ProjectManager="";
    this.btnProjectTitle="Add Project";
  }
  filter()  
  {
    if(this.filterProject!=null&&this.filterProject!="")
    {
      this.filteredProject=this.filteredProject.filter(data=>data.Project.startsWith(this.filterProject));
    }
    else{
      this.Projects.subscribe(data=>{this.filteredProject=data});
    }
  }
  sort(field)
  {
    if(field=="StartDate")
    {      
      this.filteredProject.sort((a:any,b:any)=>{
        if(a.StartDate-b.StartDate)
        return -1;
        else if(b.StartDate-a.StartDate)
        return 1;
        else
        return 0;
      });
    }
    if(field=="EndDate")
    {      
      this.filteredProject.sort((a:any,b:any)=>{
        if(a.EndDate-b.EndDate)
        return -1;
        else if(b.EndDate-a.EndDate)
        return 1;
        else
        return 0;
      });
    }
    if(field=="Priority")
    {      
      this.filteredProject.sort((a:any,b:any)=>{
        if(a.Priority<b.Priority)
        return -1;
        else if(b.Priority<a.Priority)
        return 1;
        else
        return 0;
      });
    }
    if(field=="Completed")
    {      
      this.filteredProject.sort((a:any,b:any)=>{
        if(a.Completed<b.Completed)
        return -1;
        else if(b.Completed<a.Completed)
        return 1;
        else
        return 0;
      });
    }
  }
  reloadData()
  {
    if(this.Project=='' || this.Project==null)
    {      
      this.Projects.subscribe(data=>{this.filteredProject=data});
    }
  }

  getSelectedUser(ID,EmployeeID)
  {
    this.UserID=ID;
    this.ProjectManager=EmployeeID;
    this.modalRef.hide();
  }

  ValidateDates()
  {    
    if(this.ProjectStartDate!=null&&this.ProjectEndDate!=null)
    {
      if(this.ProjectStartDate>this.ProjectEndDate)
      {
        this.ProjectEndDate=null;
      }
    }
  }
  filterManager()
  {
    if(this.searchmanager!=null&&this.searchmanager!="")
    {
      this.loadManager=this.loadManager.filter(data=>data.EmployeeID.startsWith(this.searchmanager));
    }
    else
    {
      this.User.subscribe(data=>{this.loadManager=data});
    }
  }

}
