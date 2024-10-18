import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  @Input() imageSrc: string = ''; // Input for image source
  @Input() title: string = ''; // Input for the title
}
