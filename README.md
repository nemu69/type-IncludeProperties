# type-IncludeProperties
Uselful for fullstack dev using **Front TypeScript** and **.NET**.

This goal is typed [Include Method]([https://](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.entityframeworkqueryableextensions.include?view=efcore-8.0#microsoft-entityframeworkcore-entityframeworkqueryableextensions-include-1(system-linq-iqueryable((-0))-system-string))) for **EF Core**  via DTO.

### Docs links:

> [ObjectQuery<T>.Include(String) Method]([https://](https://learn.microsoft.com/en-us/dotnet/api/system.data.objects.objectquery-1.include?view=netframework-4.8.1))

### Usage Notes

```typescript
export interface EntityA {
    PropertyPrimitve1: number;
    PropertyPrimitve2: Date;
    PropertyPrimitve3?: TimeSpan;
    EntityB?: EntityB;
}


export interface EntityB {
    PropertyPrimitve1: number;
    PropertyPrimitve2: Date;
    PropertyPrimitve3?: TimeSpan;
    EntityC: EntityC;
}

export interface EntityC {
    PropertyPrimitve1: number;
    PropertyPrimitve2: Date;
    PropertyPrimitve3?: TimeSpan;
}

type IncludeResult = IncludeProperties<EntityA>;
// "EntityB" | "EntityB.EntityC"
