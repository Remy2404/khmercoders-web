export interface IDonor {
  name: string;
  trx: {
    date: string;
    amount: number;
  }[];
}

export const DonorDatabase: IDonor[] = [
  { name: 'Annoymous', trx: [{ date: '2024-01-01', amount: 222 }] },
  { name: 'Van Sopheamen', trx: [{ date: '2024-01-01', amount: 80 }] },
  { name: 'Sokna Ly', trx: [{ date: '2024-01-01', amount: 50 }] },
  { name: 'Victorya Heng', trx: [{ date: '2024-01-01', amount: 50 }] },
  { name: 'Punleu Chomnan', trx: [{ date: '2024-01-01', amount: 50 }] },
  { name: 'Tola Imchan', trx: [{ date: '2024-01-01', amount: 50 }] },
  { name: 'Socheat Leang', trx: [{ date: '2024-01-01', amount: 20 }] },
  { name: 'Leang Panharith', trx: [{ date: '2024-01-01', amount: 20 }] },
  { name: 'Sek Sopheak', trx: [{ date: '2024-01-01', amount: 10 }] },
  { name: 'Reaksmey Rt', trx: [{ date: '2024-01-01', amount: 10 }] },
  { name: 'Sarun Rathpanha', trx: [{ date: '2024-01-01', amount: 5 }] },
  { name: 'Ek Vireak', trx: [{ date: '2024-01-01', amount: 5 }] },
  { name: 'Visal In', trx: [{ date: '2025-03-29', amount: 100 }] },
  { name: 'Sopha Sum', trx: [{ date: '2025-03-29', amount: 100 }] },
  { name: 'Sokhna Vor', trx: [{ date: '2025-03-29', amount: 100 }] },
  { name: 'Kama Sos', trx: [{ date: '2025-04-29', amount: 50 }] },
];
