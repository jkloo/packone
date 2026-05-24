/**
* An array of all of the existing cards in Flesh and Blood, with each item being a unique card.
*/
export type Card = {
  /**
  * A UUID representing the card within this data set.
  */
  unique_id: string
  /**
  * The name of the card.
  */
  name: string
  /**
  * The color of the card's pitch strip. Can be Red, Yellow, Blue, or blank.
  */
  color: string
  /**
  * The pitch value of the card. Can be a number or blank.
  */
  pitch: string
  /**
  * The cost of the card. Can be a number, X, XX, X and a number, or blank.
  */
  cost: string
  /**
  * The power of the card. Can be a number, *, X, or blank.
  */
  power: string
  /**
  * The defense of the card. Can be a number, *, or blank.
  */
  defense: string
  /**
  * The health of the card. Can be a number or blank.
  */
  health: string
  /**
  * The intelligence of the card. Can be a number or blank.
  */
  intelligence: string
  /**
  * The arcane damage of the card. Can be a number, X, or blank. Represents the summed up amount of the lowest arcane damage of the card, unless that damage is based on an external variable, then it is X.
  */
  arcane?: string
  /**
  * The types of the card (includes all types, subtypes, etc).
  */
  types: string[]
  /**
  * The traits of the card.
  */
  traits: string[]
  /**
  * The keywords inherent to the card. Includes conditional keywords, but does not include keywords that are part of the card's activated and triggered abilities.
  */
  card_keywords: string[]
  /**
  * The activated abilities and once per turn effects of the cards. Just contains what type of ability it is, not the ability itself. (Ex: Once per Turn Action)
  */
  abilities_and_effects: string[]
  /**
  * The keywords that are part of the card's activated and triggered abilities.
  */
  ability_and_effect_keywords: string[]
  /**
  * The keywords that the card grants to other objects.
  */
  granted_keywords: string[]
  /**
  * The keywords that the card removes from other objects.
  */
  removed_keywords: string[]
  /**
  * The keywords that the card interacts with outside of granting/removing.
  */
  interacts_with_keywords: string[]
  /**
  * The functional text of the card, formatted in Markdown.
  */
  functional_text: string
  /**
  * The functional text of the card, formatted in plain text.
  */
  functional_text_plain: string
  /**
  * The full type text box of the card.
  */
  type_text: string
  /**
  * A boolean representing if the card is played and displayed horizontally.
  */
  played_horizontally: boolean
  /**
  * A boolean representing if the card is legal in Blitz (not including bans or suspensions).
  */
  blitz_legal: boolean
  /**
  * A boolean representing if the card is legal in Classic Constructed (not including bans or suspensions).
  */
  cc_legal: boolean
  /**
  * A boolean representing if the card is legal in Commoner (not including bans or suspensions).
  */
  commoner_legal: boolean
  /**
  * A boolean representing if the card is legal in Silver Age (not including bans or suspensions).
  */
  silver_age_legal: boolean
  /**
  * A boolean representing if the card is legal in Living Legend (not including bans or suspensions).
  */
  ll_legal: boolean
  /**
  * A boolean representing if the card is Living Legend in Blitz.
  */
  blitz_living_legend: boolean
  /**
  * The date the card became Living Legend in Blitz (will not be present otherwise).
  */
  blitz_living_legend_start?: string
  /**
  * A boolean representing if the card is Living Legend in Classic Constructed.
  */
  cc_living_legend: boolean
  /**
  * The date the card became Living Legend in Classic Constructed (will not be present otherwise).
  */
  cc_living_legend_start?: string
  /**
  * A boolean representing if the card is currently banned in Blitz.
  */
  blitz_banned: boolean
  /**
  * The date the card became banned in Blitz (will not be present otherwise).
  */
  blitz_banned_start?: string
  /**
  * A boolean representing if the card is currently banned in Classic Constructed.
  */
  cc_banned: boolean
  /**
  * The date the card became banned in Classic Constructed (will not be present otherwise).
  */
  cc_banned_start?: string
  /**
  * A boolean representing if the card is currently banned in Commoner.
  */
  commoner_banned: boolean
  /**
  * The date the card became banned in Commoner (will not be present otherwise).
  */
  commoner_banned_start?: string
  /**
  * A boolean representing if the card is currently banned in Living Legend.
  */
  ll_banned: boolean
  /**
  * The date the card became banned in Living Legend (will not be present otherwise).
  */
  ll_banned_start?: string
  /**
  * A boolean representing if the card is currently banned in Silver Age.
  */
  silver_age_banned: boolean
  /**
  * The date the card became banned in Silver Age (will not be present otherwise).
  */
  silver_age_banned_start?: string
  /**
  * A boolean representing if the card is currently banned in Ultimate Pit Fight.
  */
  upf_banned: boolean
  /**
  * The date the card became banned in Ultimate Pit Fight (will not be present otherwise).
  */
  upf_banned_start?: string
  /**
  * A boolean representing if the card is currently banned in Blitz.
  */
  blitz_suspended: boolean
  /**
  * The date the card became suspended in Blitz (will not be present otherwise).
  */
  blitz_suspended_start?: string
  /**
  * Represents when the card is set to be unsuspended in Blitz. Contains a displayable text describing when it will be unsuspended if it is currently suspended (will not be present otherwise).
  */
  blitz_suspended_end?: string
  /**
  * A boolean representing if the card is currently banned in Classic Constructed.
  */
  cc_suspended: boolean
  /**
  * The date the card became suspended in Classic Constructed (will not be present otherwise).
  */
  cc_suspended_start?: string
  /**
  * Represents when the card is set to be unsuspended in Classic Constructed. Contains a displayable text describing when it will be unsuspended if it is currently suspended (will not be present otherwise).
  */
  cc_suspended_end?: string
  /**
  * A boolean representing if the card is currently banned in Commoner.
  */
  commoner_suspended: boolean
  /**
  * The date the card became suspended in Commoner (will not be present otherwise).
  */
  commoner_suspended_start?: string
  /**
  * Represents when the card is set to be unsuspended in Commoner. Contains a displayable text describing when it will be unsuspended if it is currently suspended (will not be present otherwise).
  */
  commoner_suspended_end?: string
  /**
  * A boolean representing if the card is currently restricted in Living Legend.
  */
  ll_restricted: boolean
  /**
  * A boolean representing if the full pitch cycle is restricted - ex: only 1 card with the same name from *all* pitches can be played (will not be present if the card is not restricted).
  */
  ll_restricted_affects_full_cycle?: boolean
  /**
  * The date the card became banned in Living Legend (will not be present otherwise).
  */
  ll_restricted_start?: string
  /**
  * Contains a list of unique IDs representing the various cards referenced by this card.
  */
  referenced_cards?: string[]
  /**
  * Contains a list of unique IDs representing the various cards that reference this card.
  */
  cards_referenced_by?: string[]
  /**
  * Contains a list of objects representing the various printings of the card.
  */
  printings: Printing[]
  
  [k: string]: unknown
}

export type Printing = {
  /**
  * A UUID representing the printing within this data set.
  */
  unique_id: string
  /**
  * A UUID representing the set printing the printing belongs to within this data set.
  */
  set_printing_unique_id: string
  /**
  * The ID of the card printing.
  */
  id: string
  /**
  * The ID of the set the card is printed in.
  */
  set_id: string
  /**
  * The edition of the set the card is printed in.
  */
  edition: string
  /**
  * Whether the card printing comes in the expansion slot or not
  */
  expansion_slot: boolean
  /**
  * The foiling the card printing comes in.
  */
  foiling: string
  /**
  * A shortcode representing the rarity the card printing was printed at.
  */
  rarity: string
  /**
  * The artists of the card printing.
  */
  artists: string[]
  /**
  * An array of shortcodes representing the special art treatments or variations the card was printed with, if any.
  */
  art_variations: string[]
  /**
  * The flavor text of the card, formatted in Markdown.
  */
  flavor_text: string
  /**
  * The flavor text of the card, formatted in plain text.
  */
  flavor_text_plain: string
  /**
  * An official LSS image URL of the card printing, if it exists.
  */
  image_url: string | null
  /**
  * The amount of degrees the card image needs to be rotated to be oriented correctly.
  */
  image_rotation_degrees?: number
  /**
  * The TCGPlayer product ID of the card printing, if it exists.
  */
  tcgplayer_product_id?: string | null
  /**
  * A URL to TCPlayer product listing of the card printing, if it exists.
  */
  tcgplayer_url?: string | null
  /**
  * All of the data for the double-sided cards this card printing is a part of.
  */
  double_sided_card_info?: {
    /**
    * The Unique ID of the card printing that is the other face of this double-sided card.
    */
    other_face_unique_id: string
    /**
    * A boolean representing whether this card printing is the front or back of the double-sided card.
    */
    is_front: boolean
    /**
    * A boolean representing whether this double-sided card is a Double Face Card (ex: Invoke Tomeltai / Tomeltai).
    */
    is_DFC: boolean
    [k: string]: unknown
  }
  
  [k: string]: unknown
}