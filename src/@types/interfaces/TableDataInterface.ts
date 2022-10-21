interface TableDataInterface {
  id: string,
  phone: number,
  name: string,
  children: TableDataInterface[],
}

export default TableDataInterface;
