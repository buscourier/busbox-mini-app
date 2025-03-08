import type { TabConfig, TabOptions } from '@shared/types';

/**
 * Factory for creating tabs with typed configuration
 */
export class TabFactory {
  /**
   * Creates an array of tabs based on configuration
   *
   * @template T - Tab identifier type (e.g., 'OFFICE' | 'COURIER')
   * @template K - Tab configuration type that extends base TabConfig interface {apiValue: string,
   * name: string}
   *
   * @param config - Tab configuration object in Record<T, K> format
   *                Example: { OFFICE: { apiValue: 'give', name: 'Office' }, COURIER:
   *                { apiValue: 'pickup', name: 'Courier' } }
   *
   * @param options - Options for creating tabs
   * @param options.defaultTabType - Tab identifier that will be marked as default (isDefault: true)
   *
   * @returns Array of tabs, where each tab contains:
   * - id: T - identifier from config
   * - ...K - all fields from TabConfig (apiValue, name)
   * - order: number - tab sequence number (starting from 1)
   * - isDefault: boolean - flag indicating whether the tab is default
   *
   * @example
   * const config = {
   *   OFFICE: { apiValue: 'give', name: 'Office' },
   *   COURIER: { apiValue: 'pickup', name: 'Courier' }
   * };
   *
   * const tabs = TabFactory.createTabs(config, { defaultTabType: 'OFFICE' });
   */
  static createTabs<T extends string, K extends TabConfig>(
    config: Record<T, K>,
    options: TabOptions<T>,
  ): ({ id: T; order: number; isDefault: boolean } & K)[] {
    return Object.entries(config).map(([id, value], index) => ({
      id: id as T,
      ...(value as K),
      order: index + 1,
      isDefault: id === options.defaultTabType,
    }));
  }
}
