import React from "react";
import { Flex, Box, Input, Button } from "@chakra-ui/react";
import InvoiceHeader from "./InvoiceHeader";
import { Currency, InvoiceHeaderIdentifier } from "../common/enums";
import { format, parse, sum } from "../common/utils";
import { Dictionary, ExtraExpensesEntry } from "../common/types";
import { blueTheme } from "../../styles/theme";

interface ExtraExpensesProps {
    showControls: boolean;
    currency: Currency;
    subTotalAmount: number;
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>;
    onUpdateExtraExpensesField(extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string, fieldName: string, newValue: string): void;
    onCreateExtraExpensesEntry(extraExpensesData: Dictionary<string, ExtraExpensesEntry>): void;
    onDeleteExtraExpensesEntry(extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string): void;
}

const ExtraExpensesBlock: React.FC<ExtraExpensesProps> = ({
    showControls,
    currency,
    subTotalAmount,
    extraExpensesData,
    onUpdateExtraExpensesField,
    onCreateExtraExpensesEntry,
    onDeleteExtraExpensesEntry,
}: ExtraExpensesProps) => {
    const subTotalExtraAmount: number = sum(Object.values(extraExpensesData), "amount");
    const totalAmount: number = subTotalAmount + subTotalExtraAmount;

    return (
        <Box backgroundColor={"white"}>
            <InvoiceHeader leftTitleIdentifier={InvoiceHeaderIdentifier.extraExpensesTitle} />
            <Flex textAlign={"center"} gap={2} padding={1} paddingY={4} textStyle={"infoBlockHeader"}>
                <Box paddingX={2} textAlign={"left"} flex={8}>{"Item"}</Box>
                <Box flex={4}></Box>
                <Box textAlign={"right"} paddingX={2} flex={4}>{`Amount, ${currency}`}</Box>
            </Flex>
            {Object.keys(extraExpensesData).map((extraExpensesEntryKey) => (
                <Flex
                    key={extraExpensesEntryKey}
                    textStyle={"infoBlockValue"}
                    textAlign={"center"}
                    borderBottom={"1px dashed #eee"}
                    color={blueTheme.darkAccent}
                >
                    <Box flex={8} paddingX={2} paddingY={1}>
                        <Input
                            textStyle={"paragraph"}
                            textAlign={"left"}
                            value={`${extraExpensesData[extraExpensesEntryKey].item}`}
                            onChange={(event) => onUpdateExtraExpensesField(
                                extraExpensesData,
                                extraExpensesEntryKey,
                                "item",
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
                            size={"inherit"} />
                    </Box>
                    <Box flex={4}>
                        <Input
                            paddingTop={1}
                            paddingRight={2}
                            textStyle={"paragraph"}
                            textAlign={"right"}
                            value={format(currency, `${extraExpensesData[extraExpensesEntryKey].amount}`)}
                            onChange={(event) => onUpdateExtraExpensesField(
                                extraExpensesData,
                                extraExpensesEntryKey,
                                "amount",
                                parse(currency, event.target.value)
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
                    <Button
                        onClick={() => onDeleteExtraExpensesEntry(extraExpensesData, extraExpensesEntryKey)}
                        size={"xs"}
                        colorScheme={"teal"}
                        display={showControls ? "inherit" : "none"}
                    >
                        {"-"}
                    </Button>
                </Flex>
            ))}
            <Flex gap={4} paddingX={2} paddingY={3} textStyle={"infoBlockHeader"} textAlign={"left"} borderTop={"1px dashed #eee"}>
                <Box flex={12}>{"Subtotal"}</Box>
                <Box flex={4} textAlign={"right"}>
                    {`${format(currency, subTotalExtraAmount)}`}
                </Box>
                <Button
                    onClick={() => onCreateExtraExpensesEntry(extraExpensesData)}
                    size={"xs"}
                    colorScheme={"teal"}
                    display={showControls ? "inherit" : "none"}
                >
                    {"+"}
                </Button>
            </Flex>
            <Flex gap={4} paddingX={2} paddingY={3} textStyle={"infoBlockHeader"} textAlign={"left"} borderTop={"1px dashed #eee"}>
                <Box flex={12}>{"Total"}</Box>
                <Box
                    flex={4}
                    textAlign={"right"}
                >
                    {format(currency, totalAmount)}
                </Box>
            </Flex>
        </Box>
    );
};

export default ExtraExpensesBlock;
