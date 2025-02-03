import { Injectable } from '@angular/core';

interface StorageConfig<T> {
  storage?: Storage;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private readonly defaultConfig: StorageConfig<unknown> = {
    storage: localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  };

  save<K extends keyof T, T>(key: K, data: T[K], config?: Partial<StorageConfig<T[K]>>): void {
    try {
      const { storage, serialize } = { ...this.defaultConfig, ...config };
      const serializedData = serialize!(data);
      storage!.setItem(String(key), serializedData);
    } catch (error) {
      console.error(`Error persisting data for key "${String(key)}":`, error);
      throw new Error(`Failed to persist data for key "${String(key)}"`);
    }
  }

  load<K extends keyof T, T>(key: K, config?: Partial<StorageConfig<T[K]>>): T[K] | null {
    try {
      const { storage, deserialize } = { ...this.defaultConfig, ...config };
      const data = storage!.getItem(key as string);
      return data ? (deserialize!(data) as T[K]) : null;
    } catch (error) {
      console.error(`Error loading data for key "${String(key)}":`, error);
      throw new Error(`Failed to load data for key "${String(key)}"`);
    }
  }

  remove<K extends keyof T, T>(key: K, config?: Pick<StorageConfig<unknown>, 'storage'>): void {
    try {
      const { storage } = { ...this.defaultConfig, ...config };
      storage!.removeItem(key as string);
    } catch (error) {
      console.error(`Error removing data for key "${String(key)}":`, error);
      throw new Error(`Failed to remove data for key "${String(key)}"`);
    }
  }

  has<K extends keyof T, T>(key: K, config?: Pick<StorageConfig<unknown>, 'storage'>): boolean {
    try {
      const { storage } = { ...this.defaultConfig, ...config };
      return storage!.getItem(key as string) !== null;
    } catch (error) {
      console.error(`Error checking data for key "${String(key)}":`, error);
      throw new Error(`Failed to check data for key "${String(key)}"`);
    }
  }
}
