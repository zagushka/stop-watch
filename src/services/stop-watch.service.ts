import { Injectable } from '@angular/core';
import {
  DateTime,
  Duration,
} from 'luxon';
import { StorageService } from './storage.service';

const STOP_WATCH_KEY = 'stop-watch';

export type ClockStatus = 'running' | 'paused' | 'reset';

export interface Clock {
  duration?: Duration;
  time?: DateTime;
  status: ClockStatus;
}

interface StopWatchData {
  times: Array<{ duration: Duration }>;
  clock: Clock;
}

const defaultStorageObject: () => StopWatchData = () => ({
  times: [],
  clock: {
    duration: Duration.fromMillis(0),
    time: DateTime.local(0),
    status: 'reset',
  },
});

const reviver = (key, value) => {
  switch (key) {
    case 'duration':
      return Duration.fromISO(value);
    case 'time':
      return DateTime.fromISO(value);
    default:
      return value;
  }
};

@Injectable({
  providedIn: 'root',
})
export class StopWatchService {
  times: Array<{ duration: Duration }> = defaultStorageObject().times;
  clock: Clock = defaultStorageObject().clock;

  constructor(private storage: StorageService) {
    const retrievedState = storage.get(STOP_WATCH_KEY, reviver, defaultStorageObject());
    console.log(retrievedState);

    // Some logic related to clock status
    if (retrievedState.clock.status) {

    }

    this.setState(retrievedState);
  }

  /**
   * Delete localStorage object and setState to default
   */
  private resetState() {
    this.setState(defaultStorageObject());
    this.storage.remove(STOP_WATCH_KEY);
  }

  /**
   * Update times and clock with provided data,
   * @param state
   */
  private setState(state: StopWatchData) {
    // Update times without loosing reference
    this.times.splice(0, this.times.length, ...state.times);

    // Update clock object without loosing reference
    Object.assign(this.clock, state.clock);

    this.storage.set(STOP_WATCH_KEY, state);
  }

  private addTime(time: { duration: Duration }) {
    this.setTimes([...this.times, time]);
  }

  private setTimes(times: Array<{ duration: Duration }>) {
    this.setState({
      clock: this.clock,
      times,
    });
  }

  private setClock(clock: Clock) {
    this.setState({
      clock: clock,
      times: this.times,
    });
  }

  getDuration() {
    if ('running' === this.clock.status) {
      return this.clock.duration.plus(this.clock.time.diffNow().negate());
    }
    return this.clock.duration;
  }

  public clear() {
    this.resetState();
  }

  public save() {
    // Save result to the list
    this.addTime({duration: this.getDuration()});
  }

  public pause() {
    // Start time once again
    this.setClock({
      status: 'paused',
      // Pause, update duration with the new value
      duration: this.clock.duration.plus(this.clock.time.diffNow().negate()),
    });
  }

  public start() {
    // Start time once again
    this.setClock({
      status: 'running',
      time: DateTime.local(),
    });
  }
}
