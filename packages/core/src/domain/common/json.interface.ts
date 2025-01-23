export type JsonInterface = {
  [key: string]: JsonValue | JsonInterface | JsonInterface[];
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonValue[];
