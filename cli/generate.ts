import { generate } from "../generate"
import { stringRepresentation } from "../models/utils"

const pack = await generate()

console.log(pack.map(stringRepresentation).join("\n"))
