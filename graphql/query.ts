import gql from 'graphql-tag'

export const allTransactionsQuery = gql`
  query Transactions {
    transactions {
      id
      account
      description
      category
      reference
      currency
      amount
      status
      transactionDate
      createdAt
      updatedAt
    }
  }
`
export const getTransactionQuery = gql`
  query Transaction($transactionId: Int!) {
    transaction(id: $transactionId) {
      id
      account
      description
      category
      reference
      currency
      amount
      status
      transactionDate
      createdAt
      updatedAt
    }
  }
`
