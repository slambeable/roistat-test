import { createStore } from 'vuex';
import DataManager from '@/services/DataManager';
import UsersStorageManager from '@/services/UsersStorageManager';

const dataManager = DataManager.getInstance();
const usersStorageManager = UsersStorageManager.getInstance();

export default createStore({
  state: {
    tableData: null,
  },
  mutations: {
    setTableData(state) {
      state.tableData = usersStorageManager.getUsers()
        ? JSON.parse(usersStorageManager.getUsers() ?? '')
        : dataManager.getDefaultTableData();
    },
  },
});
