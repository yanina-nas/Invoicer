import moment, { Moment } from "moment";
import { Currency } from "./enums";
import { Dictionary, TimesheetEntry } from "./types";

export const ZERO: number = 0;
export const ONE: number = 1;

export const DEFAULT_WORKING_DAY_HOURS: number = 8;
export const DEFAULT_DAILY_RATE: number = 249;
export const DEFAULT_HOURLY_RATE: number = 70;


export const SATURDAY_ID: number = 6;
export const SUNDAY_ID: number = 0;

export const INVOICE_SERIAL_NUMBER_LENGTH: number = 3;

export const FIRST_ELEMENT: number = 0;
export const LAST_ELEMENT: number = -1;

export const format = <T>(currency: Currency, value: T): string => {
    if (Number(value) >= 0 ){
        switch (currency) {
            case Currency.Dollar:
                return `${Currency.Dollar}${value}`;
            case Currency.Euro:
                return `${value}${Currency.Euro}`;
        }
    } else {
        switch (currency) {
            case Currency.Dollar:
                return `-${Currency.Dollar}${Number(-value)}`;
            case Currency.Euro:
                return `-${Number(-value)}${Currency.Euro}`;
        }
    }
    
};

export const parse = (currency: Currency, val: string): string => val.replace(currency, "");



export const dictToValuesArr = (dict: Dictionary<string, TimesheetEntry>): (TimesheetEntry | undefined)[] => Object.keys(dict).map((key) => dict[key]);

export const multiplyArraysSum = (array1: number[], array2: number[]): number => {
    return array1.reduce((accumulator, currentValue, index) => (accumulator + currentValue * array2[index], ZERO));
};

export const getDaysFromRange = (startDate: Moment | null, endDate: Moment | null, workdaysFilter: boolean): Moment[] => {
    const range = [];
    if (startDate && endDate) {
        const diff = endDate.diff(startDate, "days") + ONE;
        for (let i = 0; i < diff; i++) {
            if (workdaysFilter && ((moment(startDate).add(i, "days").day() === SATURDAY_ID) || (moment(startDate).add(i, "days").day()) === SUNDAY_ID)) {
                continue;
            }
            range.push(moment(startDate).add(i, "days"));
        }
    }
    return range;
};


// TODO: Rewrite. Works incorrect
export const getMonthsFromRange = (startDate: Moment | null, endDate: Moment | null): string[] => {
    const monthsRange = [];
    if (startDate && endDate) {
        const diff = endDate.diff(startDate, "months") + ONE;
        console.log(`DIFF: ${diff}`);
        for (let i = 0; i < diff; i++) {
            monthsRange.push(moment(startDate).add(i, "months"));
            console.log(monthsRange);
        }
    }
    return monthsRange.map(i => i.format("MMMM"));
};

export const keysToDictionary = (keys: Moment[], { rate, hours }: TimesheetEntry): Dictionary<string, TimesheetEntry> => {
    const newArr: Dictionary<string, TimesheetEntry> = keys.reduce((accumulator, key) => ({
        ...accumulator,
        [`${moment(key).format("LL")}`]: {
            hours: hours,
            rate: rate,
        },
    }), {});
    return newArr;
};
