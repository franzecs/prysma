import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IFormDeactive } from './IformDeactive';
import { Observable } from 'rxjs';

@Injectable()
export class CanDeactivateChangeRouter implements CanDeactivate<IFormDeactive> {
  canDeactivate(
    component: IFormDeactive,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.authChangeRouter();
  }
}
