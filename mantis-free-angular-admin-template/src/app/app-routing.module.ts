// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'department',
        loadComponent: () => import('./demo/component/basic-component/department/department.component').then((c) => c.DepartmentComponent)
      },
      {
        path: 'Employee',
        loadComponent: () => import('./demo/component/basic-component/employee/employee.component').then((c) => c.EmployeeComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./demo/component/basic-component/attendance/attendance.component').then((c) => c.AttendanceComponent)
      },
      {
        path: 'leave',
        loadComponent: () => import('./demo/component/basic-component/leave/leave.component').then((c) => c.LeaveComponent)
      },
      {
        path: 'payroll',
        loadComponent: () => import('./demo/component/basic-component/payroll/payroll.component').then((c) => c.PayrollComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
