import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * A route strategy allowing for explicit route reuse.
 * Used as a workaround for https://github.com/angular/angular/issues/18374
 * To reuse a given route, add `data: { reuse: true }` to the route definition.
 */
@Injectable()
export class RouteReusableStrategy extends RouteReuseStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle | null): void {
    // empty
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Reuse the route if the RouteConfig is the same, or if both routes use the
    // same component, because the latter can have different RouteConfigs.
    return (
      future.routeConfig === curr.routeConfig ||
      Boolean(future.routeConfig?.component && future.routeConfig?.component === curr.routeConfig?.component)
    );
  }
}
