import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // interface State {
  //   users: UsersInterface,
  // }

  interface ComponentCustomProperties {
    $store: Store<State>,
  }
}
