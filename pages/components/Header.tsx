import React from "react";
import {
    Flex,
    Box,
} from "@chakra-ui/react";
import { Moment } from "moment";

interface HeaderProps {
    invoiceNumberPrefix: string | null;
    invoiceDate: Moment | null;
    agreementSigningDate: Moment | null;
}

const Header: React.FC<HeaderProps> = ({
    invoiceNumberPrefix,
    invoiceDate,
    agreementSigningDate,
}: React.PropsWithChildren<HeaderProps>) => {
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
