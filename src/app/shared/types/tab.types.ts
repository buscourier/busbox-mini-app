/**
 * Base interface containing common properties for all tab types.
 * Used as a foundation for UI and API tabs.
 *
 * @template T - Type of the tab's unique identifier (default: string).
 */
interface BaseTab<T = string> {
  id: T;
  name: string;
  order?: number /**Defines the tab's order in the UI */;
  icon?: string;
  isDefault?: boolean;
}

/**
 * Interface for UI tabs that are used in the frontend.
 * Extends `BaseTab` and includes a `value` field for UI logic.
 *
 * @template T - Type of the tab's unique identifier (default: string).
 * @template V - Type of the tab's value (default: string).
 */
export interface Tab<T = string, V = string> extends BaseTab<T> {
  value: V;
}

/**
 * Interface for API-driven tabs that require a direct mapping to API values.
 * Extends `BaseTab` and includes an `apiValue` field to match API response data.
 *
 * @template T - Type of the tab's unique identifier (default: string).
 * @template V - Type of the API value (default: string).
 */
export interface ApiTab<T = string, V = string> extends BaseTab<T> {
  apiValue: V;
}

export interface TabConfig {
  apiValue: string;
  name: string;
}

export interface TabOptions<T> {
  defaultTabType: T;
}
