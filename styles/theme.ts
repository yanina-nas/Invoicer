import { extendTheme } from "@chakra-ui/react";

export enum blueTheme {
  backgroundColor = "#fefefe",
  textColor = "#1e2b48",
  darkAccent = "#6a7ca3",
  lightAccent = "#e5ebf9",
}

const overrides = {
  fontFamily: "Avenir",
  textStyles: {
    mainTitle: {
      fontSize: "70px",
      lineHeight: "45px",
      color: blueTheme.textColor, //"#333",
      fontFamily: "Avenir",
      fontWeight: "200",
    },
    title: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "normal",
      color: blueTheme.textColor,
      // color: "#777",
      fontFamily: "Avenir",
    },
    subTitle: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "semibold",
      // color: "#555",
      color: blueTheme.textColor,
      fontFamily: "Avenir",
    },
    infoBlockHeader: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: "semibold",
      // color: "#555",
      color: blueTheme.textColor,
      fontFamily: "Avenir",
    },
    infoBlockValue: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: "normal",
      // color: "#555",
      color: blueTheme.textColor,
      fontFamily: "Avenir, sans-serif",
    },
    footer: {
      fontSize: "16px",
      lineHeight: "24px",
      // color: "#777",
      color: blueTheme.textColor,
      fontFamily: "Avenir",
    },
    note: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "light",
      // color: "#777",
      color: blueTheme.textColor,
      fontFamily: "Avenir",
    },
    directionHeader: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "bold",
      color: blueTheme.lightAccent,
      fontFamily: "Avenir",
    },
    directionText: {
      fontSize: "16px",
      lineHeight: "24px",
      color: blueTheme.lightAccent,
      fontFamily: "Avenir",
    },
  },

}

export default extendTheme(overrides)



