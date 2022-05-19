import React from "react";
import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { InvoiceHeaderIdentifier } from "../common/enums";
import { blueTheme } from "../../styles/theme";

interface InvoiceHeaderProps {
    leftTitleIdentifier: InvoiceHeaderIdentifier;
    rightTitleIdentifier?: InvoiceHeaderIdentifier;
    monthsSubheader?: string;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ leftTitleIdentifier, rightTitleIdentifier, monthsSubheader }: InvoiceHeaderProps) => {
    return (
        <Box flex={1} background={"white"}>
            <Flex textStyle={"subTitle"} padding={3} background={blueTheme.darkAccent || "#eee"} justify={"space-between"}>
                <Flex
                    flex={1}
                    textStyle={"subTitle"}
                    color={blueTheme.backgroundColor}
                >
                    {`${leftTitleIdentifier}${monthsSubheader ? ` [ ${monthsSubheader} ]` : ""}`}
                </Flex>
                {!!rightTitleIdentifier && <Flex color={blueTheme.backgroundColor} textStyle={"subTitle"}>
                    {rightTitleIdentifier}
                </Flex>}
            </Flex>
        </Box>
    );
};

export default InvoiceHeader;
