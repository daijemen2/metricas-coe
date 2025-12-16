import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterModule
} from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Crumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // ✅ NECESARIO PARA routerLink
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user = {
    name: 'Dairon Jaimes',
    role: 'QA Lead',
    avatar: 'DJ'
  };

  private breadcrumbsSignal = signal<Crumb[]>([]);

  breadcrumbs = computed(() => this.breadcrumbsSignal());

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbsSignal.set(
          this.buildBreadcrumbs(this.route.root)
        );
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Crumb[] = []
  ): Crumb[] {

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
