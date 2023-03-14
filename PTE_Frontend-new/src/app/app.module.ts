import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { ComponentsModule } from "./components/components.module";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,} from 'angularx-social-login';
import { AuthService } from './auth.service';






@NgModule({
    declarations: [
        AppComponent,
        
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
          },{ 
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
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
        MatDialogModule,
        
        
       
    ]
})
export class AppModule { }
