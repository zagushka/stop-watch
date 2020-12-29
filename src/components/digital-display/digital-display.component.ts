import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Duration } from 'luxon';
import {
  interval,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'sw-digital-display',
  styleUrls: ['digital-display.component.scss'],
  templateUrl: 'digital-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalDisplayComponent implements OnInit, OnDestroy {
  public hours: string = '00';
  public minutes: string = '00';
  public seconds: string = '00';
  public blink: boolean = false;

  private onDestroy$ = new Subject();

  @Input() period: number = 1000; // How often to check for the time change
  @Input() time: () => Duration;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    interval(this.period)
      .pipe(
        takeUntil(this.onDestroy$),
        map(() => this.time()),
        // Remove next line to blink every tick even when on pause
        distinctUntilChanged((n, o) => n.toString() === o.toString()),
      )
      .subscribe((time) => {
        [this.hours, this.minutes, this.seconds] = time.toFormat('hh mm ss').split(' ');
        this.blink = !(Math.floor(time.as('seconds')) % 2); // Blink on every odd second
        this.ref.markForCheck();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
