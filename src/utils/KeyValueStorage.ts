export class KeyValueStorage {
  static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static get(key: string): string {
    return localStorage.getItem(key);
  }

  static isValueTruthy(key: string): boolean {
    return Boolean(localStorage.getItem(key));
  }
}
