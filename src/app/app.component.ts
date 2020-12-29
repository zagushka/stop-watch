import { Component } from '@angular/core';
import { Duration } from 'luxon';
import {
  faPlay,
  faPause,
  faTrash,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import { StopWatchService } from '../services/stop-watch.service';

@Component({
  selector: 'sw-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  styles: [],
})
export class AppComponent {
  duration: () => Duration;
  icons = {
    play: faPlay,
    pause: faPause,
    watch: faStopwatch,
    trash: faTrash,
  };

  constructor(public stopWatch: StopWatchService) {
    this.duration = () => this.stopWatch.getDuration();
  }
}
