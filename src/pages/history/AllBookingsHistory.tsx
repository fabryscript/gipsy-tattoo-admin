import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { FC } from "react";
import { MUpper } from "../MaxUpperComponent";
import { BookingsList } from "./BookingsList";

export const AllBookingsHistory: FC = () => {
  return (
    <MUpper>
      <Tabs isFitted variant="soft-rounded" colorScheme={"whiteAlpha"}>
        <TabList mb="1em">
          <Tab>Tatuaggi</Tab>
          <Tab>Piercing</Tab>
          <Tab display={"none"} _selected={{ bg: "indigo", color: "white" }}>
            Prenotazioni eliminate
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BookingsList showDeleted={false} field="blue" />
          </TabPanel>
          <TabPanel>
            <BookingsList showDeleted={false} field="red" />
          </TabPanel>
          <TabPanel>
            <Tabs isFitted variant="soft-rounded" colorScheme={"blue"}>
              <TabList>
                <Tab color="black">Tatuaggi</Tab>
                <Tab _selected={{ bg: "#fed6d7" }} color="black">
                  Piercing
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <BookingsList showDeleted={true} field="blue" />
                </TabPanel>
                <TabPanel>
                  <BookingsList showDeleted={true} field="red" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MUpper>
  );
};
