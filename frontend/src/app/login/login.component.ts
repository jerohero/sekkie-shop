import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {UserAccessService} from '../shared/user-access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('overlay') overlay: ElementRef;
  @Output() loginClose = new EventEmitter<void>();
  error: string;

  constructor(private renderer: Renderer2, private userAccessService: UserAccessService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initOutsideClickListener();
  }

  initOutsideClickListener(): void {
    this.renderer.listen('window', 'mousedown', (e: Event) => {
      if (e.target === this.overlay.nativeElement) {
        this.loginClose.emit();
      }
    });
  }

  onRegister(form: NgForm): void {
    if (!form.valid) {
      console.log('Form not valid');
      return;
    }
    const email = form.value.registerEmail;
    const password = form.value.registerPassword;

    this.authService.signup(email, password)
      .subscribe((newUser) => {
        console.log(newUser);
      }, errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
      });

    form.reset();
  }

  onLogin(form: NgForm): void {
  }

}
