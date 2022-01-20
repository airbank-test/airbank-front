<template>
  <div>
    <div
      class="mb-1.5 sm:flex-nowrap md:p-5 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-row flex-wrap bg-white rounded-lg p-4"
    >
      <span class="text-xl text-center">Filter:</span>
      <a-month-picker placeholder="Starting month" @change="onStartMonth" />
      <a-month-picker placeholder="Ending month" @change="onEndMonth" />
    </div>
    <div
      class="w-100 flex flex-col space-y-4 bg-white rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <h2 class="mb-1 text-xl font-bold">Transactions</h2>
      <a-table
        :columns="columns"
        :data-source="filterTransactions"
        :scroll="{ x: 1100 }"
        class="bg-white w-200"
      >
        <a
          slot="action"
          slot-scope="text, record"
          href="javascript:;"
          @click="() => viewTransaction(text, record)"
          >View</a
        >
      </a-table>
    </div>
  </div>
</template>
<script>
import { allTransactionsQuery } from '../graphql/query'
import { filterTransactions } from '../utils'

const columns = [
  {
    title: 'Account',
    width: 120,
    dataIndex: 'account',
    key: 'account',
    fixed: 'left',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Reference', dataIndex: 'reference', key: 'reference' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  {
    title: 'Transaction Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
  },
  { title: 'Date Created', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Date Updated', dataIndex: 'updatedAt', key: 'updatedAt' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
]

export default {
  data() {
    return {
      columns,
      transactions: [],
      filterTransactions: [],
      startMonth: null,
      endMonth: null,
    }
  },
  async created() {
    const { data } = await this.$apollo.query({
      query: allTransactionsQuery,
    })
    this.transactions = data.transactions
    this.filterTransactions = data.transactions
  },
  methods: {
    onStartMonth: function (date, dateString) {
      this.startMonth = dateString
      if (this.endMonth) {
        this.filterTransactions = filterTransactions(
          this.transactions,
          dateString,
          this.endMonth
        )
      }
      if (dateString === '') {
        this.filterTransactions = this.transactions
      }
    },
    onEndMonth: function (date, dateString) {
      this.endMonth = dateString
      if (this.startMonth) {
        this.filterTransactions = filterTransactions(
          this.transactions,
          this.startMonth,
          dateString
        )
      }
      if (dateString === '') {
        this.filterTransactions = this.transactions
      }
    },
    viewTransaction: function (text, record) {
      this.$router.push(`/${record.id}`)
    },
  },
}
</script>
