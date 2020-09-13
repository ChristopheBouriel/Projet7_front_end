import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front-end';

  publications = [
    {
      name: 'Sur les ondes',
      status: 'Pas encore lu'
    },
    {
      name: 'Sur la matière',
      status: 'Pas encore lu'
    },
    {
      name: 'Sur le mouvement',
      status: 'Lu'
    }
  ]
}
