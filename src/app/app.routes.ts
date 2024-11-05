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
          claimReq: (claim: any) => claim.role === USER_ROLES.ADMIN,
        },
      },
      {
        path: 'admin-and-teacher',
        component: AdminAndTeacherComponent,
        data: {
          claimReq: (claim: any) =>
            claim.role === USER_ROLES.ADMIN ||
            claim.role === USER_ROLES.TEACHER,
        },
      },
      {
        path: 'apply-for-maternity-leave',
        component: ApplyForMaternityLeaveComponent,
      },
      {
        path: 'library-members-only',
        component: LibraryMembersOnlyComponent,
      },
      {
        path: 'under-ten-female-only',
        component: UnderTenFemaleOnlyComponent,
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
