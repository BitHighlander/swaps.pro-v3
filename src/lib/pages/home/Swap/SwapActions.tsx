import {
  SettingsIcon,
  ChevronDownIcon,
  ArrowDownIcon,
  PhoneIcon,
  AddIcon,
  WarningIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  StackDivider,
  ModalFooter,
  Card,
  Stack,
  Heading,
  CardFooter,
  CardHeader,
  CardBody,
  Avatar,
  Spinner,
} from "@chakra-ui/react";

// @ts-ignore
import { useEffect, useState } from "react";

// import etherLogo from "lib/assets/png/etherLogo.png";
// @ts-ignore
import { usePioneer } from "pioneer-react";

export const SwapActions = () => {
  const { state } = usePioneer();
  const { api, user } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [balances, setBalances] = useState([
    {
      symbol: "",
      balance: "",
      address: "",
      image: "",
      blockchain: "",
      amount: "",
      decimals: "",
      name: "",
      price: "",
      priceChange: "",
      priceChangePercentage: "",
      rank: "",
      totalSupply: "",
      volume: "",
    },
  ]);
  const [pubkeys, setPubkeys] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [swapInfo, setSwapInfo] = useState({
    currencyFrom: "",
    currencyTo: "",
    amountFrom: "",
    currencyFromImage: "",
    currencyToImage: "",
    currencyFromName: "",
    currencyToName: "",
    currencyFromSymbol: "",
    currencyToSymbol: "",
    currencyFromDecimals: "",
    currencyToDecimals: "",
    currencyFromAddress: "",
    currencyToAddress: "",
    currencyFromBlockchain: "",
    currencyToBlockchain: "",
    currencyFromPrice: "",
    amountExpectedFrom: "",
    amountExpectedTo: "",
    id: "",
    changellyFee: "",
    rate: "",
    rateLockedInUntil: "",
    kycRequired: "",
    payinAddress: "",
    payoutAddress: "",
    apiExtraFee: "",
    status: "",
    createdAt: "",
  });
  const [input, setInput] = useState({
    address: "",
    symbol: "",
    name: "",
    amount:"",
  });
  const [output, setOutput] = useState({
    address: "",
    symbol: "",
    name: "",
  });

  // get coins from api

  const setUser = async function () {
    try {
      if(user && user.balances && user.pubkeys) {
        console.log(" ********************* USER SET **********************");
        const { balances, pubkeys } = user;
        setIsLoaded(true)
        // setBalances(balances);
        // setPubkeys(pubkeys);

        // // eslint-disable-next-line no-console
        // console.log("balances: ", balances);

        // // eslint-disable-next-line no-console
        // console.log("pubkeys: ", pubkeys);
        // get coins from api
        let coins = await api.CurrenciesChangelly();
        coins = coins.data;
        console.log("*** coins: ",coins);

        // filter coins for what keepkey supports
        const filteredBalances = balances.filter((balance: { symbol: string }) =>
            coins.includes(balance.symbol.toLowerCase())
        );
        // console.log("filtered balances: ", filteredBalances);
        // mark coins that have balances
        setBalances(filteredBalances);

        setInput(filteredBalances[0]);
        setOutput(filteredBalances[1]);
      }

    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.error("header e: ", e);
      // setKeepKeyError("Bridge is offline!");
    }
  };

  // onStart()
  useEffect(() => {
    setUser();
  }, [user, user?.balances]); // once on startup

  const onSelectInput = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSelectInput: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSelectOutput = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSelectOutput: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSubmitSelect = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSubmitSelect: ");
      onOpen();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  //onCancel
  const onCancel = async function () {
    try {
      console.log("onCancel: ");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSelectPrimary = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onSubmitPrimary: ");
      // create transaction
      input.amount = "1000"
      const tx = {
        from: input.symbol,
        to: output.symbol,
        address: output.address,
        amount: input.amount,
        extraId: undefined,
      };
      console.log("tx: ", tx);
      if(!input.symbol) throw Error("Missing input symbol")
      if(!output.symbol) throw Error("Missing output symbol")
      if(!output.address) throw Error("Missing output address")
      if(!output.address) throw Error("Missing output address")
      const swapConduit = await api.CreateTransactionChangelly(tx);
      console.log("swapConduit: ", swapConduit.data);
      setSwapInfo(swapConduit.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <Box
      w="30.62rem"
      mx="auto"
      mt="5.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem"
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coin Select</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {balances.map((balance, index) => (
                <Card key={balance.address || index}>
                  <Avatar src={balance.image} />
                  <CardBody>
                    <Heading size="md">{balance.blockchain}</Heading>
                    <Text py="2">
                      {balance.amount} {balance.symbol}
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      select
                    </Button>
                  </CardFooter>
                </Card>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onSubmitSelect} variant="green">
              Select Coin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        bg="white"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0"
      >
        <Text color="black" fontWeight="500">
          Swap
        </Text>
        <SettingsIcon
          fontSize="1.25rem"
          cursor="pointer"
          _hover={{ color: "rgb(128,128,128)" }}
        />
      </Flex>
      {isLoaded ? (
        <div>
          <Box p="0.5rem" bg="gray" borderRadius="0 0 1.37rem 1.37rem">
            {swapInfo?.id ? (
              <div>
                <Card>
                  <CardHeader>
                    <Heading size="md">Swap ID: {swapInfo.id}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Summary
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Currency From: {swapInfo.currencyFrom} <br />
                          Currency To: {swapInfo.currencyTo} <br />
                          Amount Expected From: {
                            swapInfo.amountExpectedFrom
                          }{" "}
                          <br />
                          Amount Expected To: {swapInfo.amountExpectedTo}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          fees
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          changellyFee: {swapInfo.changellyFee} <br />
                          apiExtraFee: {swapInfo.apiExtraFee}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          KYC
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {swapInfo.kycRequired ? (
                            <div>
                              amount to large! KYC will be required!
                              <WarningIcon />
                            </div>
                          ) : (
                            <div>
                              Not Required
                              <SmallCloseIcon />
                            </div>
                          )}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Overview
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Payin Address: {swapInfo.payinAddress} <br />
                          Payout Address: {swapInfo.payoutAddress}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          status
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Status: {swapInfo.status} <br />
                          Created At: {swapInfo.createdAt}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                  <Button onClick={() => onCancel} variant="red">
                    Cancel
                  </Button>
                </Card>
              </div>
            ) : (
              <div>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="rgb(247, 248, 250)"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Box>
                    <Button
                      bg="blue.500"
                      borderRadius="1.12rem"
                      boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                      fontWeight="500"
                      mr="0.5rem"
                      rightIcon={
                        <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
                      }
                      onClick={onSelectInput}
                    >
                      {/* <Image */}
                      {/*  boxSize="1.5rem" */}
                      {/*  src={etherLogo} */}
                      {/*  alt="Ether Logo" */}
                      {/*  mr="0.5rem" */}
                      {/* /> */}
                      {input.name} ({input.symbol})
                    </Button>
                  </Box>
                  <Box>
                    <Input
                      placeholder="0.0"
                      fontWeight="500"
                      fontSize="1.5rem"
                      width="100%"
                      size="19rem"
                      textAlign="right"
                      bg="rgb(247, 248, 250)"
                      outline="none"
                      border="none"
                      focusBorderColor="none"
                      type="number"
                    />
                  </Box>
                </Flex>

                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="rgb(247, 248, 250)"
                  pos="relative"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  mt="0.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Box>
                    <Button
                      bg="rgb(232, 0, 111)"
                      color="blue"
                      p="0rem 1rem"
                      borderRadius="1.12rem"
                      boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                      _hover={{ bg: "rgb(207, 0, 99)" }}
                      rightIcon={
                        <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
                      }
                      onClick={onSelectOutput}
                    >
                      {output.name} ({output.symbol})
                    </Button>
                  </Box>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    bg="white"
                    p="0.18rem"
                    borderRadius="0.75rem"
                    pos="relative"
                    top="-2.37rem"
                    left="2.5rem"
                  >
                    <ArrowDownIcon
                      bg="rgb(247, 248, 250)"
                      color="rgb(128,128,128)"
                      h="1.5rem"
                      width="1.62rem"
                      borderRadius="0.75rem"
                    />
                  </Flex>
                  <Box>
                    <Input
                      placeholder="0.0"
                      fontSize="1.5rem"
                      width="100%"
                      size="19rem"
                      textAlign="right"
                      bg="rgb(247, 248, 250)"
                      outline="none"
                      border="none"
                      focusBorderColor="none"
                      type="number"
                    />
                  </Box>
                </Flex>

                <Box mt="0.5rem">
                  <Button
                    color="rgb(213, 0, 102)"
                    bg="rgb(253, 234, 241)"
                    width="100%"
                    p="1.62rem"
                    borderRadius="1.25rem"
                    _hover={{ bg: "rgb(251, 211, 225)" }}
                    onClick={onSelectPrimary}
                  >
                    Swap
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </div>
      ) : (
        <div>
          <Box p="0.5rem" bg="gray" borderRadius="0 0 1.37rem 1.37rem">
            <Spinner color="green.500" />
          </Box>
        </div>
      )}
    </Box>
  );
};
