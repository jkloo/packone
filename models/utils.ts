import type { CardFlattened } from "./card-flattened"

export const stringRepresentation = (card: CardFlattened): string => {
  let result = card.name

  if (card.color.length > 0) {
    result += ` (${card.color})`
  }
  return result
}