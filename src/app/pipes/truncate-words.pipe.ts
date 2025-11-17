import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateWords',
    pure: true,
    standalone: false
})
export class TruncateWordsPipe implements PipeTransform {
  transform(value: any, limit: number = 10): string {
    if (value == null) return '';
    const text = String(value).trim();
    if (!text) return '';

    // Split by whitespace, collapse multiple spaces
    const words = text.split(/\s+/);
    if (words.length <= limit) return text;

    const truncated = words.slice(0, limit).join(' ');
    return truncated + '…';
  }
}
