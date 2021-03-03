import { Component, OnInit } from '@angular/core';

@Component({
  template: '<youtube-player videoId="MuZGBlYEYMo"></youtube-player>', // the Id needs to be specific to recipe - CHANGE!
  selector: 'app-video',
})
export class VideoComponent implements OnInit {
  ngOnInit(): void {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
