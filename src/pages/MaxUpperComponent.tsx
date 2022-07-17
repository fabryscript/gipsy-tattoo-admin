import { FC } from "react";
import TopNavBar from "../components/nav-bar/TopNavBar";

export const MUpper: FC = ({ children }) => {
  return (
    <>
      <TopNavBar />
      { children }
    </>
  )
}