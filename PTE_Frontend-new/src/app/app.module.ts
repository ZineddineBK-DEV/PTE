import { DashboardComponent } from './dashboard/dashboard.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from "./components/components.module";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,} from 'angularx-social-login';
import { AuthService } from './auth.service';





@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        DashboardComponent,
        
    ],
    providers: [AuthService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    'clientId'
                  )
                }
              ],
              onError: (err) => {
                console.error(err);
              }
            } as SocialAuthServiceConfig,
          }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        SocialLoginModule,
        
        
       
    ]
})
export class AppModule { }
