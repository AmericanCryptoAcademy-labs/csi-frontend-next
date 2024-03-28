"use client";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
        heading: "Inter",
        body: "Inter",
    },
    colors: {
        background: "#24313e",
        darkBackground: "#1a232d",
        primaryText: "#fefffd",
        secondaryText: "#6B6B6B",
    },
});