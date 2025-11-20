import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfigService } from '../services/config.service';

/**
 * PUBLIC_INTERFACE
 * Guard that allows activation only if the feature flag is enabled.
 */
export const featureEnabledGuard = (flag: string): CanActivateFn => {
  return () => {
    const cfg = inject(ConfigService);
    return cfg.featureEnabled(flag);
  };
};
