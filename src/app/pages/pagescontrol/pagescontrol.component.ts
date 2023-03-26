import { Component } from '@angular/core';
import * as DecoupledEditor  from "@ckeditor/ckeditor5-build-decoupled-document";
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-pagescontrol',
  templateUrl: './pagescontrol.component.html',
  styleUrls: ['./pagescontrol.component.css']
})
export class PagescontrolComponent {

  public Editor = DecoupledEditor
  constructor(private aboutService: AboutService){
  }


  public onReady( editor:any ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

save(){
  console.log(this.Editor.default.prototype.getData());
  




}
  
}
