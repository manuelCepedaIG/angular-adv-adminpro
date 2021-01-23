import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sibebarService: SidebarService) { 
    this.menuItems = this.sibebarService.menu;
  }

  ngOnInit(): void {
  }

}
