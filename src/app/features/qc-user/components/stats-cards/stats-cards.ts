import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  imports: [CommonModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
})
export class StatsCards {
  @Input() highPriorityValue: number = 0;
  @Input() needReviewValue: number = 0;
  @Input() topPriorityValue: number = 0;
}
