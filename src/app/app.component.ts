import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'money-app';

  ngOnInit() {
    console.log('The UUID generator function should be common');
    console.log('Check components and data types');
    console.log('Fix bug with the Other category type')
  }
}
