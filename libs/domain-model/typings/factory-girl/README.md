This is a modified `factory-girl`.

At the time this definition created, the version of `factory-girl` are:

- `factory-girl@5.0.4`
- `@types/factory-girl@5.0.2`

`factory-girl` had already using ES6 export but `@types/factory-girl` was still using CommonJS style.

This modified definition made the following changes based on `@types/factory-girl@5.0.2`

- Changed CommonJS export to ES6 export
- Add definition for `chance()`

# Recommended usage

```typescript
// eslint-disable-next-line import/no-extraneous-dependencies
import fg, { FactoryGirl } from 'factory-girl'

export const factory: FactoryGirl = new fg.FactoryGirl()
```
