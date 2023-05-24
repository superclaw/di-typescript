export class Container {
  private static registry: Map<string, unknown> = new Map();

  public static register(key: string, instance: unknown): void {
    if (!Container.registry.has(key)) {
      Container.registry.set(key, instance);
    }
  }

  public static get(key: string): unknown {
    return Container.registry.get(key);
  }
}
