import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/MusicService';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  constructor(public musicService:MusicService) { }

  ngOnInit() {
  }

}
