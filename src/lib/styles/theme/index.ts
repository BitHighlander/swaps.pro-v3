import { extendTheme } from "@chakra-ui/react";

// Your config settings here
const config = {
  // Your config options
};

export const theme = extendTheme({
  colors: {
    brand: {
      black: "#000000", // Define your black color
      green: "#00FF00", // Define your green color
    },
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Plus Jakarta Sans, sans-serif",
    body: "Plus Jakarta Sans, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        color: "white", // Set text color to white
        bg: "brand.black", // Use the black color from brand
        _hover: {
          bg: "brand.green", // Use the green color from brand on hover
        },
      },
      // Define size variants if needed
      sizes: {
        sm: {
          fontSize: "12px",
          padding: "6px 12px",
        },
        md: {
          fontSize: "16px",
          padding: "8px 16px",
        },
        lg: {
          fontSize: "20px",
          padding: "10px 20px",
        },
      },
    },
    Input: {
      baseStyle: {
        color: "white", // Set text color to white
        bg: "brand.black", // Use the black color from brand
        borderColor: "brand.green", // Use the green color from brand for border
        _focus: {
          borderColor: "brand.green", // Use the green color from brand for border on focus
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "white", // Set heading color to white
      },
    },
    // Add more components here with custom styles
  },
  config,
});
