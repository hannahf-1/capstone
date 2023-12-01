"use strict";

import { DateTime } from "luxon";


const month = 11;

const currentYear = DateTime.now().toFormat('yyyy');

// let date = DateTime.fromISO(`${currentYear}-${month}`);

let date = DateTime.fromFormat(`10`, `MM`);
let ate = DateTime.fromISO("2023-12-01T07:36:40+0000")

//date = date.plus({months: 1})

console.log (ate.toiso)

