<template>
  <el-dialog
    :model-value="isDialogVisible"
    :title="dialogOptions.dialogTitle"
    class="dialog-add-user"
    center
    @closed="cancelDialog"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :label-width="dialogOptions.formLabelWidth"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item :label="dialogOptions.labelNameItem" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="dialogOptions.labelPhoneItem" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item
        class="dialog-add-user-last-form-item"
        :label="dialogOptions.labelChiefItem"
        prop="chief"
      >
        <el-select
          class="dialog-add-user__chief-select"
          v-model="ruleForm.chief"
          clearable
          :placeholder="dialogOptions.selectChiefPlaceholder"
        >
          <el-option
            v-for="item in selectData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelDialog">{{ dialogOptions.buttonCancelLabel }}</el-button>
        <el-button
          type="primary"
          @click="addUser(ruleFormRef)"
        >{{ dialogOptions.buttonConfirmLabel }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
} from 'vue';
import { useStore } from 'vuex';
import { validatorName, validatorPhone } from '@/helpers/validators';
import UsersStorageManager from '@/services/UsersStorageManager';
import type { FormRules, FormInstance } from 'element-plus';
import type TableDataInterface from '@/@types/interfaces/TableDataInterface';
import type SelectDataInterface from '@/@types/interfaces/SelectDataInterface';

export default defineComponent({
  name: 'DialogAddUser',
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const dialogOptions = {
      dialogTitle: 'Добавить пользователя',
      formLabelWidth: '120px',
      labelNameItem: 'Имя',
      labelPhoneItem: 'Телефон',
      labelChiefItem: 'Начальник',
      selectChiefPlaceholder: 'Выберити начальника',
      buttonCancelLabel: 'Cancel',
      buttonConfirmLabel: 'Confirm',
    };

    const usersStorageManager = UsersStorageManager.getInstance();

    const store = useStore();
    const ruleFormRef = ref<FormInstance>();

    const ruleForm = reactive({
      name: '',
      phone: '',
      chief: '',
    });

    const rules = reactive<FormRules>({
      name: [
        {
          validator: validatorName,
          trigger: 'blur',
        },
      ],
      phone: [
        {
          validator: validatorPhone,
          trigger: 'blur',
        },
      ],
    });

    const clearForm = () => {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.resetFields();
    };

    const cancelDialog = () => {
      emit('closeDialog');
      clearForm();
    };

    const createSelectData = (data: TableDataInterface[]): SelectDataInterface[] => (
      data.reduce((acc: SelectDataInterface[], item: TableDataInterface) => {
        if (item.children.length > 0) {
          return [
            ...acc,
            { label: item.id, value: item.id },
            ...createSelectData(item.children),
          ];
        }

        return [...acc, { label: item.id, value: item.id }];
      }, []));

    const findChildren = (
      data: TableDataInterface[],
      id: string,
    ): TableDataInterface[] | null => data
      .reduce((
        acc: TableDataInterface[] | null,
        tableData: TableDataInterface,
      ): TableDataInterface[] | null => {
        const { id: currentId, children: currentChildren } = tableData;

        if (acc) {
          return acc;
        }

        if (currentId === id) {
          return currentChildren;
        }

        if (currentChildren.length > 0) {
          return findChildren(currentChildren, id);
        }

        return acc;
      }, null);

    const addUser = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;

      const isValid = await formEl.validate((valid) => {
        if (valid) {
          const data = ruleForm.chief === ''
            ? store.state.tableData
            : findChildren(store.state.tableData, ruleForm.chief);

          const dataLength = data.length;

          data.push({
            id: `${ruleForm.name}-${ruleForm.phone}-${dataLength}`,
            phone: Number(ruleForm.phone),
            name: ruleForm.name,
            children: [],
          });
        }
      });

      if (!isValid) return;

      cancelDialog();
      usersStorageManager.saveChangeInLocalStorage(store.state.tableData);
    };

    const selectData = computed(() => {
      const data = createSelectData(store.state.tableData);
      return data;
    });

    return {
      dialogOptions,
      ruleFormRef,
      ruleForm,
      rules,
      selectData,
      cancelDialog,
      addUser,
    };
  },
});
</script>

<style lang="scss">
.dialog-add-user {
  min-width: 365px;
  max-width: 500px;
  border-radius: 8px;

  &-last-form-item {
    margin-bottom: 0;
  }

  &__chief-select {
    width: 100%;
  }
}
</style>
