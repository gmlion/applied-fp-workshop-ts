import { pipe } from "fp-ts/function"

// TODO - 1: remove skip marker
describe.skip("custom option monad", () => {
    const increment: (x: number) => number = (x) => x + 1

    const reverseString: (x: number) => Option<string> = (x) =>
        some(x.toString().split("").reverse().join(""))

    test("creation phase", () => {
        // TODO - 2: implement 'of' function
        const result = of(10)

        expect(isSome(result)).toBeTruthy()
    })

    test("combination phase - normal", () => {
        // TODO - 3: implement 'map' function
        const result = pipe(some(10), map(increment))

        expect(result).toStrictEqual(some(11))
    })

    test("combination phase - effectful", () => {
        // TODO - 4: implement 'chain' function
        const result = pipe(some(10), chain(reverseString))

        expect(result).toStrictEqual(some("01"))
    })

    test("removal phase - value", () => {
        // TODO - 5: implement 'fold' function
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

    // data types
    type Option<A> = None | Some<A>
    type None = {
        readonly _tag: "None"
    }
    type Some<A> = {
        readonly _tag: "Some"
        readonly value: A
    }

    // constructors
    const none = <A>(): Option<A> => ({ _tag: "None" })

    const some = <A>(a: A): Option<A> => ({ _tag: "Some", value: a })

    const of = <A>(a: A): Option<A> => {
        throw new Error("TODO")
    }

    // utilities
    const isSome = <A>(fa: Option<A>): boolean => fa._tag === "Some"

    // combiners
    // prettier-ignore
    const map = <A, B>(f: (a: A) => B) => (fa: Option<A>): Option<B> => {
        throw new Error("TODO")
    }

    // prettier-ignore
    const chain = <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>): Option<B> => {
        throw new Error("TODO")
    }

    // folders / runners
    // prettier-ignore
    const fold = <A, B>(onNone: () => B, onSome: (a: A) => B) => (fa: Option<A>) : B => {
        throw new Error("TODO")
    }
})
