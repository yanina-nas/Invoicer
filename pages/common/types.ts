import { ContactInfoLabels, BankAccountInfoLabels } from "./enums";

export type FieldName = ContactInfoLabels | BankAccountInfoLabels;

export type InfoBlockData<T extends FieldName> = Partial<Record<T, string>>;
// export type InfoBlockData<T extends FieldName> = Partial<Record<T, string>>[];

export type BankAccountInfo = InfoBlockData<BankAccountInfoLabels>;

export type ContactInfo = InfoBlockData<ContactInfoLabels>;

export type Dictionary<TKey extends string | number | symbol, TValue> = {
    [key in TKey]?: TValue;
};

export interface TimesheetEntry {
    hours: number;
    rate: number;
}

export interface ExtraExpensesEntry {
    item: string;
    amount: number;
}

export type InputChangeCallback = (event: React.ChangeEvent<HTMLInputElement>) => void;
