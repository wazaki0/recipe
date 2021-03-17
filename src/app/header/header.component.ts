import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() menuClicked = new EventEmitter<string>();

  // onSelect(text: string): void{
  //   this.menuClicked.emit(text);
  // }

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    //subscribe needed to send http request, though we don't need something out of it as tap overwrites recipes already
  }

}
