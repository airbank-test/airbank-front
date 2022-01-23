import gql from 'graphql-tag'

export const allTransactionsQuery = gql`
  query Transactions(
    $page: Int
    $pageSize: Int
    $startMonth: String
    $endMonth: String
  ) {
    transactions(
      page: $page
      pageSize: $pageSize
      startMonth: $startMonth
      endMonth: $endMonth
    ) {
      data {
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
      metaData {
        totalCount
        hasMorePages
      }
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

export const getTransactionsBetweenMonths = gql`
  query Transactions($startMonth: String!, $endMonth: String!) {
    transactionsBetweenMonths(startMonth: $startMonth, endMonth: $endMonth) {
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
