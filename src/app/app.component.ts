import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mon vote';
  isAdmin = true;
   dt = Date();
  // Prevent Saturday and Sunday from being selected.
 
}
