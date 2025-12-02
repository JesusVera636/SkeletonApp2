import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoadingComponent {
  @Input() visible = false;
  @Input() defaultDuration = 5000;

  showfor(ms: number = this.defaultDuration) {
    if(this.visible) return;
    this.visible = true;

    setTimeout(() => this.visible = false, ms);
    
  }

  hide() {
    this.visible = false;
  }


}
