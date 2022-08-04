import React from "react";
import InvoiceHeader from "./InvoiceHeader";
import {
    Box,
    Flex,
    Input,
} from "@chakra-ui/react";
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Dictionary, ExtraExpensesEntry, TimesheetEntry } from "../../src/common/types";
import { dictToValuesArr, FIRST_ELEMENT, format, LAST_ELEMENT, parse, ZERO } from "../../src/common/utils";
import moment from "moment";
import ExtraExpensesBlock from "./ExtraExpensesBlock";
import { Currency, InvoiceHeaderIdentifier } from "../../src/common/enums";
import { blueTheme } from "../../styles/theme";

interface TableProps {
    defaultClient: boolean;
    showControls: boolean;
    currency: Currency;
    showExtraExpenses: boolean;
    timesheetData: Dictionary<string, TimesheetEntry>;
    onUpdateTimesheetField(timesheetData: Dictionary<string, TimesheetEntry>, fieldName: string, chosenTimestampKey: string, newValue: string): void;
    onCreateTimesheetEntry(timesheetData: Dictionary<string, TimesheetEntry>): void;
    onDeleteTimesheetEntry(timesheetData: Dictionary<string, TimesheetEntry>, chosenTimestampKey: string): void;
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>;
    onUpdateExtraExpensesField(extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string, fieldName: string, newValue: string): void;
    onCreateExtraExpensesEntry(extraExpensesData: Dictionary<string, ExtraExpensesEntry>,): void;
    onDeleteExtraExpensesEntry(extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string): void;
}


const TableBlock: React.FC<TableProps> = ({
    defaultClient,
    showControls,
    currency,
    showExtraExpenses,
    timesheetData,
    onUpdateTimesheetField,
    onCreateTimesheetEntry,
    onDeleteTimesheetEntry,
    extraExpensesData,
    onUpdateExtraExpensesField,
    onCreateExtraExpensesEntry,
    onDeleteExtraExpensesEntry,
}: React.PropsWithChildren<TableProps>) => {
    const computedSum: number = Object.values(timesheetData).reduce(
        (accumulator, currentValue) => accumulator + (Number(currentValue ? currentValue["hours"] : ZERO)),
        ZERO
    );

    const subTotalHours: number = defaultClient ? computedSum : Object.keys(timesheetData).length;
    const subTotalAmount: number = dictToValuesArr(timesheetData)
        .map((entry) => defaultClient ? entry!.hours * entry!.rate : entry!.rate)
        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, ZERO)
        ;
    const startMonth: string = moment(Object.keys(timesheetData).sort()[FIRST_ELEMENT])?.format("MMMM");
    const endMonth: string = moment(Object.keys(timesheetData).sort()[LAST_ELEMENT])?.format("MMMM");
    const endYear: string = moment(Object.keys(timesheetData).sort()[LAST_ELEMENT])?.format("YYYY");

    const monthsSubheader = `${startMonth} ${endYear}`;
        // startMonth === endMonth
        //     ? `${endMonth} ${endYear}`
        //     : `${startMonth} - ${endMonth} ${endYear}`;

    return (
        <Box backgroundColor={"white"}>
            <InvoiceHeader leftTitleIdentifier={InvoiceHeaderIdentifier.timesheetTitle} monthsSubheader={monthsSubheader} />
            <Flex textAlign={"center"} gap={2} padding={1} paddingY={4} textStyle={"infoBlockHeader"}>
                <Box paddingX={2} textAlign={"left"} flex={8}>{"Date"}</Box>
                {defaultClient ? <Box flex={2}>{"Hours"}</Box> : <Box flex={2}>{"Days"}</Box>}
                <Box flex={2}>{"Rate"}</Box>
                <Box textAlign={"right"} paddingX={2} flex={4}>{"Amount"}</Box>
            </Flex>

            {Object.keys(timesheetData).map((timesheetEntryDate) => (
                <Flex
                    textStyle={"infoBlockValue"}
                    textAlign={"center"}
                    key={timesheetEntryDate}
                    color={blueTheme.darkAccent}
                    borderBottom={"1px dashed #eee"}
                >
                    <Box paddingX={2} paddingY={1} flex={8}>
                        <Box textAlign={"left"}>
                            {moment(timesheetEntryDate).format("YYYY-MM-DD, dddd")}
                        </Box>
                    </Box>
                    <Box flex={2}>
                        <Input
                            paddingTop={1}
                            textAlign={"center"}
                            name={"hours"}
                            value={defaultClient ? `${timesheetData[timesheetEntryDate]!.hours}` : "1"}
                            onChange={(event) => onUpdateTimesheetField(
                                timesheetData,
                                "hours",
                                timesheetEntryDate,
                                event.target.value
                            )}
                            _active={{
                                background: "#eee",
                                transform: "scale(0.98)",
                                borderColor: "#eee",
                            }}
                            _focus={{
                                borderColor: "#eee",
                            }}
                            variant={"unstyled"}
                            size={"inherit"}
                        />
                    </Box>
                    <Box flex={2}>
                        <Input
                            paddingTop={1}
                            textAlign={"center"}
                            name={"rate"}
                            value={format(currency, `${timesheetData[timesheetEntryDate]?.rate}`)}
                            onChange={(event) => onUpdateTimesheetField(
                                timesheetData,
                                "rate",
                                timesheetEntryDate,
                                parse(currency, event.target.value),
                            )}
                            _active={{
                                background: "#eee",
                                transform: "scale(0.98)",
                                borderColor: "#eee",
                            }}
                            _focus={{
                                borderColor: "#eee",
                            }}
                            variant={"unstyled"}
                            size={"inherit"}
                        />
                    </Box>
                    <Box textAlign={"right"} paddingX={2} paddingTop={1} flex={4}>
                        {`
                            ${currency === Currency.Dollar
                                ? Currency.Dollar
                                : ""
                            }${defaultClient 
                                    ? timesheetData[timesheetEntryDate]!.hours * timesheetData[timesheetEntryDate]!.rate
                                    : timesheetData[timesheetEntryDate]!.rate}${currency === Currency.Euro
                                ? Currency.Euro
                                : ""}
                        `}
                    </Box>
                    {showControls && <Tooltip placement="right" title="delete row"><Button icon={<DeleteFilled />}
                        onClick={() => onDeleteTimesheetEntry(timesheetData, timesheetEntryDate)}
                        size={"small"}
                    /></Tooltip>}
                </Flex>

            ))}
            <Flex gap={2} paddingX={2} textAlign={"center"} paddingY={4} textStyle={"infoBlockHeader"} borderTop={"1px dashed #eee"}>
                <Box textAlign={"left"} flex={8}>{"Subtotal"}</Box>
                <Box flex={2}>{subTotalHours}</Box>
                <Box flex={2}>{"-"}</Box>
                <Box flex={4} textAlign={"right"}>
                    {`${currency === Currency.Dollar ? Currency.Dollar : ""}${subTotalAmount}${currency === Currency.Euro ? Currency.Euro : ""}`}
                </Box>
                {showControls && <Tooltip placement="right" title="add new row"><Button shape="circle" icon={<PlusOutlined />} 
                    onClick={() => onCreateTimesheetEntry(timesheetData)}
                    size={"small"}
                /></Tooltip>}
            </Flex>
            {showExtraExpenses
                ? <ExtraExpensesBlock
                    showControls={showControls}
                    currency={currency}
                    subTotalAmount={subTotalAmount}
                    extraExpensesData={extraExpensesData}
                    onUpdateExtraExpensesField={onUpdateExtraExpensesField}
                    onCreateExtraExpensesEntry={onCreateExtraExpensesEntry}
                    onDeleteExtraExpensesEntry={onDeleteExtraExpensesEntry}
                />
                : <Flex gap={4} paddingX={2} paddingY={3} textStyle={"infoBlockHeader"} textAlign={"left"} borderTop={"1px dashed #eee"}>
                    <Box flex={12}>{"Total"}</Box>
                    <Box
                        flex={4}
                        textAlign={"right"}
                    >
                        {`${currency === Currency.Dollar ? Currency.Dollar : ""}${subTotalAmount}${currency === Currency.Euro ? Currency.Euro : ""}`}
                    </Box>
                </Flex>
            }
        </Box>
    );
};

export default TableBlock;
