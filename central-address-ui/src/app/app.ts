import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule   // ✅ THIS FIXES EVERYTHING
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
