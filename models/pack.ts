import type { Card, Printing } from "./card";
import type { CardFlattened } from "./card-flattened";

export type Pack = {
  filters: Filter[]
  sections: PackSection[]
}

export type PackSection = {
  size: number
  filters: Filter[]
  layouts: Layout[]
}

export type Layout = {
  weight?: number
  slots: Slot[]
}

export type Slot = {
  filters: Filter[]
}

export type Filter = {
  key: keyof CardFlattened
  value: string | boolean
  op?: '==' | '!='
}

const repeat = (element: any, n: number) => Array(n).fill(element).flat();
const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

const NONFOIL: Filter = { key: "foiling", value: "S" }
const RAINBOWFOIL: Filter = { key: "foiling", value: "R" }

const COMMON: Filter = { key: "rarity", value: "C" }
const RARE: Filter = { key: "rarity", value: "R" }
const MAJESTIC: Filter = { key: "rarity", value: "M" }

const LIGHTNING: Filter = { key: "types", value: "Lightning" }
const GENERIC: Filter = { key: "types", value: "Generic" }
const WIZARD: Filter = { key: "types", value: "Wizard" }
const ILLUSIONIST: Filter = { key: "types", value: "Illusionist" }
const RUNEBLADE: Filter = { key: "types", value: "Runeblade" }
const EQUIPMENT: Filter = { key: "types", value: "Equipment" }
const EXPSLOT: Filter = { key: "expansion_slot", value: true }

const not = (filter: Filter): Filter => ({ ...filter, op: '!=' })
const NOCLASS: Filter[] = [not(GENERIC), not(ILLUSIONIST), not(RUNEBLADE), not(WIZARD)]

const applyFilter = (card: CardFlattened, filter: Filter): boolean => {
  const op = filter.op ?? '=='
  const value = card[filter.key]
  
  let result: boolean

  if (Array.isArray(value)) {
    result = (value as Array<any>).includes(filter.value)
  } else {
    result = value == filter.value
  }
  return op == "==" ? result : !result
}

const applyFilters = (card: CardFlattened, filters: Filter[]): boolean => {
  for (const filter of filters) {
    if (applyFilter(card, filter)) { continue }
    return false
  }
  return true
}

const getCard = (cards: CardFlattened[], filters: Filter[]): CardFlattened => {
  const filteredCards = cards.filter((card) => applyFilters(card, filters))
  return getRandomElement(filteredCards)
}

const buildLayout = (cards: CardFlattened[], layout: Layout): CardFlattened[] => {
  const result: CardFlattened[] = []
  for (const slot of layout.slots) {
    result.push(getCard(cards, slot.filters))
  }
  return result
}

const chooseLayout = (layouts: Layout[]): Layout => {
  const weightedLayouts: Layout[] = []
  for (const layout of layouts) {
    const weight = layout.weight ?? 1
    weightedLayouts.push(...repeat(layout, weight))
  }
  return getRandomElement(weightedLayouts)
}

export const buildPack = (pack: Pack, cards: CardFlattened[]) => {  
  const setCards = cards.filter((card) => applyFilters(card, pack.filters))
  const result: CardFlattened[] = []

  for (const section of pack.sections) {
    const sectionCards = setCards.filter(card => applyFilters(card, section.filters))
    const layout = chooseLayout(section.layouts)

    result.push(...buildLayout(sectionCards, layout))
  }

  return result
}

export const omens: Pack = {
  filters: [
    { key: "set_id", value: "OMN"},
    not(EXPSLOT)
  ],
  sections: [
    {
      size: 6,
      filters: [ COMMON, NONFOIL, LIGHTNING, not(EQUIPMENT) ],
      layouts: [
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 2),
            ...repeat({ filters: [RUNEBLADE] }, 2),
            ...repeat({ filters: [WIZARD] }, 2),
          ]
        },
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 3),
            ...repeat({ filters: [RUNEBLADE] }, 2),
            ...repeat({ filters: [WIZARD] }, 1),
          ]
        },
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 3),
            ...repeat({ filters: [RUNEBLADE] }, 1),
            ...repeat({ filters: [WIZARD] }, 2),
          ]
        },
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 1),
            ...repeat({ filters: [RUNEBLADE] }, 3),
            ...repeat({ filters: [WIZARD] }, 2),
          ]
        },
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 2),
            ...repeat({ filters: [RUNEBLADE] }, 3),
            ...repeat({ filters: [WIZARD] }, 1),
          ]
        },
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 1),
            ...repeat({ filters: [RUNEBLADE] }, 2),
            ...repeat({ filters: [WIZARD] }, 3),
          ]
        },
        {
          slots: [
            ...repeat({ filters: [ILLUSIONIST] }, 2),
            ...repeat({ filters: [RUNEBLADE] }, 1),
            ...repeat({ filters: [WIZARD] }, 3),
          ]
        }
      ]
    },
    {
      size: 1,
      filters: [COMMON, NONFOIL, LIGHTNING, not(EQUIPMENT)],
      layouts: [
        { slots: [ { filters: [ILLUSIONIST] } ] },
        { slots: [ { filters: [RUNEBLADE] } ] },
        { slots: [ { filters: [WIZARD] } ] },
        { slots: [ { filters: NOCLASS } ] },
      ]
    },

    {
      size: 3,
      filters: [COMMON, NONFOIL, not(EQUIPMENT)],
      layouts: [
        {
          slots: [
            ...repeat({ filters: [LIGHTNING, ...NOCLASS] }, 3)
          ]
        },
        {
          slots: [
            ...repeat({ filters: [LIGHTNING, ...NOCLASS] }, 2),
            ...repeat({ filters: [GENERIC] }, 1),
          ]
        }
      ]
    },
    {
      size: 1,
      filters: [COMMON, NONFOIL, EQUIPMENT],
      layouts: [
        { slots: [{ filters: []}] }
      ]
    },
    {
      size: 1,
      filters: [NONFOIL, RARE],
      layouts: [
        { slots: [{ filters: [] }] }
      ]
    },
    {
      size: 1,
      filters: [NONFOIL],
      layouts: [
        { slots: [{ filters: [RARE] }], weight: 6 },
        { slots: [{ filters: [MAJESTIC, not(EXPSLOT)] }], weight: 1 },
      ]
    },
    {
      size: 1,
      filters: [RAINBOWFOIL, not(EQUIPMENT)],
      layouts: [
        { slots: [{ filters: [COMMON] }], weight: 39*3 },
        { slots: [{ filters: [RARE] }], weight: 21*3 },
        { slots: [{ filters: [MAJESTIC] }], weight: 15 },
      ]
    }
  ]
}
