import {
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import format from "date-fns/format";
import React, { useState } from "react";
import { backendURL, newBooking } from "./commands";
import { DayzedPicker } from "./Datepicker";
import { TimePicker } from "./TimePicker";
export function CreateBooking() {
  const [date, setDate] = useState(format(new Date(), "yyy-MM-dd"));
  const [time, setTime] = useState("");
  const [jsDate, setJSDate] = useState(new Date());

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("Blu");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dependantDotColor = field === "Blu" ? "blue.400" : "red.400";
  const dependantButtonColorSchem = field === "Blu" ? "blue" : "red";

  const cannotSelectPastDate = () => {
    toast({
      title: "Il giorno selezionato è precedente a quello odierno",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  const cannotSelectExtremeFutureDate = () => {
    toast({
      title: "Il giorno selezionato è troppo futuro a quello odierno",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Center py={6}>
      <Box
        maxW={"500px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack textAlign={"center"} p={6} align={"center"}>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Heading fontSize={"4xl"}>Crea Prenotazione</Heading>
          </Stack>
        </Stack>

        <Box px={6} py={10}>
          <Box rounded={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      type="text"
                      placeholder="Nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      borderColor={"whiteAlpha.300"}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Cognome</FormLabel>
                    <Input
                      type="text"
                      placeholder="Cognome"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      borderColor={"whiteAlpha.300"}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor={"whiteAlpha.300"}
                />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel>Data</FormLabel>
                <DayzedPicker
                  color={dependantDotColor}
                  date={jsDate}
                  onDateChange={(d) => {
                    const formattedDate = format(d, "yyyy-MM-dd");
                    setTime("");
                    collisionCheck(
                      formattedDate,
                      field,
                      setDate,
                      setJSDate,
                      d,
                      cannotSelectPastDate,
                      cannotSelectExtremeFutureDate
                    );
                  }}
                />
              </FormControl>
              <FormControl id="time" isRequired>
                <FormLabel>Orario</FormLabel>
                <TimePicker
                  date={date}
                  setter={setTime}
                  value={time}
                  variant={field === "Blu" ? "blue" : "red"}
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="field" isRequired>
                    <FormLabel>Seleziona Servizio</FormLabel>
                    <Select
                      borderColor={"whiteAlpha.300"}
                      onChange={(e) => {
                        setField(e.target.value);
                        setTime("");
                      }}
                    >
                      <option value="Blu">Tatuaggio</option>
                      <option value="Rosso">Piercing</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Numero di Telefono</FormLabel>
                    <Input
                      placeholder="Numero di Telefono"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      borderColor={"whiteAlpha.300"}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Operazione in corso..."
                  size="lg"
                  color={"white"}
                  onClick={onOpen}
                  disabled={date === "" || time === ""}
                  colorScheme={"whiteAlpha"}
                >
                  Crea
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rivedi i dati</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {name + " " + surname} | {phone}
            </Text>{" "}
            <Text>
              {" "}
              Prenotazione per il{" "}
              {`${date.split("-").reverse().join("/")} | ${time}`}
            </Text>
            <Text>Campo {field}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() =>
                newBooking({
                  bookingDate: `${date}T${time}:00.000000`,
                  email: email !== "" ? email : "",
                  field,
                  name,
                  phoneNumber: phone,
                  statusPayment: false,
                  surname,
                  uuid: "Manual",
                }).then(() => {
                  toast({
                    title: "Prenotazione aggiunta!",
                    status: "success",
                    variant: "left-accent",
                    duration: 5000,
                    position: "top-left",
                    isClosable: true,
                  });
                  onClose();
                  setDate("");
                  setField("");
                  setName("");
                  setPhone("");
                  setSurname("");
                  setTime("");
                  setJSDate(new Date());
                  setEmail("");
                })
              }
              colorScheme={dependantButtonColorSchem}
            >
              Conferma
            </Button>
            <Button onClick={onClose} variant="ghost">
              Chiudi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export function collisionCheck(
  formattedDate: string,
  field: string,
  setDate: React.Dispatch<React.SetStateAction<string>>,
  setJSDate: React.Dispatch<React.SetStateAction<Date>>,
  d: Date,
  cannotSelectPastDate: () => void,
  cannotSelectExtremeFutureDate: () => void
) {
  axios
    .post(backendURL + "check-date", {
      date: `${formattedDate}`,
      field,
    })
    .then(({ data }) => {
      switch (data) {
        case "valid":
          setDate(formattedDate);
          setJSDate(d);
          break;
        case "before":
          cannotSelectPastDate();
          setJSDate((d) => d);
          break;
        case "late":
          cannotSelectExtremeFutureDate();
          setJSDate((d) => d);
          break;
        default:
          setJSDate((d) => d);
          break;
      }
    });
}
