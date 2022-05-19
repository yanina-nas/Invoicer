import React from "react";
import {
    Flex,
    Box,
} from "@chakra-ui/react";
import { Moment } from "moment";
import { blueTheme } from "../../styles/theme";

interface FooterProps {
    agreementSigningDate: Moment | null;
    consultantName: string;
    clientName: string;
}

const Footer: React.FC<FooterProps> = ({ agreementSigningDate, consultantName, clientName }: React.PropsWithChildren<FooterProps>) => {
    return (
        <Flex 
            direction={"column"}
            background={"white"}
            textStyle={"footer"}
        >
            <Box
                textAlign={"center"}
                padding={6}
                textStyle={"note"}
            >
                {agreementSigningDate && `Note: This invoice is based on the consulting agreement signed on ${agreementSigningDate?.format("LL")}`}
            </Box>
            <Flex justify={"space-between"}>
                <Box flex={1}>
                    <Box paddingX={2} paddingY={1}>{"Consultant:"}</Box>
                    <Box>
                        <Box paddingX={2} paddingY={1} textStyle={"footer"}>
                            {consultantName}
                        </Box>
                    </Box>
                </Box>
                <Box flex={1}>
                    <Box paddingX={2} paddingY={1} textAlign={"right"}>{"Company:"}</Box>
                    <Box>
                        <Box paddingX={2} paddingY={1} textAlign={"right"} textStyle={"footer"}>
                            {clientName}
                        </Box>
                    </Box>
                </Box>

            </Flex>
        </Flex>
    );
};

export default Footer;
