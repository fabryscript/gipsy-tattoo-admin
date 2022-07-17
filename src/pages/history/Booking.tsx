import {
  Box,
  List,
  ListItem,
  ListIcon,
  Button,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { FC } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCashStack } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { backendURL, FirebaseBookingData } from "../admin-commands/commands";
import { mesis } from "./BookingsList";
import axios from "axios";
import { format } from "date-fns";
import { _firestore } from "../../utils/firebase/firebase";
import { DeletedBooking } from "./DeletedBooking";

export function zeroize(s: string, variant: "before" | "after") {
  let r = s;
  if (s.split("").length === 1) r = variant === "before" ? `0${s}` : `${s}0`;
  else r = s;
  return r;
}

export function getMonthFromItsNumber(n: number) {
  return mesis[n - 1];
}

export const getRFCTimestampFromJSDate = (d: Date) => {
  const date = format(d, "yyy-MM-dd")
  const hours = d.getHours().toString();
  const minutes = d.getMinutes().toString();

  const time = `${zeroize(hours, "before")}:${zeroize(minutes, "after")}`;
  return `${date}T${time}:00.000000`;
};

export const Booking: FC<{
  booking: FirebaseBookingData;
  textColor: string;
  showDeleted: boolean
}> = ({
  booking: { bookedFor, statusPayment, name, phoneNumber, surname, eventID },
  booking,
  textColor,
  showDeleted
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bForDate = bookedFor.toDate()

  const bForDay = `${bForDate.getDate()}`;
  const bForMonth = `${bForDate.getMonth() + 1}`;
  const bForYear = `${bForDate.getFullYear()}`;

  const hours = bForDate.getHours().toString();
  const minutes = bForDate.getMinutes().toString();

  const bookedForTime = `${zeroize(hours, "before")}:${zeroize(
    minutes,
    "after"
  )}`;

  if (showDeleted === false) {
    return (
      <AccordionItem p={"5%"}>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Heading fontSize={"2xl"}>
              Prenotazione per il{" "}
              {`${bForDay} ${getMonthFromItsNumber(
                Number(bForMonth)
              )} ${bForYear}`}{" "}
            </Heading>
            <Heading fontSize={"2xl"} color={textColor}>
              alle ore {bookedForTime}
            </Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Center>
            <Box maxW={"330px"} w={"full"} rounded={"md"} overflow={"hidden"}>
              <Box px={6} py={10}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CgProfile} />
                    {name} {surname}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BsCashStack} />
                    {statusPayment === true
                      ? "Pagato online"
                      : "Pagamento al campo"}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiPhoneCall} />
                    {phoneNumber}
                  </ListItem>
                </List>
                <Button
                  mt={10}
                  w={"full"}
                  bg={"red.400"}
                  color={"white"}
                  rounded={"xl"}
                  boxShadow={"0 5px 20px 0px rgb(72 187 120 / 10%)"}
                  _hover={{
                    bg: "red.500",
                  }}
                  _focus={{
                    bg: "red.500",
                  }}
                  onClick={onOpen}
                >
                  Cancella
                </Button>
              </Box>
            </Box>
          </Center>
        </AccordionPanel>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cancella prenotazione</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {statusPayment === true && (
                <Text>
                  Attenzione, il pagamento per questa prenotazione è stato
                  effettuato online, il rimborso verrà disposto in circa 12/24 ore
                  lavorative.
                </Text>
              )}
              Sei sicuro di voler cancellare questa prenotazione?
            </ModalBody>
  
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={async () => {
                  await axios
                    .post(backendURL + "delete-booking", {
                      eventID,
                      date: getRFCTimestampFromJSDate(bookedFor.toDate()),
                    })
                    .then(() => {
                      toast({
                        title: "Prenotazione cancellata con successo",
                        position: "bottom-left",
                        duration: 5000,
                        status: "info",
                        variant: "left-accent",
                        isClosable: true,
                      });
                      window.location.reload()
                    })
                    .catch(() =>
                      toast({
                        title: "Errore col server.",
                        position: "bottom-left",
                        duration: 5000,
                        status: "error",
                        variant: "left-accent",
                        isClosable: true,
                      })
                    );
                }}
              >
                Sì
              </Button>
              <Button variant="outline" onClick={onClose}>
                Chiudi
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </AccordionItem>
    );  
  } else {
    return <DeletedBooking booking={booking} textColor={textColor}/>
  }
};
