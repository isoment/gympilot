/**
 *  A simple mock implementation of the local storage.
 */

export class MockLocalStorage {
  private store: { [key: string]: string } = {};

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] ? this.store[key] : null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}
