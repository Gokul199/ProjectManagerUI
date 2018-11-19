import { Component, OnInit,TemplateRef } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{Task} from 'src/app/Models/task';
import{Project} from 'src/app/Models/Project';
import{NgModule} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import{SharedService} from 'src/app/Services/sharedservice';
import{map,filter,scan} from 'rxjs/Operators'
import { DatePipe } from '@angular/common/';
import{BsModalService,ModalModule,BsModalRef} from 'ngx-bootstrap/modal/'

@NgModule({  
  imports:[
    [BrowserModule,FormsModule],
    BsModalService,
    BsModalRef,
    ModalModule.forRoot()]
  })

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
  providers:[DatePipe]})
export class ViewtaskComponent implements OnInit {

  modalRef:BsModalRef;
  projects:Observable<Project[]>;
  Tasks:Observable<Task[]>;
  filteredTasks:Task[]; 
  loadprojects:Project[];
  ProjectID:Number;
  Project:string;



  constructor(private sharedservice:SharedService,
    private datePipe:DatePipe,private modalService:BsModalService) { }

  ngOnInit() {
    
  }

  openModal(template:TemplateRef<any>)
  {    
    this.projects=this.sharedservice.getProjects();
    this.projects.subscribe(data=>{this.loadprojects=data});
    this.modalRef=this.modalService.show(template);
  }

  gettasks()
  {        
    this.Tasks=this.sharedservice.getTasks();
    this.Tasks.subscribe(data=>{this.filteredTasks=data});    
  }
  getTasksProject(ID)
  {
    debugger;
    this.gettasks();
    this.filteredTasks.filter(data=>data.ProjectID==ID);    
  }

  endTask(TaskID:Number)
  {    
    this.sharedservice.endTask(TaskID).subscribe(()=>{});
    //this.reloadData();
  }
  sort(field)
  {
    if(field=="StartDate")
    {      
      this.filteredTasks.sort((a:any,b:any)=>{
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
      this.filteredTasks.sort((a:any,b:any)=>{
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
      this.filteredTasks.sort((a:any,b:any)=>{
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
      this.filteredTasks.sort((a:any,b:any)=>{
        if(a.Completed<b.Completed)
        return -1;
        else if(b.Completed<a.Completed)
        return 1;
        else
        return 0;
      });
    }
  }

  getSelectedProject(ID,ProjectName)
  {    
    debugger;
    this.ProjectID=ID;
    this.Project=ProjectName;
    this.modalRef.hide();
    this.getTasksProject(ID);    
  }

}
