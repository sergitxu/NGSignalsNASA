import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { PicOfDayService } from '../pic-of-day-service.service';
import { PicType } from '../pics.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pic-search',
  templateUrl: './pic-search.component.html',
  styleUrls: ['./pic-search.component.css']
})
export class PicSearchComponent implements OnInit {
  private picOfDayService = inject(PicOfDayService);

  currentDate = new Date().toJSON().slice(0, 10);
  CUSTOMDATEFROM = '2023-09-01'

  from = signal(this.CUSTOMDATEFROM); // writable SIGNAL of string
  to = signal(this.currentDate); // writable SIGNAL of string
  pics = signal<PicType[]>([]); // writable SIGNAL of array

  dateRange = computed(() => `Images from ${this.from()}, to ${this.to()}`); // COMPUTED SIGNAL, not writable

  dateFrom = new FormControl('');
  dateTo = new FormControl('');

  constructor() {
    effect(() => { // EFFECT Subscription to signals
      // console.log(`dateRange: ${this.dateRange()}`);
      // setTimeout(() => {
      this.search();
      // }, 500);
    })
  }
  ngOnInit(): void {
    this.dateFrom.setValue(this.CUSTOMDATEFROM);
    this.dateTo.setValue(this.currentDate);
  }

  changeFrom() {
    this.dateFrom.value ? this.from.set(this.dateFrom.value) : null;
  }

  changeTo() {
    this.dateTo.value ? this.to.set(this.dateTo.value) : null;
  }

  async search(): Promise<void> {
    if (!this.from() || !this.to()) {
      return;
    }

    try {
      const pics = await this.picOfDayService.findPicsInRange(this.from(), this.to()).toPromise();

      if (pics) {
        this.pics.set(pics);

      } else {
        console.log('No pictures found.');
      }
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  }


}
