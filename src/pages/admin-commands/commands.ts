import axios from "axios";
import { Timestamp } from "firebase/firestore";

export const backendURL = "https://mesan-padel.herokuapp.com/";
export interface FirebaseBookingData {
  bookedAt: Timestamp;
  bookedFor: Timestamp;
  name: string;
  surname: string;
  phoneNumber: string;
  field: string;
  email: string;
  uuid: string;
  statusPayment: boolean;
  eventID?: string
  deletd?: boolean
}

export interface FormBookingData extends Omit<Omit<FirebaseBookingData, "bookedAt">, "bookedFor"> {
  bookingDate: string
}

export const newBooking = async (data: FormBookingData) => {
  await axios.post(backendURL + "new-booking", data)
}

function transformMonth(month: string) {
  let rv = month;
  month.length === 1 ? (rv = "0" + month) : (rv = month);
  return rv;
}


export function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${day}-${transformMonth(JSON.stringify(month))}-${year}`
    .split("-")
    .reverse()
    .join("-");
}

/**
 * ritorna true se i parametri selezionati coincidono con una prenotazione presente nel sistema,
 * altrimenti ritorna false.
 */
 export async function returnAllBookings(date: string, field: "blue" | "red") {
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