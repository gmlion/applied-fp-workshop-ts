import { pipe } from "fp-ts/function"
import { Option } from "fp-ts/Option"
import * as O from "fp-ts/Option"

// TODO  1: for each test, remove the skip marker and make it green
describe("combination phase - many", () => {
  type Item = Readonly<{ name: string; qty: number }>

  const item =
    (name: string) =>
    (qty: number): Item => ({ name, qty })

  const checkName = (value: string): Option<string> =>
    value ? O.some(value) : O.none

  const checkQty = (value: string): Option<number> =>
    value.match(/^[0-9]+$/i) ? O.some(Number(value)) : O.none

  // TODO  2: create an item only if name and quantity are valid
  const parseItem = (name: string, qty: string): Option<Item> => {
    const item = {name: checkName(name), qty: checkQty(qty)}
    return pipe(
      checkName(name),
      O.flatMap((n) => pipe(
        checkQty(qty),
        O.map((qty) => ({name: n, qty: qty}))
      ))
    )
  }

  test("creation with valid parameters", () => {
    const result = parseItem("foo", "100")

    expect(result).toStrictEqual(O.some({ name: "foo", qty: 100 }))
  })

  test("creation with invalid name", () => {
    const result = parseItem("", "100")

    expect(result).toStrictEqual(O.none)
  })

  test("creation with invalid quantity", () => {
    const result = parseItem("foo", "")

    expect(result).toStrictEqual(O.none)
  })
})
