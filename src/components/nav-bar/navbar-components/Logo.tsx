import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import logo from "../../../assets/logo.png"
const Logo = (props: any) => {
  return (
    <Box {...props}>
      <SimpleGrid columns={[1, 2]}>
        <Image maxW="100px" src={logo} />
      </SimpleGrid>
    </Box>
  );
};

export default Logo;
