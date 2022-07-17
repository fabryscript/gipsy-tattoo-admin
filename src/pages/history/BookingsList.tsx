import {
  Accordion,
  Box,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { FC } from "react";
import { _firestore } from "../../utils/firebase/firebase";
import { FirebaseBookingData } from "../admin-commands/commands";
import { Booking, zeroize } from "./Booking";
import { useGetAllBookings } from "./useGetAllBookings";

export const mesis = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

function _getMonth(d: string, predicate: string) {
  return d.split(predicate)[1];
}

export const BookingsList: FC<{ field: string; showDeleted: boolean }> = ({
  field,
  showDeleted,
}) => {
  const { data, error, loading } = useGetAllBookings(field, showDeleted);

  const toast = useToast();

  if (loading) return <Spinner />;

  if (error !== "")
    toast({
      title: "Errore con il server",
      description: "Riprova più tardi",
      duration: 5000,
      isClosable: true,
    });

  return (
    <Box>
      <>
        <Accordion allowToggle>
          <Tabs
            variant="soft-rounded"
            colorScheme={field === "blue" ? "blue" : "red"}
            orientation="vertical"
          >
            <TabList>
              {mesis.map((month, i) => {
                return <Tab key={i}>{month}</Tab>;
              })}
            </TabList>
            <TabPanels>
              {mesis.map((_, i) => (
                <TabPanel key={mesis[i]}>
                  {data &&
                    Object.getOwnPropertyNames(data).map((k) => {
                      const sorted = data[k].sort(
                        (a, b) =>
                          b.bookedFor.toMillis() - a.bookedFor.toMillis()
                      );
                      const filtered = sorted.filter((b) => b.bookedFor.toMillis() - new Date().getTime() > 0)
                      return filtered.map(
                        (booking: FirebaseBookingData, j: number) => {
                          if (
                            _getMonth(k, "-") ===
                            zeroize(String(i + 1), "before")
                          ) {
                            return (
                              <Booking
                                showDeleted={showDeleted}
                                booking={booking}
                                key={`${mesis[j]} | if`}
                                textColor={
                                  field === "blue" ? "blue.500" : "red.500"
                                }
                              />
                            );
                          }
                        }
                      );
                    })}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Accordion>
      </>
    </Box>
  );
};
