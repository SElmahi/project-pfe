import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
content :any
constructor(private pageServiceService:PageServiceService){}
ngOnInit(): void {
  this.content = this.pageServiceService.getRegisterPage();
 
}

}
