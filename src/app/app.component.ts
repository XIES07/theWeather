import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  adjustVideoPlaybackSpeed(): void {
    const videoElement = document.getElementById('background-video');

    if (videoElement && videoElement instanceof HTMLVideoElement) {
      try {
        videoElement.playbackRate = 0.6;
      } catch (error) {
        console.error('Error al ajustar la velocidad del video:', error);
      }
    } else {
      console.warn('El elemento "background-video" no es un video válido o no existe.');
    }
  }

  ngOnInit(): void {
    window.onload = () => {
      this.adjustVideoPlaybackSpeed();
    };
  }

}