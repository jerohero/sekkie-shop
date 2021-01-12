import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadedFeature = 'item';
  showLogin: boolean;

  onNavigate(feature: string): void {
    this.loadedFeature = feature;
  }

  onLoginClicked(): void {
    this.showLogin = true;
  }
}
