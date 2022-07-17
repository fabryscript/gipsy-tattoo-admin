import { FC } from "react";
import Routes from "../routing/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { GAuthProvider } from "./GAuthProvider";
export const Providers: FC = () => {
  return (
    <>
      <GAuthProvider>
        <ChakraProvider>
          <Routes />
        </ChakraProvider>
      </GAuthProvider>
    </>
  );
};
