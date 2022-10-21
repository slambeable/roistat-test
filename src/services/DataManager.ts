import type TableDataInterface from '@/@types/interfaces/TableDataInterface';

class DataManager {
  private static instance: DataManager = new DataManager();

  private defaultTableData: TableDataInterface[] = [
    {
      id: 'Боб-45614565136',
      phone: 45614565136,
      name: 'Боб',
      children: [],
    },
    {
      id: 'Андрей-41514254213',
      phone: 41514254213,
      name: 'Андрей',
      children: [],
    },
    {
      id: 'Робин-16462162142',
      phone: 16462162142,
      name: 'Робин',
      children: [
        {
          id: 'Боб-45614565132',
          phone: 45614565132,
          name: 'Боб',
          children: [],
        },
      ],
    },
  ]

  private constructor() {
    DataManager.instance = this;
  }

  public static getInstance(): DataManager {
    return DataManager.instance;
  }

  public getDefaultTableData() {
    return this.defaultTableData;
  }
}

export default DataManager;
