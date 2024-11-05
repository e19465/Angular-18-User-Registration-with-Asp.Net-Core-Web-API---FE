import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminOnlyComponent } from './pages/authorized/admin-only/admin-only.component';
import { AdminAndTeacherComponent } from './pages/authorized/admin-and-teacher/admin-and-teacher.component';
import { ApplyForMaternityLeaveComponent } from './pages/authorized/apply-for-maternity-leave/apply-for-maternity-leave.component';
import { LibraryMembersOnlyComponent } from './pages/authorized/library-members-only/library-members-only.component';
import { UnderTenFemaleOnlyComponent } from './pages/authorized/under-ten-female-only/under-ten-female-only.component';
import { USER_ROLES } from './shared/constants/constants';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { claimReqUtils } from './shared/utils/claimReq-utils';
import { TeacherOnlyComponent } from './pages/authorized/teacher-only/teacher-only.component';
import { StudentOnlyComponent } from './pages/authorized/student-only/student-only.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'admin-only',
        component: AdminOnlyComponent,
        data: {
          claimReq: claimReqUtils.adminOnly,
        },
      },
      {
        path: 'admin-and-teacher',
        component: AdminAndTeacherComponent,
        data: {
          claimReq: claimReqUtils.adminAndTeacher,
        },
      },
      {
        path: 'apply-for-maternity-leave',
        component: ApplyForMaternityLeaveComponent,
        data: {
          claimReq: claimReqUtils.maternityLeaveApplicable,
        },
      },
      {
        path: 'library-members-only',
        component: LibraryMembersOnlyComponent,
        data: {
          claimReq: claimReqUtils.libraryMembersOnly,
        },
      },
      {
        path: 'under-ten-female-only',
        component: UnderTenFemaleOnlyComponent,
        data: {
          claimReq: claimReqUtils.genderFemaleAgeUnderTen,
        },
      },
      {
        path: 'student-only',
        component: StudentOnlyComponent,
        data: {
          claimReq: claimReqUtils.studentOnly,
        },
      },
      {
        path: 'teacher-only',
        component: TeacherOnlyComponent,
        data: {
          claimReq: claimReqUtils.teacherOnly,
        },
      },
    ],
  },
  {
    path: 'sign-up',
    component: RegistrationComponent,
  },
  {
    path: 'sign-in',
    component: LoginComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
