"use strict";

import { DateTime } from "luxon";


const month = 11;

const currentYear = DateTime.now().toFormat('yyyy');

// let date = DateTime.fromISO(`${currentYear}-${month}`);

let date = DateTime.fromFormat(`10`, `MM`);
let date2 = DateTime.fromISO("2023-12-01T07:36:40+0000")

let date3 = DateTime.fromObject({month: 12, year: 2021, minute:35}).endOf('minute')



console.log (date3.toISO())

