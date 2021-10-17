// For MDB Angular Pro
import { CollapseComponent } from 'ng-uikit-pro-standard';
import { Component, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    });
  }
}
