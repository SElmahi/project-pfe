import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title="The 1st National Conference on Computer Science and Artificial Intelligence (NCCSAI 2023)";
  logoMenu:string = 'assets/image/logo.jpg';
  contact="contact"
}
