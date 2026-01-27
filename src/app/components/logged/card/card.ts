import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() duration: string = '';
  @Input() ageRating: string = '';
  @Input() approval: number | null = null;
  @Input() provider: string = '';

  @Input() isTop10: boolean = false;
  @Input() topLabel: string = 'TOP 10';

  getApprovalClasses(): { [key: string]: boolean } {
    if (this.approval == null) {
      return {};
    }
    return {
      'approval-high': this.approval >= 50,
      'approval-low': this.approval < 50
    };
  }
}
