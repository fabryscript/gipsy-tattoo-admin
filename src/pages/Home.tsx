import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { _auth } from "../utils/firebase/firebase";
import { CreateBooking } from "./admin-commands/CreateBooking";
import { MUpper } from "./MaxUpperComponent";

export const Home: FC = () => {
  return(
    <MUpper>
      <SimpleGrid>
        <CreateBooking />
      </SimpleGrid>
    </MUpper>
  )
}