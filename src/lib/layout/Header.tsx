import { Box, Flex, HStack, Text } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Pioneer } from "pioneer-react";
import { Link as RouterLink } from "react-router-dom";

const PROJECT_NAME = "Swaps.pro";
// eslint-disable-next-line no-console
const HeaderNew = () => {
  return (
    <Flex
      as="header"
      width="full"
      alignSelf="flex-start"
      gridGap={2}
      alignItems="center"
      justifyContent="space-between" // Align items with space between them
      p={5}
      bg="gray.900" // change background color
      borderBottom="1px solid" // add a border at the bottom
      borderColor="gray.200" // set border color
      zIndex={4}
    >
      <HStack spacing={8}>
        <RouterLink to="/">
          <Box>
            <Text fontSize="3xl">{PROJECT_NAME}</Text>
          </Box>
        </RouterLink>
      </HStack>
      <Pioneer />
    </Flex>
  );
};

export default HeaderNew;
