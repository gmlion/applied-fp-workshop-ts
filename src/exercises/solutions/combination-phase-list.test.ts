import { pipe } from "fp-ts/function"
import { Option } from "fp-ts/Option"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"

describe.skip("combination phase - list", () => {
  type Item = {
    qty: number
  }

  const itemCtor = (qty: number): Item => ({ qty })

  type createItemFn = (qty: string) => Option<Item>
  const createItem: createItemFn = (qty) =>
    qty.match(/^[0-9]+$/i) ? O.some(itemCtor(parseInt(qty, 10))) : O.none

  test("all valid - individual results", () => {
    const values = ["1", "10", "100"]
    const result = pipe(values, A.map(createItem))

    expect(result).toStrictEqual([O.some({ qty: 1 }), O.some({ qty: 10 }), O.some({ qty: 100 })])
  })

  test("some invalid - individual results", () => {
    const values = ["1", "asd", "100"]
    const result = pipe(values, A.map(createItem))

    expect(result).toStrictEqual([O.some({ qty: 1 }), O.none, O.some({ qty: 100 })])
  })

  test("all valid - summon result", () => {
    const values = ["1", "10", "100"]
    const result = pipe(values, A.traverse(O.Applicative)(createItem))

    expect(result).toStrictEqual(O.some([{ qty: 1 }, { qty: 10 }, { qty: 100 }]))
  })

  test("some invalid - summon result", () => {
    const values = ["1", "asd", "100"]
    const result = pipe(values, A.traverse(O.Applicative)(createItem))

    expect(result).toStrictEqual(O.none)
  })
})