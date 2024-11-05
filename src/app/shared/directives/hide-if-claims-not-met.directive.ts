import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]',
  standalone: true,
})
export class HideIfClaimsNotMetDirective implements OnInit {
  @Input('appHideIfClaimsNotMet') claimsReq!: Function | null;

  constructor(
    private elementRef: ElementRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const claims = this.userService.getUserClaims();
    if (this.claimsReq && !this.claimsReq(claims)) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
