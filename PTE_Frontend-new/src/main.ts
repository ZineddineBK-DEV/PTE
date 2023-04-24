/*!

=========================================================
* Material Dashboard Angular - v2.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-angular2
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-angular2/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';


registerLicense("ORg4AjUWIQA/Gnt2VFhhQlJBfVpdXGtWfFN0RnNQdV9xflFAcDwsT3RfQF5jTX9bdERiXH1ac3JTQA==");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
