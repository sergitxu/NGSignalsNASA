import { Component, computed, effect, inject, signal } from '@angular/core';
import { PicOfDayService } from '../pic-of-day-service.service';
import { PicType } from '../pics.model';

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

  constructor() {
    effect(() => { // Subscription to signals
      console.log(`dateRange: ${this.dateRange()}`);
      this.search();
    })
  }

  changeFrom(date: string) {
    this.from.set(date);
  }

  changeTo(date: string) {
    this.to.set(date);
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
