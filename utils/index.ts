export function dateToMonthString(dateString: string) {
  const parts = dateString.split(' ')[0].split('-')
  return `${parts[0]}-${parts[1]}`
}

export function filterTransactions(
  transactions: any[],
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
