# Kebab Case to Title

`kebab-case` is in lowercase with `-` separators.

`Paragraph Titles` are words with a first letter in uppercase separated by spaces.

## Checklist

- Empty strings are untouched
- Single capitalized word is also untouched - e.g. `Title`
- Single lowercase word is converted to title `title` -> `Title`
- Words separated by `-` are converted `paragraph-title` -> `Paragraph Title`
- Spaces are filtered `paragraph - title` -> `Paragraph Title`

## Exercise

_Reverse the algorithm_

E.g.

- `Title` -> `title`
- `Paragraph Title` -> `paragraph-title`
- and so on...
  
[LinkTree](https://linktr.ee/ashleyfriezetdd)
[GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript)