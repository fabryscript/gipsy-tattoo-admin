import {
  Box,
  List,
  ListItem,
  ListIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Center,
  Heading,
} from "@chakra-ui/react";
import { FC } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCashStack } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { FirebaseBookingData } from "../admin-commands/commands";
import { mesis } from "./BookingsList";
import { _firestore } from "../../utils/firebase/firebase";

function zeroize(s: string, variant: "before" | "after") {
  let r = s;
  if (s.split("").length === 1) r = variant === "before" ? `0${s}` : `${s}0`;
  else r = s;
  return r;
}

function getMonthFromItsNumber(n: number) {
  return mesis[n - 1];
}


export const DeletedBooking: FC<{
  booking: FirebaseBookingData;
  textColor: string;
}> = ({
  booking: { bookedFor, statusPayment, name, phoneNumber, surname },
  textColor,
}) => {
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
            </Box>
          </Box>
        </Center>
      </AccordionPanel>
    </AccordionItem>
  );
};
