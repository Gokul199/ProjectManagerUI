import { Component, OnInit } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{Task} from 'src/app/Models/task';
import{NgModule} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import{SharedService} from 'src/app/Services/sharedservice';
import{map,filter,scan} from 'rxjs/Operators'
import { DatePipe } from '@angular/common/';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
  providers:[DatePipe]})
export class ViewtaskComponent implements OnInit {

  Tasks:Observable<Task[]>;
  filteredTasks:Task[]; 
  


  constructor(private sharedservice:SharedService,
    private datePipe:DatePipe) { }

  ngOnInit() {
    this.gettasks();  
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

}
