import "./Card.css";

export default function Card({ name, date, time, numbers, status }) {
  return (
    <>
      <div className="card">
        <div>{name}</div>
        <div>{date}</div>
        <div>{time}</div>
        <div>{numbers}</div>
        <div>{status}</div>
      </div>
    </>
  );
}
