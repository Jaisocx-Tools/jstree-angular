import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppExampleJaisocxTreeComponent } from "./jaisocx-tools/app-example-jaisocx-tree/app-example-jaisocx-tree.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppExampleJaisocxTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jaisocx-tree';
}
