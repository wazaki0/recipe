import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: '<youtube-player [videoId]="getVideoID()"></youtube-player>', // the Id needs to be specific to recipe - CHANGE!
  styleUrls: ['./video.component.css'],
  selector: 'app-video',
})
export class VideoComponent implements OnInit {

  @Input() videoUrl: string;

  videoTag = 'oFHuhbNjoRM';

  ngOnInit(): void {
    const tag = document.createElement('script');


    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  getVideoID(): string {
    return this.videoUrl.split('v=')[1].split('&')[0];
  }

  // validateYouTubeUrl(url: string): boolean {
  //
  //   const videoID = url.replace('http://', '')
  //     .replace('https://', '')
  //     .replace('www.', '')
  //     .replace('youtu.be/', 'youtube.com?v=')
  //     .slice(0, 14) === 'youtube.com?v=';
  //   return videoID;
  //
  // }
}
