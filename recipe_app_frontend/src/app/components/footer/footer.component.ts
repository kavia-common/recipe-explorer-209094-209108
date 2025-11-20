import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="op-footer" role="contentinfo">
      <div class="op-container">
        <p class="muted">© {{year}} Recipe Explorer • Ocean Professional</p>
      </div>
    </footer>
  `,
  styles: [`
    .op-footer{margin-top:2rem;padding:1.25rem 0;border-top:1px solid var(--op-border)}
    .muted{color:var(--op-textMuted);font-size:.875rem}
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
