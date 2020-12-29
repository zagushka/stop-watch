import {
  Component,
  Input,
} from '@angular/core';
import {
  Duration,
} from 'luxon';

@Component({
  selector: 'sw-digital-display',
  styleUrls: ['digital-display.component.scss'],
  templateUrl: 'digital-display.component.html',
})
export class DigitalDisplayComponent {
  public hours: string = '00';
  public minutes: string = '00';
  public seconds: string = '00';

  @Input() set time(time: Duration) {
    [this.hours, this.minutes, this.seconds] = time.toFormat('hh mm ss').split(' ');
  }
}
