import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Registrar', url: 'registrar', icon: 'archive' },
  ]
  constructor() {}
}
