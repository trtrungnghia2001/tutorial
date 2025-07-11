import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tran Trung Nghia';
  count = 0;
  incCount() {
    this.count = this.count + 1;
  }
  decCount() {
    this.count = this.count - 1;
  }
}
