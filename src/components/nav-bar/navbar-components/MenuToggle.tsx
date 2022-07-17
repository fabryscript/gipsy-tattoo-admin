import React from "react";
import { Box } from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
interface MenuToggleProps {
  toggle: () => any;
  isOpen: boolean;
}

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} ml="48%" onClick={toggle}>
      {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </Box>
  );
};

export default MenuToggle;
