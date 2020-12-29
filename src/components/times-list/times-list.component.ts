import { Component } from '@angular/core';
import { StopWatchService } from '../../services/stop-watch.service';

@Component({
  selector: 'sw-times-list',
  styleUrls: ['times-list.component.scss'],
  templateUrl: 'times-list.component.html',
})
export class TimesListComponent {
  constructor(public stopWatch: StopWatchService) {
  }
}
