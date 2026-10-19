import { useState } from "react";

export default function LeForm({ func }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numbers, setNumbers] = useState(0);

  const newObj = {
    customerName: name,
    date: date,
    time: time,
    guests: numbers,
  };

  return (
    <>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>name</label>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <label>date</label>
        <input value={date} onChange={(e) => setDate(e.target.value)}></input>
        <label>time</label>
        <input value={time} onChange={(e) => setTime(e.target.value)}></input>
        <label>how many</label>
        <input
          value={numbers}
          onChange={(e) => setNumbers(Number(e.target.value))}
        ></input>
        <button
          type="submit"
          //onSubmit={}
          onClick={() => func(newObj)}
        >
          Submit
        </button>
      </form>
    </>
  );
}
