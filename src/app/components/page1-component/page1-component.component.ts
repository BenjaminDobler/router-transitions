import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MusicService} from '../../services/MusicService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page1-component',
  templateUrl: './page1-component.component.html',
  styleUrls: ['./page1-component.component.css']
})
export class Page1ComponentComponent implements OnInit, AfterViewInit {

  constructor(public musicService:MusicService, private router:Router) { }

  ngOnInit() {
  }

  public selectAlbum(album) {
    this.musicService.selectedAlbum = album;
    setTimeout(()=>{
      this.router.navigate(['/page2']);

    }, 10);


  }

  ngAfterViewInit() {
    console.log("--------------------- VIEW INIT 1");
  }

}
