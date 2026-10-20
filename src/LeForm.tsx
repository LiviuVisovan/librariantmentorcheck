import { useState, type ReactHTMLElement } from "react";
import { type reservation } from "./App";

type FormProps = {
  func: (obj: reservation) => void;
};

export default function LeForm({ func }: FormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numbers, setNumbers] = useState(0);

  const newObj = {
    id: self.crypto.randomUUID(),
    customerName: name,
    date: date,
    time: time,
    guests: numbers,
    status: "pending",
  };

  const today = Date.now();
  const trans = new Date(date);

  function handleSubmit(e: SubmitEvent<ReactHTMLElement>) {
    e.preventDefault();
    if (numbers >= 0 && Number(today) < Number(trans)) func(newObj);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>date</label>
        <input
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label>time</label>
        <input
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        ></input>
        <label>how many</label>
        <input
          required
          value={numbers}
          onChange={(e) => setNumbers(Number(e.target.value))}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
