import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{Routes,RouterModule} from '@angular/router'
import { ROUTES } from '@angular/router/src/router_config_loader';
import { HttpClientModule } from '@angular/common/http';
import{FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { EditprojectComponent } from './UI/editproject/editproject.component';
import { AddprojectComponent } from './UI/addproject/addproject.component';
import { AdduserComponent } from './UI/adduser/adduser.component';
import { EdituserComponent } from './UI/edituser/edituser.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { EdittaskComponent } from './UI/edittask/edittask.component';
import { ViewtaskComponent } from './UI/viewtask/viewtask.component';

const routes:Routes=[
  {path:'addproject',
  component:AddprojectComponent
},
{path:'editproject/:id',
  component:EditprojectComponent
},
{path:'adduser',
  component:AdduserComponent
},
{path:'edituser/:id',
  component:EdituserComponent
},
{path:'addtask',
  component:AddtaskComponent
},
{path:'edittask/:id',
  component:EdittaskComponent
},
{path:'viewtask',
  component:ViewtaskComponent
}
];

@NgModule({
  declarations: [
    AppComponent,    
    EditprojectComponent,
    AddprojectComponent,
    AdduserComponent,
    EdituserComponent,
    AddtaskComponent,
    EdittaskComponent,
    ViewtaskComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    [BrowserModule,FormsModule],
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
