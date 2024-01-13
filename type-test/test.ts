import { Expect, Equal } from "./utility-test";

export interface EntityA {
  PropertyPrimitve1: number;
  PropertyPrimitve2: Date;
  PropertyPrimitve3?: number;
  EntityB?: EntityB;
}

export interface EntityB {
  PropertyPrimitve1: number;
  PropertyPrimitve2: Date;
  PropertyPrimitve3?: number;
  EntityC: EntityC;
}

export interface EntityC {
  PropertyPrimitve1: number;
  PropertyPrimitve2: Date;
  PropertyPrimitve3?: number;
  EntityD: EntityD;
}

export interface EntityD {
  PropertyPrimitve1: number;
  PropertyPrimitve2: Date;
  PropertyPrimitve3?: number;
  EntityD: EntityD;
}

type test0 = IncludeProperties<EntityA>;
type expected0 =
  "EntityB"
  | "EntityB.EntityC"
  | "EntityB.EntityC.EntityD"
  | "EntityB.EntityC.EntityD.EntityD";
type check0 = Expect<Equal<test0, expected0>>;

type test1 = IncludeProperties<EntityB>;
type expected1 = "EntityC" | "EntityC.EntityD" | "EntityC.EntityD.EntityD";
type check1 = Expect<Equal<test1, expected1>>;

type test2 = IncludeProperties<EntityC>;
type expected2 = "EntityD" | "EntityD.EntityD";
type check2 = Expect<Equal<test2, expected2>>;

type test3 = IncludeProperties<EntityD>;
type expected3 = "EntityD" | "EntityD.EntityD";
type check3 = Expect<Equal<test3, expected3>>;

type test4 = IncludeProperties<EntityA | EntityB | EntityC | EntityD>;
type expected4 =
  "EntityB"
  | "EntityB.EntityC"
  | "EntityB.EntityC.EntityD"
  | "EntityB.EntityC.EntityD.EntityD"
  | "EntityC"
  | "EntityC.EntityD"
  | "EntityC.EntityD.EntityD"
  | "EntityD"
  | "EntityD.EntityD";
type check4 = Expect<Equal<test4, expected4>>;

type test5 = IncludeProperties<number>;
type expected5 = never;
type check5 = Expect<Equal<test5, expected5>>;
