// TODO  1: for each test, remove the skip marker and make it green
describe("creation phase", () => {
  type Item = Readonly<{ qty: number }>

  const item = (qty: number): Item => ({ qty })

  // TODO  2: complete the sum type definition
  type OptionalItem = Invalid | Valid
  type Valid = {
    _tag: 'Valid',
    value: Item
  }
  type Invalid = {
    _tag: 'Invalid'
  }

  const valid = (item: Item): Valid => ({ _tag: 'Valid', value: item })
  const invalid = (): Invalid => ({ _tag: 'Invalid' })

  // TODO  3: use OptionalItem as return type and remove throw
  const parseItem = (qty: string): OptionalItem => {
    if (qty.match(/^[0-9]+$/i)) return valid(item(Number(qty)))
    return invalid() // or return null | undefined
  }

  test("item creation", () => {
    const result = parseItem("10")

    // TODO  4: change test expectation
    expect(result).toStrictEqual(valid(item(10)))
  })

  test.each(["asd", "1 0 0", ""])("invalid item creation", (x) => {
    const result = parseItem(x)

    // TODO  5: change test expectation
    expect(result).toStrictEqual(invalid())
  })
})
