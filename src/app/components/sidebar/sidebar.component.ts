import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import {
  heroUser,
  heroLockClosed,
  heroAcademicCap,
  heroHeart,
  heroBookOpen,
  heroSparkles,
  heroUserGroup,
} from '@ng-icons/heroicons/outline';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimReqUtils } from '../../shared/utils/claimReq-utils';

interface SidebarLink {
  path: string;
  icon: any;
  label: string;
  claimsReq: Function | null;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgIconComponent,
    RouterLinkActive,
    HideIfClaimsNotMetDirective,
  ],
  templateUrl: './sidebar.component.html',
  providers: [provideIcons({ heroUser, heroLockClosed, heroAcademicCap })],
})
export class SidebarComponent {
  claimReqUtils = claimReqUtils;

  links: SidebarLink[] = [
    {
      path: '/admin-only',
      icon: heroLockClosed,
      label: 'Admin',
      claimsReq: claimReqUtils.adminOnly,
    },
    {
      path: '/admin-and-teacher',
      icon: heroUserGroup,
      label: 'Admin & Teacher',
      claimsReq: claimReqUtils.adminAndTeacher,
    },
    {
      path: '/teacher-only',
      icon: heroAcademicCap,
      label: 'Teacher',
      claimsReq: claimReqUtils.teacherOnly,
    },
    {
      path: '/apply-for-maternity-leave',
      icon: heroHeart,
      label: 'Maternity Leave',
      claimsReq: claimReqUtils.maternityLeaveApplicable,
    },
    {
      path: '/library-members-only',
      icon: heroBookOpen,
      label: 'Library Members',
      claimsReq: claimReqUtils.libraryMembersOnly,
    },
    {
      path: '/under-ten-female-only',
      icon: heroSparkles,
      label: 'Under 10 Female',
      claimsReq: claimReqUtils.genderFemaleAgeUnderTen,
    },
    {
      path: '/student-only',
      icon: heroUser,
      label: 'Student',
      claimsReq: claimReqUtils.studentOnly,
    },
  ];

  constructor() {}
}
