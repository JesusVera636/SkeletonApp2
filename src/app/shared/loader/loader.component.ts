import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule]
})
export class LoaderComponent {
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
