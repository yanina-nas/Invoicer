import React from "react";
import {
    Flex,
    Box,
} from "@chakra-ui/react";
import { FieldName, InfoBlockData } from "../common/types";

interface InfoBlockProps {
    infoBlockData: InfoBlockData<FieldName>;
    title?: string;
    leftColumnFlexValue?: number;
    rightColumnFlexValue?: number;
    titleTextAlignedRight?: boolean;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ 
    infoBlockData, 
    title, 
    leftColumnFlexValue = 1,
     rightColumnFlexValue = 3,
     titleTextAlignedRight = false,
 }: React.PropsWithChildren<InfoBlockProps>) => {
    return (
        <Flex direction={"column"} justifyItems={"flex-start"} flex={1}>
            {!!title && <Box paddingY={2} textAlign={titleTextAlignedRight ? "right" : "left"} textStyle={"subTitle"}>{title}</Box>}
            {Object.keys(infoBlockData).map((infoBlockEntryKey: FieldName, index: number) => (
               infoBlockData[infoBlockEntryKey] && <Flex key={index}>
                    <Box flex={leftColumnFlexValue} textStyle={"infoBlockHeader"}>{infoBlockEntryKey}</Box>
                    <Box flex={rightColumnFlexValue} textStyle={"infoBlockValue"} textAlign={"right"}>
                        {infoBlockData[infoBlockEntryKey]}
                    </Box>
                </Flex>
            ))}
        </Flex>
    );
};

export default InfoBlock;
