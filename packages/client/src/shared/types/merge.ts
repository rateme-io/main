export type Merge<First, Second> = Omit<Second, keyof First> & First;
