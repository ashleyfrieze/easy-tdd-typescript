# Org Chart

> Example from previous section with a test reporter configuration added

We will store Employees.

```js
{
  id: 'emp1',
  name: 'Bill Stubbs',
  department: 'IT',
  roles: [
    'developer',
    'first aider',
  ],
  location: {
    building: 'IC1',
    floor: 1,
    desk: 27,
  }
}
```

We can also store the relationships between those employees:

E.g.
`emp9` is the manager of `emp1`.

And we want to find all people in a team, or a section of the org chart.

## Checklist

Inspired by [TPP](https://en.wikipedia.org/wiki/Transformation_Priority_Premise#The_Transformations[3])

### Day 0

- Is non existent employee not found?
- Can we store a single employee and then find them?
- If there's no manager for an employee, then we should get no relationship

### Developing further

- Can we store two employees and find them both
- If we add a relationship between two non existent employees is it rejected
- If we add a relationship between 1 existing and 1 non existing employee is it rejected
- If we add a relationship between two existing employees can it be found?
- Can we find the team under a specific manager?

### Exercise Solution

- Can we find the colleagues in the same team as an employee?
- Can we find all direct and indirect reports of a single manager?

[LinkTree](https://linktr.ee/ashleyfriezetdd)
[GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript)
