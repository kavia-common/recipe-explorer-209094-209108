import { Pipe, PipeTransform } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Wraps query matches in a span highlight.
 */
@Pipe({ name: 'highlight', standalone: true })
export class HighlightPipe implements PipeTransform {
  transform(text: string, query?: string): string {
    if (!text || !query) return text;
    const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${esc})`, 'ig'), '<span class="op-highlight">$1</span>');
  }
}
