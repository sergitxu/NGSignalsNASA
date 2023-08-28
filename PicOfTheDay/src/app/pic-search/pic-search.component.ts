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

  from = signal('2023-07-28'); // writable signal of string
  to = signal('2023-08-27');
  pics = signal<PicType[]>([]);

  dateRange = computed(() => `Images from ${this.from()}, to ${this.to()}`); // computed signal, not writable

  constructor() {
    effect(() => { // Subscription to signals
      console.log(`dateRange: ${this.dateRange()}`);
    })
  }

  async search(): Promise<void> {
    if (!this.from() || !this.to()) {
      console.log('NO');
      return;
    }

    try {
      const pics = await this.picOfDayService.findPicsInRange(this.from(), this.to()).toPromise();

      if (pics) {
        this.pics.set(pics);
        console.log(this.pics);

      } else {
        // Handle the case where the response is undefined
        console.log('No pictures found.');
      }
    } catch (error) {
      console.error('Error fetching pictures:', error);
      // Handle the error as needed
    }
  }


}
