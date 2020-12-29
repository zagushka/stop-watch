import { Component } from '@angular/core';
import { Duration } from 'luxon';
import { StopWatchService } from '../services/stop-watch.service';

@Component({
  selector: 'sw-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  duration: () => Duration;

  constructor(public stopWatch: StopWatchService) {
    this.duration = () => this.stopWatch.getDuration();
  }
}
