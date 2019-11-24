import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mon vote';
  isAdmin = false;
   dt = Date();
  // Prevent Saturday and Sunday from being selected.
 
}
