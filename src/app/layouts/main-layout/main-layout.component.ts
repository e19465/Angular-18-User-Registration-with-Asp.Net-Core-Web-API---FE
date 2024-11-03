import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
