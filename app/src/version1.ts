/*
    ## V1 - Focus on the center (pure domain logic)

    Develop an API (types and functions) that executes commands:
    - Implement all commands logic.
    - Commands are sent in batch and executed sequentially.
    - The planet grid has a wrapping effect from one edge to another (pacman).
    - For now, ignore obstacle detection logic
 */

import { match } from "ts-pattern"

// TODO 1: Those type alias are only placeholders,
//  use correct type definitions and feel free to add more...
export type Rover = Readonly<{ direction: Direction, position: Position }>
export type Position = Readonly<{ x :number, y:number }>
export type Direction = 'n' | 's' | 'e' | 'w'
export type Planet = Readonly<{ size: Size, obstacles: Obstacle[]}>
export type Size = Readonly<{ width: number, height: number }>
export type Obstacle = Readonly<{ position: Position }>
export type Command = 'f' | 'b' | 'l' | 'r'
export type Commands = Command[]

export const rover = (direction: Direction, position: Position): Rover => ({
  direction,
  position,
})
export const position = (x: number, y: number): Position => ({ x, y })
export const north = () => "n" as const
export const south = () => "s" as const
export const west = () => "w" as const
export const east = () => "e" as const
export const planet = (size: Size, obstacles: Obstacle[]): Planet => ({
  size,
  obstacles,
})
export const size = (width: number, height: number): Size => ({ width, height })
export const obstacle = (x: number, y: number): Obstacle => ({
  position: { x, y },
})
export const forward = (): Command => "f"
export const backward = (): Command => "b"
export const left = (): Command => "l"
export const right = (): Command => "r"


// TODO 2: Execute all commands and return final rover state
export const executeAll = (
  planet: Planet,
  rover: Rover,
  commands: Commands,
): Rover => {
  return commands.reduce(execute(planet), rover)
}

// TODO 3: Dispatch each command to the specific function
export const execute =
  (planet: Planet) =>
  (rover: Rover, command: Command): Rover => {
    return match(command)
    .with('f', () => moveForward(planet, rover))
    .with('b', () => moveBackward(planet, rover))
    .with('l', () => turnLeft(rover))
    .with('r', () => turnRight(rover))
    .exhaustive()
  }


// TODO 4: Change rover direction
const turnRight = (rover: Rover): Rover => ({
  ...rover,
  direction:
    match(rover.direction)
    .with(north(), () => east())
    .with(east(), () => south())
    .with(south(), () => west())
    .with(west(), () => north())
    .exhaustive()
})

// TODO 5: Change rover direction
const turnLeft = ({ direction, position }: Rover): Rover => {
  const d =
    match(direction)
    .with('n', () => west())
    .with('e', () => north())
    .with('s', () => east())
    .with('w', () => south())
    .exhaustive()
  return rover(d, position)
}

// TODO 6: Change rover position
const moveForward = (planet: Planet, { direction, position: {x,y}  }: Rover): Rover => {
  const wrapX = wrap(planet.size.width)
  const wrapY = wrap(planet.size.height)
  const newPosition =
    match(direction)
    .with('n', () => position(x, wrapY(y, 1)))
    .with('e', () => position(wrapX(x, 1), y))
    .with('s', () => position(x, wrapY(y, -1)))
    .with('w', () => position(wrapX(x, -1), y))
    .exhaustive()
  return rover(direction, newPosition)
}

// TODO 7: Change rover position
const moveBackward = (planet: Planet, { direction, position: {x,y}  }: Rover): Rover => {
  const wrapX = wrap(planet.size.width)
  const wrapY = wrap(planet.size.height)
  const newPosition =
    match(direction)
    .with('n', () => position(x, wrapY(y, -1)))
    .with('e', () => position(wrapX(x, -1), y))
    .with('s', () => position(x, wrapY(y, 1)))
    .with('w', () => position(wrapX(x, 1), y))
    .exhaustive()
  return rover(direction, newPosition)
}


// NOTE: utility function for the pacman effect
const wrap = 
  (limit: number) =>
  (value: number,  delta: number): number =>
  (((value + delta) % limit) + limit) % limit
