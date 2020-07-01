import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-module',
  templateUrl: './editor-module.component.html',
})
export class EditorModuleComponent implements OnInit {

  @Input() editor: any;
  @Output() editorLoaded = new EventEmitter();
  @Output() editorChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public change(newValue) {
    this.editor = newValue;
    this.editorChange.emit(newValue);
  }
}
