import React from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";

interface MenuItemProps {
  children?: any;
  isLast?: any;
  to: string;
}

const MenuItem = ({ children, isLast, to, ...rest }: MenuItemProps) => {
  return (
    <Link to={to}>
      <Button variant="outline">
        <Text display="flex" {...rest}>
          {children}
        </Text>
      </Button>
    </Link>
  );
};

export default MenuItem;
