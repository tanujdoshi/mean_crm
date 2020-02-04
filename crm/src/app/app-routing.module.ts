import { DetailedResponseComponent } from "./detailed-response/detailed-response.component";
import { ShowResponsesComponent } from "./show-responses/show-responses.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DisplaylayoutComponent } from "./displaylayout/displaylayout.component";
import { EmpauthComponent } from "./empauth/empauth.component";
import { LayoutmanagerComponent } from "./layoutmanager/layoutmanager.component";
import { AddempsComponent } from "./addemps/addemps.component";
import { CspaceComponent } from "./cspace/cspace.component";
import { ActionsComponent } from "./actions/actions.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "actions", component: ActionsComponent },
  { path: "actions/cspace", component: CspaceComponent },
  { path: "actions/addemps", component: AddempsComponent },
  { path: "actions/layout-manager", component: LayoutmanagerComponent },
  { path: "login/emplogin", component: EmpauthComponent },
  { path: "displaylayout", component: DisplaylayoutComponent },
  { path: "showresponses-home", component: ShowResponsesComponent },
  {
    path: "showresponses-home/showfullresponse",
    component: DetailedResponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
