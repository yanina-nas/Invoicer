export enum Currency {
    Dollar = "$",
    Euro = "€",
}

export enum ContactInfoLabels {
    addressLineOne = "Address:",
    addressLineTwo = " ",
    phone = "Phone:",
    email = "Email:",
}

export enum BankAccountInfoLabels {
    beneficiary = "Beneficiary:",
    beneficiaryAltName = " ",
    beneficiaryAccount = "Beneficiary's Account:",
    intermediaryBank = "Intermediary Bank:",
    intermediaryBankSwift = "Intermediary's Bank SWIFT:",
    intermediaryBankAccount = "Intermediary's Bank Account:",
    beneficiaryBank = "Beneficiary Bank:",
    beneficiaryBankSwift = "Beneficiary's Bank SWIFT:",
    beneficiaryBankAddress = "Beneficiary's Bank Address:",
}

export enum InvoiceHeaderIdentifier {
    timesheetTitle = "Timesheet",
    extraExpensesTitle = "Extra Expenses",
    firstBlockLeftTitle = "Consultant",
    firstBlockRightTitle = "Bill To",
    secondBlockLeftTitle = "Bank Account",
    secondBlockRightTitle = "Payment Method",
}

export enum HeaderFieldName {
    invoiceNumber = "invoiceNumber",
    currentDate = "currentDate",
}

export enum FooterFieldName {
    consultantName = "consultantName",
    companyName = "companyName",
    note = "note",
}

export enum ExtraExpensesFieldName {
    item = "item",
    amount = "amount",
}
