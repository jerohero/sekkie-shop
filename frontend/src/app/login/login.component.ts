import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {UserAccessService} from '../shared/services/data-access/user-access.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('overlay') overlay: ElementRef;

  constructor(private renderer: Renderer2, private userAccessService: UserAccessService,
              private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initOutsideClickListener();
  }

  initOutsideClickListener(): void {
    this.renderer.listen('window', 'mousedown', (e: Event) => {
      if (e.target === this.overlay.nativeElement) {
        this.authService.showLogin.next(false);
      }
    });
  }

  onRegister(form: NgForm): void {
    if (!form.valid) { return; }
    const email = form.value.registerEmail;
    const password = form.value.registerPassword;

    this.authService.signup(email, password)
      .subscribe(() => {
        this.router.navigate(['/account']);
        this.authService.showLogin.next(false);
      }, errorMsg => {
        alert(errorMsg);
      });

    form.reset();
  }

  onLogin(form: NgForm): void {
    if (!form.valid) { return; }
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    this.authService.login(email, password)
      .subscribe(() => {
        this.authService.showLogin.next(false);
      }, errorMsg => {
        alert(errorMsg);
      });

    form.reset();
  }

}
