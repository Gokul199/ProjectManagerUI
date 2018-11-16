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


  constructor(private sharedservice:SharedService,
    private datePipe:DatePipe,private modalService:BsModalService) { }

  ngOnInit() {
    this.filteredTasks=[{TaskID:1,ParentID:1,ProjectID:1,UserID:1,Task:'Task 1',
      ParentTask:'Parent Task 1',EmployeeID:'1234',Priority:10,StartDate:new Date('2018-11-14'),
      EndDate:new Date('2018-11-17'),Status:'Active',Project:'Test Project 1'},
      {TaskID:2,ParentID:2,ProjectID:2,UserID:1,Task:'Task 2',
      ParentTask:'Parent Task 2',EmployeeID:'1234',Priority:10,StartDate:new Date('2018-11-14'),
      EndDate:new Date('2018-11-17'),Status:'Active',Project:'Test Project 2'}]  
  }

  openModal(template:TemplateRef<any>)
  {    
    debugger;
    this.loadprojects=[
      {ProjectID:1,Project:'Test Project',ProjectStartDate:new Date('2018-11-14'),
        ProjectEndDate:new Date('2018-11-14'),ProjectPriority:10,
        ProjectManager:'Test Manager',NumberOfTasks:10,Completed:"No"},
        {ProjectID:2,Project:'Test Project 2',ProjectStartDate:new Date('2018-11-14'),
        ProjectEndDate:new Date('2018-11-14'),ProjectPriority:12,
        ProjectManager:'Test Manager',NumberOfTasks:11,Completed:"No"}
    ]        
    this.modalRef=this.modalService.show(template);
  }

  gettasks()
  {    
    debugger;
    this.Tasks=this.sharedservice.getTasks();
    this.Tasks.subscribe(data=>{this.filteredTasks=data});    
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
      debugger;
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
      debugger;
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
      debugger;
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
      debugger;
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

}
