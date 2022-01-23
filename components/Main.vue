<template>
  <fragment>
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
        :data-source="transactions"
        :scroll="{ x: 1100 }"
        :pagination="false"
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
      <button v-if="hasMorePages" @click="loadMore">Load More</button>
    </div>
  </fragment>
</template>
<script>
import { allTransactionsQuery } from '../graphql/query'

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
      startMonth: null,
      endMonth: null,
      page: 0,
      pageSize: 10,
      totalCount: null,
      hasMorePages: true,
    }
  },
  async created() {
    const { totalCount, hasMorePages, transactions } = await this.fetchTrxns({
      page: this.page,
      pageSize: this.pageSize,
    })
    this.transactions = transactions
    this.totalCount = totalCount
    this.hasMorePages = hasMorePages
  },
  methods: {
    onStartMonth: async function (date, dateString) {
      this.startMonth = dateString
      if (this.endMonth) {
        this.page = 0
        const { totalCount, hasMorePages, transactions } =
          await this.fetchTrxns({
            startMonth: this.startMonth,
            endMonth: this.endMonth,
            page: this.page,
            pageSize: this.pageSize,
          })
        this.transactions = transactions
        this.totalCount = totalCount
        this.hasMorePages = hasMorePages
      }
      if (dateString === '') {
        this.page = 0
        const { totalCount, hasMorePages, transactions } =
          await this.fetchTrxns({
            page: this.page,
            pageSize: this.pageSize,
          })
        this.transactions = transactions
        this.totalCount = totalCount
        this.hasMorePages = hasMorePages
      }
    },
    onEndMonth: async function (date, dateString) {
      this.endMonth = dateString
      if (this.startMonth) {
        console.log('startMonth', this.startMonth)
        this.page = 0
        const { totalCount, hasMorePages, transactions } =
          await this.fetchTrxns({
            startMonth: this.startMonth,
            endMonth: this.endMonth,
            page: this.page,
            pageSize: this.pageSize,
          })
        this.transactions = transactions
        this.totalCount = totalCount
        this.hasMorePages = hasMorePages
      }
      if (dateString === '') {
        console.log('startMonth_:', this.startMonth)

        this.page = 0
        const { totalCount, hasMorePages, transactions } =
          await this.fetchTrxns({
            page: this.page,
            pageSize: this.pageSize,
          })
        this.transactions = transactions
        this.totalCount = totalCount
        this.hasMorePages = hasMorePages
      }
    },
    loadMore: async function () {
      this.page++
      const { totalCount, hasMorePages, transactions } = await this.fetchTrxns({
        page: this.page,
        pageSize: this.pageSize,
      })
      this.transactions = [...this.transactions, ...transactions]
      this.totalCount = totalCount
      this.hasMorePages = hasMorePages
    },
    fetchTrxns: async function ({ page, pageSize, startMonth, endMonth }) {
      const variables = {
        page,
        pageSize,
        startMonth,
        endMonth,
      }
      console.log(variables)
      const { data } = await this.$apollo.query({
        query: allTransactionsQuery,
        variables,
      })
      const { totalCount, hasMorePages } = data.transactions.metaData
      const transactions = data.transactions.data
      return {
        transactions,
        totalCount,
        hasMorePages,
      }
    },
    viewTransaction: function (text, record) {
      this.$router.push(`/${record.id}`)
    },
  },
}
</script>
