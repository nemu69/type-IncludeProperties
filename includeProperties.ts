/**
 * Primitive represents the basic types
 */
type Primitive = string | number | boolean | Date | null | undefined;

/**
 * CheckCircularly is a utility type that checks if a type is the same as its parent.
 * If it is, it returns `never`, effectively breaking the circular reference.
 */
type CheckCircularly<Type, Parent> = Type extends Parent ? never : Type;

/**
 * Join is a utility type that concatenates two property keys with a dot.
 * It's used to generate the paths of nested properties.
 */
type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}.${P}`
		: never
	: never;

/**
 * GetNonPrimitive is a mapped type that iterates over the properties of a type.
 * If a property's type is a primitive, it's excluded from the resulting type.
 * If a property's type is the same as the parent type, it's also excluded to prevent circular references.
 */
type GetNonPrimitive<Type, Parent = never> = {
	[Property in keyof Type as Type[Property] extends Primitive ? never : Property]-?: 
		CheckCircularly<Type[Property], Parent>;
};

/**
 * Paths is a recursive type that generates a union of the paths of all non-primitive properties in a type.
 * The paths are represented as strings, with nested properties separated by dots.
 */
type Paths<T, Parent = never> = T extends Primitive
	? never
	: {
			[K in keyof GetNonPrimitive<T, Parent>]-?: K extends string | number
				? `${K}` | Join<K, Paths<GetNonPrimitive<T, Parent>[K], T>>
				: never;
		}[keyof GetNonPrimitive<T, Parent>];


/**
 * Represents a type that includes only DTO type. Useful for .NET developers, it's like an Include method.
 * Sub type is separated by a .
 *
 * @usageNotes
 *
 * ### [EntityA]
 * ````
 * export interface EntityA {
 *   PropertyPrimitve1: number;
 *   PropertyPrimitve2: Date;
 *   PropertyPrimitve3?: TimeSpan;
 *   EntityB: EntityB;
 * }
 * ````
 * ### [EntityB]
 * ````
 * export interface EntityB {
 *   PropertyPrimitve1: number;
 *   PropertyPrimitve2: Date;
 *   PropertyPrimitve3?: TimeSpan;
 *   EntityC: EntityC;
 * }
 * ````
 * ### [EntityC]
 * ````
 * export interface EntityC {
 *   PropertyPrimitve1: number;
 *   PropertyPrimitve2: Date;
 *   PropertyPrimitve3?: TimeSpan;
 * }
 * ````
 * ### [Expected]
 *
 * ```
 * type IncludeResult = IncludeProperties<EntityA>;
 * ```
 * // ^? "EntityB" | "EntityB.EntityC"
 *
 **/
export type IncludeProperties<T> = Paths<GetNonPrimitive<T>>;
