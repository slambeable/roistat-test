import type TableDataInterface from '@/@types/interfaces/TableDataInterface';

class UsersStorageManager {
  private static instance: UsersStorageManager = new UsersStorageManager();

  private storage = window.localStorage;

  private users = window.localStorage.getItem('users');

  private constructor() {
    UsersStorageManager.instance = this;
  }

  public static getInstance(): UsersStorageManager {
    return UsersStorageManager.instance;
  }

  public getUsers() {
    return this.users;
  }

  public saveChangeInLocalStorage(tableData: TableDataInterface[]) {
    const tableDataToString = JSON.stringify(tableData);
    this.storage.setItem('users', tableDataToString);
  }
}

export default UsersStorageManager;
