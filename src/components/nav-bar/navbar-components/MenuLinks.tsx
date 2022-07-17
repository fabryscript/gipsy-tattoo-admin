import { Stack, Box, Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../../providers/GAuthProvider";
import { _auth } from "../../../utils/firebase/firebase";
import MenuItem from "./MenuItem";
const MenuLinks = ({ isOpened }: any) => {
  const { actualUser } = useContext(UserContext);
  return (
    <>
      <Box
        display={{ base: isOpened ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          {actualUser !== null ? (
            <>
            <MenuItem to="/history">
              Storico Prenotazioni
            </MenuItem>
            <Button onClick={() => signOut(_auth)} variant={"outline"}>Logout</Button>
            </>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MenuLinks;
