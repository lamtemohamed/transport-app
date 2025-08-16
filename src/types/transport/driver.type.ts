type Status = "available" | "on-delivery" | "offline";

export type Driver = {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  status: Status;
};
