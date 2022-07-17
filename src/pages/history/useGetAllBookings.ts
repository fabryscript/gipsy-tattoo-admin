import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { _firestore } from "../../utils/firebase/firebase";
import { FirebaseBookingData } from "../admin-commands/commands";
export interface BookingsDataObject {
  [k: string]: FirebaseBookingData[]
}

async function getUserBookings(field: string, showDeleted: boolean) {
  const docRef = doc(_firestore, showDeleted ? "deletedBookings" : "bookings", field);
  const snap = await getDoc(docRef);
  const data = snap.data() as BookingsDataObject;
  return data;
}

export function useGetAllBookings(field: string, showDeleted: boolean) {
  const [data, setData] = useState<BookingsDataObject>()
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserBookings(field, showDeleted).then((data) => {
      setLoading(true);
      if (data) {
        setData(data)
        setLoading(false);
      } else {
        setError("undefined data");
        setLoading(false);
      }
    });
  }, []);

  return { data, error, loading };
}
