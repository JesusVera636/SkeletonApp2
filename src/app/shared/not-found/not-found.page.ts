import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotFoundPage implements OnInit {
  private router = inject(Router);

  numero = 5;

  constructor() { }

  ngOnInit() {
    let interval = setInterval(() => {
      this.numero--;
      if (this.numero == 0) clearInterval(interval);
    }, 1000);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }

}
