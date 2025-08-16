type Status = "standard" | "premium" | "vip";

export type vehicle = {
  id: number;
  name: string;
  image: string;
  price: string;
  status: Status[];
};
