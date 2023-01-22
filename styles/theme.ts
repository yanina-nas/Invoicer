import { extendTheme } from "@chakra-ui/react";

export enum blueTheme {
  backgroundColor = "#fefefe",
  textColor = "#1e2b48",
  darkAccent = "#6a7ca3",
  lightAccent = "#e5ebf9",
}

const overrides = {
  fontFamily: "Actor",
  textStyles: {
    mainTitle: {
      fontSize: "70px",
      lineHeight: "45px",
      color: blueTheme.textColor, //"#333",
      fontFamily: "Actor",
      fontWeight: "200",
    },
    title: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "normal",
      color: blueTheme.textColor,
      // color: "#777",
      fontFamily: "Actor",
    },
    subTitle: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "semibold",
      // color: "#555",
      color: blueTheme.textColor,
      fontFamily: "Actor",
    },
    infoBlockHeader: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: "semibold",
      // color: "#555",
      color: blueTheme.textColor,
      fontFamily: "Actor",
    },
    infoBlockValue: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: "normal",
      // color: "#555",
      color: blueTheme.textColor,
      fontFamily: "Actor, sans-serif",
    },
    footer: {
      fontSize: "16px",
      lineHeight: "24px",
      // color: "#777",
      color: blueTheme.textColor,
      fontFamily: "Actor",
    },
    note: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "light",
      // color: "#777",
      color: blueTheme.textColor,
      fontFamily: "Actor",
    },
    directionHeader: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "bold",
      color: blueTheme.lightAccent,
      fontFamily: "Actor",
    },
    directionText: {
      fontSize: "16px",
      lineHeight: "24px",
      color: blueTheme.lightAccent,
      fontFamily: "Actor",
    },
  },

}

export default extendTheme(overrides)



