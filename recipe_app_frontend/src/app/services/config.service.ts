import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * Provides configuration values derived from environment variables and defaults.
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly flags: Record<string, boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    const raw = (typeof process !== 'undefined' && process?.env?.['NG_APP_FEATURE_FLAGS']) || '';
    this.flags = {};
    raw.split(',').map(f => f.trim()).filter(Boolean).forEach(k => { this.flags[k] = true; });
  }

  // PUBLIC_INTERFACE
  apiBase(): string {
    /** Returns the base URL for API calls, defaulting to empty for mock usage. */
    return (typeof process !== 'undefined' && (process.env?.['NG_APP_API_BASE'] || process.env?.['NG_APP_BACKEND_URL'])) || '';
  }

  // PUBLIC_INTERFACE
  featureEnabled(flag: string): boolean {
    /** Returns true if a feature flag is enabled. */
    return !!this.flags[flag];
  }

  // PUBLIC_INTERFACE
  isBrowser(): boolean {
    /** Returns true if executing in the browser (not SSR). */
    return isPlatformBrowser(this.platformId);
  }
}
