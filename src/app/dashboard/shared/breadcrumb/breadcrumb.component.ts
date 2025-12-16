
import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule 
  ],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: { label: string; url: string }[] = []
  ): { label: string; url: string }[] {

    const config = route.routeConfig;

    if (config?.data?.['breadcrumb']) {
      const path = config.path ?? '';
      const nextUrl = path ? `${url}/${path}` : url;

      breadcrumbs.push({
        label: config.data['breadcrumb'],
        url: nextUrl || '/'
      });

      url = nextUrl;
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
