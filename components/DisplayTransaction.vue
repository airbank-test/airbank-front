<template>
  <div
    class="w-full flex flex-col space-y-4 bg-white rounded-lg p-4 space-y-2 overflow-hidden"
  >
    <h2 class="mb-1 text-xl font-bold">
      View Transaction ({{ transaction['account'] }})
    </h2>
    <a-descriptions
      :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
      layout="vertical"
      bordered
    >
      <a-descriptions-item label="Account" span="1">
        {{ transaction['account'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Description">
        {{ transaction['description'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Category">
        {{ transaction['category'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Reference">
        {{ transaction['reference'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Currency" :span="2">
        {{ transaction['currency'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Amount" :span="3">
        {{ transaction['amount'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Status">
        {{ transaction['status'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Transaction Date">
        {{ transaction['transactionDate'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Created At">
        {{ transaction['createdAt'] }}
      </a-descriptions-item>
      <a-descriptions-item label="Updated At">
        {{ transaction['updatedAt'] }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
import { getTransactionQuery } from './../graphql/query'

export default {
  data() {
    return {
      transaction: {},
    }
  },
  // get transaction in lifecycle hook
  async created() {
    const { data } = await this.$apollo.query({
      query: getTransactionQuery,
      variables: {
        transactionId: +this.$route.params.id,
      },
    })
    this.transaction = {
      ...data.transaction,
      updatedAt: new Date(data.transaction.updatedAt).toDateString(),
      createdAt: new Date(data.transaction.createdAt).toDateString(),
      transactionDate: new Date(
        data.transaction.transactionDate
      ).toDateString(),
    }
  },
}
</script>
