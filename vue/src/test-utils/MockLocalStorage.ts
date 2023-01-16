/**
 *  There are third party packages to mock out local storage for testing but
 *  we can implement a simple class to do it as well. We define the class with
 *  the same methods and then replace the real local storage on the window object
 */

export class MockLocalStorage {
  private store: { [key: string]: unknown } = {};

  clear(): void {
    this.store = {};
  }

  getItem(key: string): unknown {
    return this.store[key];
  }

  setItem(key: string, value: unknown): void {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}
