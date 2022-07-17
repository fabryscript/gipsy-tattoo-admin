import { useState } from "react";
import Logo from "./navbar-components/Logo";
import MenuLinks from "./navbar-components/MenuLinks";
import MenuToggle from "./navbar-components/MenuToggle";
import NavBarContainer from "./navbar-components/NavBarContainer";

const TopNavBar = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="200px"
        color={["black", "black", "primary.500", "primary.500"]}
      />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      <MenuLinks isOpened={isOpen} />
    </NavBarContainer>
  );
};

export default TopNavBar;
