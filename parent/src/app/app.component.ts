import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'parent';

  frameSrc: SafeResourceUrl | undefined;
  message!: string;

  @ViewChild('iframe', { static: false }) iframe!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.frameSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://localhost:3001'
    );
  }

  sendMessage() {
    this.iframe.nativeElement.contentWindow.postMessage(new Date(), '*');
  }

  @HostListener('window:message', ['$event'])
  onPostMessage(event: any) {
    console.info(event);
    this.message = event.data;
  }
}
