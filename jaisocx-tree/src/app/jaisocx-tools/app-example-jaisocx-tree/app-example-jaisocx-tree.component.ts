import { Component } from '@angular/core';
import { JaisocxTreeComponent } from "../jaisocx-tree/jaisocx-tree.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-app-example-jaisocx-tree',
  standalone: true,
  imports: [JaisocxTreeComponent],
  templateUrl: './app-example-jaisocx-tree.component.html',
  styleUrl: './app-example-jaisocx-tree.component.scss'
})
export class AppExampleJaisocxTreeComponent {
  html: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  nodeClickEventHandler(obj: any): void {
    const html: string = obj.node.text;
    const safeHtml: SafeHtml|null = html ? this.sanitizer.bypassSecurityTrustHtml(obj.node.text) : null;
    /** @ts-ignore; */
    this.html = safeHtml;
  }
}
