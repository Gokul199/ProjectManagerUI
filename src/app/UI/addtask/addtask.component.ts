import { Component, OnInit } from '@angular/core';
import{Task} from 'src/app/Models/task';
import{NgModule} from '@angular/core';
import{FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{SharedService} from 'src/app/Services/sharedservice';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})


export class AddtaskComponent implements OnInit {

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

  constructor(private sharedservice:SharedService) {}

  ngOnInit() {
  }

  AddTask()
  {    
    let taskdata:Task={
      TaskID:0,
      ParentID:0,
      ProjectID:0,
      UserID:0,
      Task:this.Task,
      ParentTask:this.ParentTask, 
      EmployeeID:"0", 
      Priority:this.Priority,
      StartDate:this.StartDate,
      EndDate:this.EndDate,
      Status:"" 

    };
    this.sharedservice.addTask(taskdata).subscribe(()=>{});
    this.ResetFields();
  }

  ResetFields()
  {
    this.Task="";
    this.ParentTask=null;
    this.Priority=null;
    this.StartDate=null;
    this.EndDate=null;
  }    

}
