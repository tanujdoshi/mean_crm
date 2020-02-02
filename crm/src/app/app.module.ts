import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AgGridModule } from "ag-grid-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { ActionsComponent } from "./actions/actions.component";
import { CspaceComponent } from "./cspace/cspace.component";
import { AddempsComponent } from "./addemps/addemps.component";
import { FileUploadModule } from "ng2-file-upload";
import { LayoutmanagerComponent } from "./layoutmanager/layoutmanager.component";
import { EmpauthComponent } from "./empauth/empauth.component";
import { DisplaylayoutComponent } from "./displaylayout/displaylayout.component";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { ShowResponsesComponent } from './show-responses/show-responses.component';
import { DetailedResponseComponent } from './detailed-response/detailed-response.component';
import { KeysPipe } from './keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ActionsComponent,
    CspaceComponent,
    AddempsComponent,
    LayoutmanagerComponent,
    EmpauthComponent,
    DisplaylayoutComponent,
    ShowResponsesComponent,
    DetailedResponseComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    AgGridModule.withComponents([])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
