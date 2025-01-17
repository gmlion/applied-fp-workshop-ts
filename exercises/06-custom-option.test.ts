import { flow, identity, pipe } from "fp-ts/function"

// TODO  1: for each test, remove the skip marker and make it green
describe("custom option monad", () => {
  const increment: (x: number) => number = (x) => x + 1

  const reverseString: (x: number) => Option<string> = (x) =>
    some(x.toString().split("").reverse().join(""))

  test("creation phase", () => {
    // TODO  2: implement 'of' function
    const result = of(10)

    expect(isSome(result)).toBeTruthy()
  })

  test("combination phase - normal", () => {
    // TODO  3: implement 'map' function
    const result = pipe(some(10), map(increment))

    expect(result).toStrictEqual(some(11))
  })

  test("combination phase - effectful", () => {
    // TODO  4: implement 'flatMap' function
    const result = pipe(some(10), flatMap(reverseString))

    expect(result).toStrictEqual(some("01"))
  })

  test("removal phase - value", () => {
    // TODO  5: implement 'fold' function
    const result = pipe(
      some(10),
      fold(
        () => "none",
        (x) => x.toString(),
      ),
    )

    expect(result).toStrictEqual("10")
  })

  test("removal phase - alternative value", () => {
    const result = pipe(
      none<string>(),
      fold(
        () => "none",
        (x) => x.toString(),
      ),
    )

    expect(result).toStrictEqual("none")
  })

  // TODO 6: remove skip marker and check if functor laws holds
  describe("functor laws", () => {
    test("identity: identities map to identities", () => {
      const result = pipe(some(10), map(identity))
      const expected = pipe(10, identity, some)
      expect(result).toStrictEqual(expected)
    })

    test("composition: mapping a composition is the composition of the mappings", () => {
      const result = pipe(some(10), map(increment), map(increment))
      const expected = pipe(some(10), map(flow(increment, increment)))
      expect(result).toStrictEqual(expected)
    })
  })

  // TODO 7: remove skip marker and check if monad laws holds
  describe("monad laws", () => {
    test("left identity", () => {
      const result = pipe(some(10), flatMap(reverseString))
      const expected = pipe(10, reverseString)
      expect(result).toStrictEqual(expected)
    })

    test("right identity", () => {
      const result = pipe(some(10), flatMap(some))
      const expected = pipe(10, some)
      expect(result).toStrictEqual(expected)
    })

    test("associativity", () => {
      const result = pipe(some(10), flatMap(some), flatMap(reverseString))
      const expected = pipe(
        some(10),
        flatMap((x) => pipe(some(x), flatMap(reverseString))),
      )
      expect(result).toStrictEqual(expected)
    })
  })

  // data types
  type Option<A> = None | Some<A>

  type None = Readonly<{ _tag: "None" }>
  type Some<A> = Readonly<{ _tag: "Some"; value: A }>

  // constructors
  const none = <A>(): Option<A> => ({ _tag: "None" })

  const some = <A>(a: A): Option<A> => ({ _tag: "Some", value: a })

  const of = <A>(a: A): Option<A> => {
    return some(a)
  }

  // utilities
  const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"

  // combiners
  const map =
    <A, B>(f: (a: A) => B) =>
    (fa: Option<A>): Option<B> => {
      if (isSome(fa)) {
        return of(f(fa.value))
      } else {
        return fa
      }
    }

  const flatMap =
    <A, B>(f: (a: A) => Option<B>) =>
    (fa: Option<A>): Option<B> => {
      if (isSome(fa)) {
        return f(fa.value)
      } else {
        return fa
      }
    }

  // folders / runners
  const fold =
    <A, B>(onNone: () => B, onSome: (a: A) => B) =>
    (fa: Option<A>): B => {
      if (isSome(fa)) {
        return onSome(fa.value)
      } else {
        return onNone()
      }
    }
})
