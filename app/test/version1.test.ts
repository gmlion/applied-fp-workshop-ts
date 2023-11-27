import { execute, executeAll, planet, position, rover, size } from "../src/version1"

// TODO 1: gradually eliminate the "skip marker" and check that the test is green
describe("version 1", () => {
  // Planet layout
  // +-----+-----+-----+-----+-----+
  // | 0,3 |     |     |     | 4,3 |
  // +-----+-----+-----+-----+-----+
  // |     |     |     |     |     |
  // +-----+-----+-----+-----+-----+
  // |     |     |     |     |     |
  // +-----+-----+-----+-----+-----+
  // | 0,0 |     |     |     | 4,0 |
  // +-----+-----+-----+-----+-----+

  // NOTE: each test describe the scenario in pseudo-code

  test("turn right command", () => {
    //    planet = Planet:  5 4 (no obstacles)
    //    rover = Rover: 0 0 N
    //    command = Command: R
    //    result = execute(planet, rover, command)
    //    expect(result).toBe(Rover: 0 0 E)
    const p = planet(size(5,4), [])
    const r = rover('n', position(0, 0))
    const actual = execute(p)(r, 'r')
    const expected = rover('e', position(0, 0))
    expect(actual).toStrictEqual(expected)
  })

  test("turn left command", () => {
    //    planet = Planet: 5 4 (no obstacles)
    //    rover = Rover: 0 0 N
    //    command = Command: L
    //    result = execute(planet, rover, command)
    //    assertEquals(result, Rover: 0 0 W)
    const p = planet(size(5,4), [])
    const r = rover('n', position(0, 0))
    const actual = execute(p)(r, 'l')
    const expected = rover('w', position(0, 0))
    expect(actual).toStrictEqual(expected)
  })

  test("move forward command", () => {
    //    planet = Planet: 5 4 (no obstacles)
    //    rover = Rover: 0 1 N
    //    command = Command: F
    //    result = execute(planet, rover, command)
    //    expect(result).toBe(Rover: 0 2 N)
    const p = planet(size(5,4), [])
    const r = rover('n', position(0, 1))
    const actual = execute(p)(r, 'f')
    const expected = rover('n', position(0, 2))
    expect(actual).toStrictEqual(expected)
  })

  test.skip("move forward command, opposite direction", () => {
    //    planet = Planet: 5 4 (no obstacles)
    //    rover = Rover: 0 1 S
    //    command = Command: F
    //    result = execute(planet, rover, command)
    //    expect(result).toBe(Rover: 0 0 S)
  })

  test.skip("move backward command", () => {
    //    planet = Planet: 5 4 (no obstacles)
    //    rover = Rover: 0 1 N
    //    command = Command: B
    //    result = execute(planet, rover, command)
    //    expect(result).toBe(Rover: 0 0 N)
  })

  test.skip("move forward command, opposite direction", () => {
    //    planet = Planet: 5 4 (no obstacles)
    //    rover = Rover: 0 1 S
    //    command = Command: B
    //    result = execute(planet, rover, command)
    //    expect(result).toBe(Rover: 0 2 S)
  })

  test.skip("wrap on North", () => {
    //    planet = Planet: 5 4 (no obstacles)
    //    rover = Rover: 0 3 N
    //    command = Command: F
    //    result = execute(planet, rover, command)
    //    expect(result).toBe(Rover: 0 0 N)
  })

  test.skip("go to opposite angle", () => {
    //    planet = Planet 5 4 (no obstacles)
    //    rover = Rover: 0 0 N
    //    commands = Commands: L F R B
    //    result = executeAll(planet, rover, commands)
    //    expect(result).toBe(Rover: 4 3 N)
  })
})
