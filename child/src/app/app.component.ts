import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'child';

  message!: string;

  constructor(private sanitizer: DomSanitizer) {}

  sendMessage() {
    parent.postMessage(new Date(), '*');
  }

  @HostListener('window:message', ['$event'])
  onPostMessage(event: any) {
    console.info(event);
    this.message = event.data;
  }
}
