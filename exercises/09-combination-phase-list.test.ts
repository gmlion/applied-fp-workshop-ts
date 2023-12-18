import { pipe } from "fp-ts/function"
import { Option } from "fp-ts/Option"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"

// TODO  1: for each test, remove the skip marker and make it green
describe("combination phase - list", () => {
  type Item = Readonly<{ qty: number }>

  const item = (qty: number): Item => ({ qty })

  const parseItem = (qty: string): Option<Item> =>
    qty.match(/^[0-9]+$/i) ? O.some(item(Number(qty))) : O.none

  test("all valid - individual results", () => {
    const values = ["1", "10", "100"]
    const result = pipe(
      values,
      A.map(parseItem)
      // TODO  2: map over values and create items
    )

    expect(result).toStrictEqual([
      O.some({ qty: 1 }),
      O.some({ qty: 10 }),
      O.some({ qty: 100 }),
    ])
  })

  test("some invalid - individual results", () => {
    const values = ["1", "asd", "100"]
    const result = pipe(
      values,
      A.map(parseItem)
      // TODO  3: map over values and create items
    )

    expect(result).toStrictEqual([
      O.some({ qty: 1 }),
      O.none,
      O.some({ qty: 100 }),
    ])
  })

  test("all valid - summon result", () => {
    const values = ["1", "10", "100"]
    const result = pipe(values, O.traverseArray(parseItem))

    // TODO  4: change expectation
    expect(result).toStrictEqual(O.some([{qty: 1}, {qty: 10}, {qty: 100}]))
  })

  test("some invalid - summon result", () => {
    const values = ["1", "asd", "100"]
    const result = pipe(values, O.traverseArray(parseItem))

    // TODO  5: change expectation
    expect(result).toStrictEqual(O.none)
  })
})
