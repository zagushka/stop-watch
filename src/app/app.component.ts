import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Duration } from 'luxon';
import {
  interval,
  Subject,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StopWatchService } from '../services/stop-watch.service';

@Component({
  selector: 'sw-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {
  $onDestroy = new Subject();
  duration: Duration;

  constructor(public stopWatch: StopWatchService) {
    this.duration = this.stopWatch.getDuration();
  }

  ngOnInit() {
    interval(100)
      .pipe(takeUntil(this.$onDestroy))
      .subscribe(() => {
        this.duration = this.stopWatch.getDuration();
      });
  }

  ngOnDestroy() {
    this.$onDestroy.next(null);
    this.$onDestroy.complete();
  }
}
