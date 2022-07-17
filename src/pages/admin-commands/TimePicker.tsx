import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import format from "date-fns/format"
import axios from "axios";
import { backendURL } from "./commands";

async function returnAllBookings(date: string, field: "blue" | "red") {
  let rv: string[] = [];
  await axios
    .post(backendURL + "return-bookings", {
      date,
      field: field === "blue" ? "Blu" : "Rosso",
    })
    .then(({ data: { bookings } }) => {
      rv = bookings;
    })
    .catch((e) => {
      console.error(e);
      rv = ["error"];
    });
  return rv;
}
const blueShifts = [
  "07:00",
  "08:30",
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
  "20:30",
  "22:00"
];

const redShifts = [
  "07:30",
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
  "19:30",
  "21:00",
  "22:30"
];

const InnerTime: FC<{
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  shift: string;
  selectedDate: string;
  field: "blue" | "red";
  dbBookedShifts: string[];
  error: boolean;
}> = ({ setter, value, shift, selectedDate, dbBookedShifts, error }) => {
  const currentHour = new Date().getHours();
  const _shiftHour = shift.split(":")[0];
  const shiftHour = Number(_shiftHour);
  const todayDate = format(new Date(), "yyy-MM-dd");

  const alreadyBookedShift = dbBookedShifts.filter((s) => {
    const leftShift = s.split(":")[0]
    const newLShift = leftShift.length === 1 ? "0" + leftShift : leftShift;
    const newShift = `${newLShift}:${s.split(":")[1]}`;
    return newShift === shift;
  });

  if (selectedDate === todayDate && shiftHour > currentHour) {
    return (
      <Box>
        <Button
          onClick={() => setter(shift)}
          variant={value === shift ? "solid" : "outline"}
          disabled={alreadyBookedShift.length > 0 || error === true}
        >
          {shift}
        </Button>
      </Box>
    );
  } else if (selectedDate !== todayDate) {
    return (
      <Box>
        <Button
          onClick={() => setter(shift)}
          variant={value === shift ? "solid" : "outline"}
          disabled={alreadyBookedShift.length > 0 || error === true}
        >
          {shift}
        </Button>
      </Box>
    );
  } else {
    return <></>;
  }
};

export const TimePicker: FC<{
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  variant: "blue" | "red";
  date: string;
}> = ({ setter, value, variant, date: selectedDate }) => {
  const [dbBookedShifts, setAlreadyBookedShifts] = useState<string[]>([]);
  const [isThereError, setIsThereError] = useState(false);
  useEffect(() => {
    returnAllBookings(selectedDate, variant).then((shifts) => {
      setAlreadyBookedShifts(shifts);
      if (shifts[0] === "error") setIsThereError(true);
    });
    // la dep è la date così sia il refresh che il check vengono triggerati
  }, [selectedDate, variant]);
  return (
    <Box p="10%">
      <SimpleGrid columns={3} spacing="10px">
        {variant === "blue"
          ? blueShifts.map((shift, i) => (
              <InnerTime
                key={i}
                selectedDate={selectedDate}
                shift={shift}
                setter={setter}
                value={value}
                field={variant}
                dbBookedShifts={dbBookedShifts}
                error={isThereError}
              />
            ))
          : redShifts.map((shift, i) => (
              <InnerTime
                key={i}
                selectedDate={selectedDate}
                shift={shift}
                setter={setter}
                value={value}
                field={variant}
                dbBookedShifts={dbBookedShifts}
                error={isThereError}
              />
            ))}
      </SimpleGrid>
    </Box>
  );
};
