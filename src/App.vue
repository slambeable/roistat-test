<template>
  <el-space
    wrap
    direction="vertical"
    :size="appOptions.spaceSize"
  >
    <el-button @click="showDialogAddUser">{{ appOptions.buttonLabel }}</el-button>
    <users-table></users-table>
  </el-space>
  <dialog-add-user
    :isDialogVisible="isDialogVisible"
    @closeDialog="closeDialogAddUser"
  ></dialog-add-user>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import UsersTable from '@/components/UsersTable.vue';
import DialogAddUser from '@/components/DialogAddUser.vue';

import {
  defineComponent,
  ref,
} from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    UsersTable,
    DialogAddUser,
  },
  setup() {
    const appOptions = {
      buttonLabel: 'Добавить',
      spaceSize: 30,
    };

    const store = useStore();
    const isDialogVisible = ref(false);

    store.commit('setTableData');

    const showDialogAddUser = () => {
      isDialogVisible.value = true;
    };

    const closeDialogAddUser = () => {
      isDialogVisible.value = false;
    };

    return {
      appOptions,
      isDialogVisible,
      showDialogAddUser,
      closeDialogAddUser,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
