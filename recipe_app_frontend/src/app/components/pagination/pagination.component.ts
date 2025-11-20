import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination" aria-label="Pagination" *ngIf="total > pageSize">
      <button class="op-btn ghost" [disabled]="page<=1" (click)="go(page-1)" aria-label="Previous page">‹</button>
      <span class="page-info" aria-live="polite">Page {{page}} of {{totalPages}}</span>
      <button class="op-btn ghost" [disabled]="page>=totalPages" (click)="go(page+1)" aria-label="Next page">›</button>
    </nav>
  `,
  styles: [`.pagination{display:flex;gap:.5rem;align-items:center;justify-content:center;margin-top:1rem}.page-info{font-size:.9rem;color:var(--op-textMuted)}`]
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() pageSize = 12;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();
  get totalPages() { return Math.max(1, Math.ceil(this.total / this.pageSize)); }
  go(p: number) { this.pageChange.emit(Math.min(this.totalPages, Math.max(1, p))); }
}
