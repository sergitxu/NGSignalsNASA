import { Component, computed, effect, inject, signal } from '@angular/core';
import { PicOfDayService } from '../pic-of-day-service.service';
import { PicType } from '../pics.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pic-search',
  templateUrl: './pic-search.component.html',
  styleUrls: ['./pic-search.component.css']
})
export class PicSearchComponent {
  private picOfDayService = inject(PicOfDayService);

  from = signal('2023-08-20'); // writable signal of string
  to = signal('2023-08-27');
  pics = signal<PicType[]>([]);

  dateRange = computed(() => `Images from ${this.from()}, to ${this.to()}`); // computed signal, not writable

  dateFrom = new FormControl('');
  dateTo = new FormControl('');

  constructor() {
    effect(() => { // Subscription to signals
      console.log(`dateRange: ${this.dateRange()}`);
      this.search();
    })

    this.dateFrom.setValue(this.from());
    this.dateTo.setValue(this.to());
  }

  changeFrom() {
    this.dateFrom.value ? this.from.set(this.dateFrom.value) : null;
  }

  changeTo() {
    this.dateTo.value ? this.from.set(this.dateTo.value) : null;
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
