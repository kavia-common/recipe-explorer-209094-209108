import { Directive, HostBinding } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Adds visually hidden but screen-reader accessible styling.
 */
@Directive({
  selector: '[appSrOnly]',
  standalone: true
})
export class SrOnlyDirective {
  @HostBinding('class.sr-only') sr = true;
}
