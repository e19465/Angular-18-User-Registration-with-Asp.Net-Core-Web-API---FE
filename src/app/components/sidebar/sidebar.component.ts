import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import {
  heroUser,
  heroLockClosed,
  heroAcademicCap,
} from '@ng-icons/heroicons/outline';

interface SidebarLink {
  path: string;
  icon: any;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIconComponent],
  templateUrl: './sidebar.component.html',
  providers: [provideIcons({ heroUser, heroLockClosed, heroAcademicCap })],
})
export class SidebarComponent {
  links: SidebarLink[] = [
    {
      path: '/admin',
      icon: heroLockClosed,
      label: 'Admin',
    },
    {
      path: '/teacher',
      icon: heroAcademicCap,
      label: 'Teacher',
    },
    {
      path: '/student',
      icon: heroUser,
      label: 'Student',
    },
  ];

  constructor() {}
}
