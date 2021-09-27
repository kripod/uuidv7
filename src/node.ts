import { randomFillSync } from "crypto";

import { uuidv7Builder } from "./_common";

export const uuidv7 = uuidv7Builder((array) => randomFillSync(array));
