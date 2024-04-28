/**
 * Primitive represents the basic types
 */
export type Primitive = string | number | boolean | Date | null | undefined;

/**
 * CheckCircularly is a utility type that checks if a type is the same as its parent.
 * If it is, it returns `never`, effectively breaking the circular reference.
 */
export type CheckCircularly<Type, Parent> = Type extends Parent ? never : Type;


/**
 * ArrayType is a conditional type in TypeScript that extracts the type of the elements of an array.
 *
 * @template T The type to check. It should be an array type.
 *
 * @returns
 ** If T is an array type, it returns the type of the elements of the array.
 ** If T is not an array type, it returns T.
 *
 * @example
 * type NumberType = ArrayType<number[]>;
 * // ^? number
 *
 * type NumberType = ArrayType<number>;
 * // ^? number
 */
export type ArrayType<T> = T extends (infer U)[] ? U : T;
