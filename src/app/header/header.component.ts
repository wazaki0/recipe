import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<string>();

  onSelect(text: string): void{
    this.menuClicked.emit(text);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
