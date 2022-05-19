import React from "react";
import {
    Flex,
    Box,
} from "@chakra-ui/react";
import { Moment } from "moment";
import moment from "moment";
import { INVOICE_SERIAL_NUMBER_LENGTH } from "../common/utils";

interface HeaderProps {
    invoiceNumberPrefix: string;
    invoiceDate: Moment;
    agreementSigningDate: Moment;
}

const Header: React.FC<HeaderProps> = ({
    invoiceNumberPrefix,
    invoiceDate,
    agreementSigningDate,
}: React.PropsWithChildren<HeaderProps>) => {
    // const serialNumber = moment().clone().endOf("month").diff(agreementSigningDate?.format(), "months");
    // const invoiceNumber = `${invoiceNumberPrefix}-${serialNumber.toString().padStart(INVOICE_SERIAL_NUMBER_LENGTH, "0")}`;
    const invoiceNumber = invoiceNumberPrefix;

    return (
        <Flex
            flex={1}
            background={"white"}
            paddingBottom={10}
        >
            <Box flex={1} padding={2} textStyle={"mainTitle"}>
                {"Invoice"}
            </Box>
            <Box flex={3}></Box>
            <Box
                flex={3}
                textStyle={"subTitle"}
            >
                <Flex justify={"space-between"}>
                    <Box flex={1}>{"Invoice #:"}</Box>
                    <Box flex={1} textAlign={"right"}>{invoiceNumber}</Box>
                </Flex>
                <Flex justify={"space-between"}>
                    <Box flex={1}>{"Date:"}</Box>
                    <Box flex={1} textAlign={"right"}>{invoiceDate?.format("LL")}</Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Header;
