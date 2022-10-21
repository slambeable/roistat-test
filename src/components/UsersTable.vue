<template>
  <el-table
    :data="$store.state.tableData"
    class="user-table"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column
      prop="name"
      :label="tableOptions.nameLabelHeader"
      sortable
    />
    <el-table-column
      prop="phone"
      :label="tableOptions.phoneLabelHeader"
      sortable
    />
    <el-table-column
      fixed="right"
      :width="tableOptions.removeColumnWidth"
    >
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow($store.state.tableData, scope.row.id)"
        >
          {{ tableOptions.removeButtonLabel }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import UsersStorageManager from '@/services/UsersStorageManager';
import type TableDataInterface from '@/@types/interfaces/TableDataInterface';

export default defineComponent({
  name: 'UsersTable',
  setup() {
    const store = useStore();

    const usersStorageManager = UsersStorageManager.getInstance();

    const tableOptions = {
      nameLabelHeader: 'Имя',
      phoneLabelHeader: 'Телефон',
      removeButtonLabel: 'Удалить',
      removeColumnWidth: '85',
    };

    const deleteRow = (data: TableDataInterface[], currentId: string) => {
      const index = data.findIndex(({ id, children }: TableDataInterface) => {
        if (children.length !== 0) {
          deleteRow(children, currentId);
        }

        return id === currentId;
      });

      if (index >= 0) {
        data.splice(index, 1);
      }

      usersStorageManager.saveChangeInLocalStorage(store.state.tableData);
    };

    return {
      tableOptions,
      deleteRow,
    };
  },
});

</script>

<style lang="scss">
.user-table {
  width: calc(99vw - 16px);
  max-width: 800px;
}
</style>
