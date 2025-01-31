import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular 18 Starter';
  text = 'Добро пожаловать в ваш новый проект!';
  configName?: string;
  environment?: string;
  apiUrl?: string;

  constructor() {
    this.configName = environment.dopplerConfig;
    this.environment = environment.name;
    this.apiUrl = environment.apiUrl;
    console.log('production', environment.production);
  }
}
