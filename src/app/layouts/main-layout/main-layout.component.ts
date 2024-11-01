import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
