import "./Card.css";

type CardProps = {
  name: string;
  date: string;
  time: string;
  numbers: number;
  status: "pending" | "cancelled" | "confirmed";
};

export default function Card({ name, date, time, numbers, status }: CardProps) {
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
