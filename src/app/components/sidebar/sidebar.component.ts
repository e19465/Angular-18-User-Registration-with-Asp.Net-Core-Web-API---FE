import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import {
  heroUser,
  heroLockClosed,
  heroAcademicCap,
  heroHeart,
  heroBookOpen,
  heroSparkles,
} from '@ng-icons/heroicons/outline';

interface SidebarLink {
  path: string;
  icon: any;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIconComponent, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  providers: [provideIcons({ heroUser, heroLockClosed, heroAcademicCap })],
})
export class SidebarComponent {
  links: SidebarLink[] = [
    {
      path: '/admin-only',
      icon: heroLockClosed,
      label: 'Admin',
    },
    {
      path: '/admin-and-teacher',
      icon: heroAcademicCap,
      label: 'Admin & Teacher',
    },
    {
      path: '/apply-for-maternity-leave',
      icon: heroHeart,
      label: 'Maternity Leave',
    },
    {
      path: '/library-members-only',
      icon: heroBookOpen,
      label: 'Library Members',
    },
    {
      path: '/under-ten-female-only',
      icon: heroSparkles,
      label: 'Under 10 Female',
    },
    {
      path: '/student',
      icon: heroUser,
      label: 'Student',
    },
  ];

  constructor() {}
}
