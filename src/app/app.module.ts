import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { BlocklyComponent } from './dashboard-layout/blockly/blockly.component';
import { DashboardComponent }   from './dashboard-layout/dashboard/dashboard.component';
import { UserComponent }   from './dashboard-layout/user/user.component';
import { TableComponent }   from './dashboard-layout/table/table.component';
import { TypographyComponent }   from './dashboard-layout/typography/typography.component';
import { IconsComponent }   from './dashboard-layout/icons/icons.component';
import { MapsComponent }   from './dashboard-layout/maps/maps.component';
import { NotificationsComponent }   from './dashboard-layout/notifications/notifications.component';
import { UpgradeComponent }   from './dashboard-layout/upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BlocklyComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'})

  ],
  schemas: [
    NO_ERRORS_SCHEMA
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
