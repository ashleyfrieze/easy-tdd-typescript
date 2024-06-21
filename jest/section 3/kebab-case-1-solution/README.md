# Kebab Case to Title

`kebab-case` is in lowercase with `-` separators.

`Paragraph Titles` are words with a first letter in uppercase separated by spaces.

## Checklist

- Empty strings are untouched
- Single capitalized word is also untouched - e.g. `Title`
- Single lowercase word is converted to title `title` -> `Title`
- Words separated by `-` are converted `paragraph-title` -> `Paragraph Title`
- Spaces are filtered `paragraph - title` -> `Paragraph Title`

## Exercise 1

_Reverse the algorithm_

### Solution Checklist

- Blank -> blank
- `Title` -> `title`
- `Paragraph Title` -> `paragraph-title`
- `Paragraph   Title` -> `paragraph-title`
- Round trip tests  

## Exercise 2

While `kebab-case` is common for filenames, `TitleCase` is common for classes.

Convert from `kebab-case` to `TitleCase`

E.g.

- `foo` -> `Foo`
- `empty-chair` -> `EmptyChair`

[LinkTree](https://linktr.ee/ashleyfriezetdd)
[GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript)