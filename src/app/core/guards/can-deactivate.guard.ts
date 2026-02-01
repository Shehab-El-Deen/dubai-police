import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (!component.canDeactivate()) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};