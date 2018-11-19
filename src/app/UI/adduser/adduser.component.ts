import { Component, OnInit } from '@angular/core';
import{User} from 'src/app/Models/User'
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute,RouterModule } from '@angular/router/';
import { ROUTES } from '@angular/router/src/router_config_loader';
import { Router } from '@angular/router/';
import{SharedService} from 'src/app/Services/sharedservice';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  filtereduser:User[];
  filterEmployeeID:string;
  Users:Observable<User[]>;
  btnUserTitle:String;
  FirstName:String;
  LastName:String;
  EmployeeID:String;
  UserID:Number;
  ProjectID:Number;
  TaskID:Number;


  constructor(private route:ActivatedRoute,
    private router:Router,
    private sharedservice:SharedService) { }

  ngOnInit() {  
    this.btnUserTitle="Add User"  ;
    this.GetUsers();
  }
  GetUsers()
  {
    this.Users=this.sharedservice.getUsers();
    this.Users.subscribe(data=>{this.filtereduser=data});
  }

  AddUser()
  {    
    debugger;
    let lstUser:User={
      UserID:0,
      FirstName:this.FirstName,
      LastName:this.LastName,
      EmployeeID:this.EmployeeID,
      ProjectID:this.ProjectID,
      TaskID:this.TaskID

    }
    if(this.btnUserTitle=="Add User")
    {
      this.sharedservice.addUser(lstUser).subscribe(()=>{this.GetUsers()});     
    }
    else{
      this.sharedservice.updateUser(this.UserID,lstUser).subscribe(()=>{this.GetUsers()});     
    }
    this.ResetFields();    
  }
  editUser(ID)
  {
    this.btnUserTitle="Update User";
    this.UserID=ID;
    this.FirstName=this.filtereduser.find(data=>data.UserID==ID).FirstName;
    this.LastName=this.filtereduser.find(data=>data.UserID==ID).LastName;
    this.EmployeeID=this.filtereduser.find(data=>data.UserID==ID).EmployeeID;
    this.ProjectID=this.filtereduser.find(data=>data.UserID==ID).ProjectID;
    this.TaskID=this.filtereduser.find(data=>data.UserID==ID).TaskID;
  }
  deleteUser(ID)
  {    
    this.sharedservice.endUser(ID).subscribe(()=>{this.GetUsers()});    
  }
  ResetFields()
  {
    this.FirstName="";
    this.LastName="";
    this.EmployeeID="";
    this.btnUserTitle="Add User";
  }
  Sort(field)
  {
    if(field=="FirstName")
    {      
      this.filtereduser.sort((a:any,b:any)=>{
        if(a.FirstName<b.FirstName)
        return -1;
        else if(a.FirstName>b.FirstName)
        return 1;
        else
        return 0;
      });
    }
    if(field=="LastName")
    {      
      this.filtereduser.sort((a:any,b:any)=>{
        if(a.LastName<b.LastName)
        return -1;
        else if(a.LastName>b.LastName)
        return 1;
        else
        return 0;
      });
    }
    if(field=="Id")
    {      
      this.filtereduser.sort((a:any,b:any)=>{
        if(a.EmployeeID<b.EmployeeID)
        return -1;
        else if(a.EmployeeID>b.EmployeeID)
        return 1;
        else
        return 0;
      });
    }
  }
  filteruser()
  {
    debugger;
    if(this.filterEmployeeID!=null && this.filterEmployeeID!="")
    {
      this.filtereduser=this.filtereduser.filter(data=>data.EmployeeID.startsWith(this.filterEmployeeID));
    }
    else{
      this.GetUsers();
    }
  }

}
