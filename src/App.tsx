import { useEffect, useState } from "react";
import LeForm from "./LeForm";
import Card from "./Card";
import "./App.css";

export type reservation = {
  id: number;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: string;
};

export default function App() {
  const [reservations, setReservations] = useState<reservation[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [handle, setHandle] = useState("loading");

  useEffect(() => {
    async function getdata() {
      try {
        const response = await fetch("/reservations.json");

        if (!response.ok) {
          setHandle(`error with request something  `);
          return;
        }
        const data: reservation[] = await response.json();
        console.log(data);

        setHandle("");
        setReservations(data);
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  }, []);

  function handleNewReserv(obj) {
    console.log(obj);
    setReservations([...reservations, obj]);
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
      <div className="list">
        {handle
          ? handle
          : reservations
              .filter((x) =>
                x.customerName.trim().toLowerCase().includes(search),
              )
              .filter((x) => filter === "all" || x.status === filter)
              .map((x) => (
                <div className={x.customerName}>
                  <Card
                    key={x.id}
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
      </div>

      <LeForm func={handleNewReserv}></LeForm>
    </div>
  );
}
