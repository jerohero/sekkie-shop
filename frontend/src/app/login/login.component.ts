import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('overlay') overlay: ElementRef;
  @Output() loginClose = new EventEmitter<void>();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target === this.overlay.nativeElement) {
        this.loginClose.emit();
      }
    });
  }

}
