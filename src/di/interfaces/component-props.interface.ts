export type ComponentProps<T extends Function> = Partial<
  Omit<Record<keyof T['prototype'], T['prototype'][keyof T['prototype']]>, 'render'>
>;
