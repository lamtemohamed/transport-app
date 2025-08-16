export type Payment = {
  id: string;
  clientName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
};
