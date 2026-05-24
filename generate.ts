import type { CardFlattened } from "./models/card-flattened";
import { buildPack, omens } from "./models/pack";

export const generate = async (): Promise<CardFlattened[]> => {
  const file = Bun.file("flesh-and-blood-cards/json/english/card-flattened.json")
  const cards = await file.json() as CardFlattened[]

  return buildPack(omens, cards)
}
