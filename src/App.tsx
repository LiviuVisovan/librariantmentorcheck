import { useEffect, useState } from "react";
import data from "./data/reservations.json";
import LeForm from "./LeForm";
import Card from "./Card";
import "./App.css";

type reservation = {
  id: number;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: string;
};

export default function App() {
  const [reservations, setReservations] = useState<reservation[]>(data);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [handle, setHandle] = useState("loading");

  useEffect(() => {
    async function getfakedata() {
      try {
        const response = await fetch(
          "forgothowurllook.com/apicall/chatgptisthequeen",
        );
        const data: reservation = response.json();
        setHandle("");
      } catch (error) {
        setHandle(`error: ${error} do something  `);
      }
      setReservations(reservations);
    }
    getfakedata();
  }, []);

  function handleNewReserv(obj) {
    console.log(obj);
    setReservations([
      ...reservations,
      { ...obj, status: "pending", id: reservations.length + 1 },
    ]);
  }

  return (
    <div className="parent">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option>all</option>
        <option>pending</option>
        <option>confirmed</option>
        <option>cancelled</option>
      </select>
      <label>Search</label>
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <div>{search}</div>
      {handle
        ? handle
        : reservations
            .filter((x) => x.customerName.toLowerCase().includes(search))
            .filter((x) => filter === "all" || x.status === filter)
            .map((x) => (
              <div className={x.customerName}>
                <Card
                  name={x.customerName}
                  date={x.date}
                  time={x.time}
                  numbers={x.guests}
                  status={x.status}
                ></Card>
                <button
                  onClick={() =>
                    setReservations(
                      reservations.map((f) =>
                        f !== x ? f : { ...x, status: "confirmed" },
                      ),
                    )
                  }
                >
                  confirm
                </button>
                <button
                  onClick={() =>
                    setReservations(
                      reservations.map((f) =>
                        f !== x ? f : { ...x, status: "cancelled" },
                      ),
                    )
                  }
                >
                  cancel
                </button>
              </div>
            ))}
      <LeForm func={handleNewReserv}></LeForm>
    </div>
  );
}
