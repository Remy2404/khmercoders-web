// Sample Data
export const monthlyDonors = [
  {
    name: "Sovann Tech",
    amount: 100,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dara Penhchet",
    amount: 50,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Angkor Innovations",
    amount: 50,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Bopha Rith",
    amount: 25,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Makara Sok",
    amount: 25,
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export const recentDonors = [
  {
    name: "Channarith Ly",
    amount: 100,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Phnom Penh Devs",
    amount: 75,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sokha Meas",
    amount: 50,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Theary Kim",
    amount: 30,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Veasna Pich",
    amount: 20,
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export interface IDonor {
  name: string;
  trx: {
    date: string;
    amount: number;
  }[];
}

export const DonorDatabase: IDonor[] = [
  { name: "Annoymous", trx: [{ date: "2024-01-01", amount: 222 }] },
  { name: "Van Sopheamen", trx: [{ date: "2024-01-01", amount: 80 }] },
  { name: "Sokna Ly", trx: [{ date: "2024-01-01", amount: 50 }] },
  { name: "Victorya Heng", trx: [{ date: "2024-01-01", amount: 50 }] },
  { name: "Punleu Chomnan", trx: [{ date: "2024-01-01", amount: 50 }] },
  { name: "Tola Imchan", trx: [{ date: "2024-01-01", amount: 50 }] },
  { name: "Socheat Leang", trx: [{ date: "2024-01-01", amount: 20 }] },
  { name: "Leang Panharith", trx: [{ date: "2024-01-01", amount: 20 }] },
  { name: "Sek Sopheak", trx: [{ date: "2024-01-01", amount: 10 }] },
  { name: "Reaksmey Rt", trx: [{ date: "2024-01-01", amount: 10 }] },
  { name: "Sarun Rathpanha", trx: [{ date: "2024-01-01", amount: 5 }] },
  { name: "Ek Vireak", trx: [{ date: "2024-01-01", amount: 5 }] },
  { name: "Visal In", trx: [{ date: "2025-03-29", amount: 100 }] },
  { name: "Sopha Sum", trx: [{ date: "2025-03-29", amount: 100 }] },
  { name: "Sokhna Vor", trx: [{ date: "2025-03-29", amount: 100 }] },
];
