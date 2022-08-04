import React from "react";
import Header from "./components/Header";
import InvoiceHeader from "./components/InvoiceHeader";
import InfoBlock from "./components/InfoBlock";
import TableBlock from "./components/TableBlock";
import Footer from "./components/Footer";
import { Currency, InvoiceHeaderIdentifier } from "../src/common/enums";
import { Flex } from "@chakra-ui/react";
import { BankAccountInfo, ContactInfo, Dictionary, ExtraExpensesEntry, TimesheetEntry } from "../src/common/types";
import { Moment } from "moment";
import { blueTheme } from "../styles/theme";

interface HomeProps {
    defaultClient: boolean;
    showControls: boolean;
    currency: Currency;
    showExtraExpenses: boolean;
    agreementSigningDate: Moment | null;
    invoiceNumberPrefix: string;
    invoiceDate: Moment | null;
    consultantName: string;
    clientName: string;
    consultantContactData: ContactInfo;
    clientContactData: ContactInfo;
    bankAccountData: BankAccountInfo;
    timesheetData: Dictionary<string, TimesheetEntry>;
    onUpdateTimesheetField(timesheetData: Dictionary<string, TimesheetEntry>, fieldName: string, chosenTimestampKey: string, newValue: string): void;
    onCreateTimesheetEntry(timesheetData: Dictionary<string, TimesheetEntry>): void;
    onDeleteTimesheetEntry(timesheetData: Dictionary<string, TimesheetEntry>, chosenTimestampKey: string): void;
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>;
    onUpdateExtraExpensesField(extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string, fieldName: string, newValue: string) : void; 
    onCreateExtraExpensesEntry(extraExpensesData: Dictionary<string, ExtraExpensesEntry>,) : void; 
    onDeleteExtraExpensesEntry(extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string) : void; 
}

const Home: React.FC<HomeProps> = ({
    defaultClient,
    invoiceNumberPrefix,
    showControls,
    currency,
    showExtraExpenses,
    agreementSigningDate,
    invoiceDate,
    consultantName,
    clientName,
    consultantContactData,
    clientContactData,
    bankAccountData,
    timesheetData,
    onUpdateTimesheetField,
    onCreateTimesheetEntry,
    onDeleteTimesheetEntry,
    extraExpensesData,
    onUpdateExtraExpensesField,
    onCreateExtraExpensesEntry,
    onDeleteExtraExpensesEntry,
}: React.PropsWithChildren<HomeProps>) => {

    return (
        <Flex width={800} direction={"column"} padding={10}>
            <Header invoiceDate={invoiceDate} invoiceNumberPrefix={invoiceNumberPrefix} agreementSigningDate={agreementSigningDate} />
            <InvoiceHeader
                leftTitleIdentifier={InvoiceHeaderIdentifier.firstBlockLeftTitle}
                rightTitleIdentifier={InvoiceHeaderIdentifier.firstBlockRightTitle}
            />
            <Flex backgroundColor={blueTheme.backgroundColor} paddingBottom={10} justify={"space-between"}>
                <Flex padding={2} flex={6}>
                    <InfoBlock
                        title={consultantName}
                        infoBlockData={consultantContactData}
                        leftColumnFlexValue={1}
                        rightColumnFlexValue={5}
                    />
                </Flex>
                <Flex flex={2}></Flex>
                <Flex padding={2} flex={5}>
                    <InfoBlock
                        title={clientName}
                        infoBlockData={clientContactData}
                        leftColumnFlexValue={1}
                        rightColumnFlexValue={7}
                        titleTextAlignedRight
                    />
                </Flex>
            </Flex>
            <InvoiceHeader
                leftTitleIdentifier={InvoiceHeaderIdentifier.secondBlockLeftTitle}
                rightTitleIdentifier={InvoiceHeaderIdentifier.secondBlockRightTitle}
            />
            <Flex backgroundColor={blueTheme.backgroundColor} paddingBottom={6}  justify={"space-between"}>
                <Flex padding={2} flex={7}>
                    <InfoBlock
                        infoBlockData={bankAccountData}
                        leftColumnFlexValue={4}
                        rightColumnFlexValue={5}
                    />
                </Flex>
                <Flex padding={2} justify={"space-between"} paddingY={2} flex={3}>
                    <Flex></Flex>
                    <Flex padding={2} textStyle={"subTitle"}>{"Bank Transfer"}</Flex>
                </Flex>
            </Flex>
            <TableBlock
                defaultClient={defaultClient}
                onUpdateTimesheetField={onUpdateTimesheetField}
                onCreateTimesheetEntry={onCreateTimesheetEntry}
                onDeleteTimesheetEntry={onDeleteTimesheetEntry}
                timesheetData={timesheetData}
                showControls={showControls}
                currency={currency}
                showExtraExpenses={showExtraExpenses}
                extraExpensesData={extraExpensesData}
                onUpdateExtraExpensesField={onUpdateExtraExpensesField}
                onCreateExtraExpensesEntry={onCreateExtraExpensesEntry}
                onDeleteExtraExpensesEntry={onDeleteExtraExpensesEntry}
            />
            <Footer consultantName={consultantName} clientName={clientName} agreementSigningDate={agreementSigningDate} />
        </Flex>
    );
};

export default Home;
