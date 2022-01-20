export type Transaction = {
  account: string
  description: string
  category: string
  reference: string
  currency: string
  amount: string
  status: string
  transactionDate: string
  createdAt: string
  updatedAt: string
}

export function dateToMonthString(dateString: string) {
  const parts = dateString.split(' ')[0].split('-')
  return `${parts[0]}-${parts[1]}`
}

export function filterTransactions(
  transactions: Transaction[],
  startMonthString: string,
  endEonthString: string
) {
  return transactions.filter((a) => {
    return (
      new Date(dateToMonthString(a.transactionDate)) >=
        new Date(startMonthString) &&
      new Date(dateToMonthString(a.transactionDate)) <= new Date(endEonthString)
    )
  })
}
