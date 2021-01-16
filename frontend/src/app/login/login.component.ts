import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {UserAccessService} from '../shared/user-access.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('overlay') overlay: ElementRef;
  @Output() loginClose = new EventEmitter<void>();
  error: string;

  constructor(private renderer: Renderer2, private userAccessService: UserAccessService,
              private authService: AuthService, private router: Router) { }

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

  validateForm(form: NgForm): boolean {
    if (!form.valid) {
      console.log('Form not valid');
      return false;
    }
    return true;
  }

  onRegister(form: NgForm): void {
    const formValid = this.validateForm(form);
    if (!formValid) { return; }
    const email = form.value.registerEmail;
    const password = form.value.registerPassword;

    this.authService.signup(email, password)
      .subscribe((user) => {
        console.log(user);
        // this.router.navigate(['/account']);
      }, errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
      });

    form.reset();
  }

  onLogin(form: NgForm): void {
    const formValid = this.validateForm(form);
    if (!formValid) { return; }
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    this.authService.login(email, password)
      .subscribe((user) => {
        this.loginClose.emit();
      }, errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
      });

    form.reset();
  }

}
