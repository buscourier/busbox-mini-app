/**
 * Represents a filtered source of cities based on a search query.
 * Used as a tuple type [cities, searchQuery] for city filtering operations.
 *
 * @template T - Type of the city (e.g., PickupCity or DeliveryCity)
 * @param cities - Array of cities matching the filter criteria
 * @param searchQuery - Search string used for filtering cities
 */
export type CitiesFilterSource<T> = [cities: T[], searchQuery: string];
