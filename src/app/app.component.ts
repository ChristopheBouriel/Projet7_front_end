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
      content: 'blabla',
      date: new Date(),
      like: false,
      dislike: false,
      status: 'Pas encore lu'
    },
    {
      name: 'Sur la matière',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + 
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
      'culpa qui officia deserunt mollit anim id est laborum.',
      date: new Date(),
      like: false,
      dislike: false,
      status: 'Pas encore lu'
    },
    {
      name: 'Sur le mouvement',
      content: 'blablabla',
      date: new Date(),
      like: false,
      dislike: false,
      status: 'Lu'
    }
  ]
}
