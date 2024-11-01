import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [],
  templateUrl: './auth-layout.component.html',
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(
          ':enter',
          [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AuthLayoutComponent {
  @Input() imageSrc: string = ''; // Input for image source
  @Input() title: string = ''; // Input for the title
}
