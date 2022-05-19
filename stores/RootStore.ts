import UserStore from "./UserStore";

class RootStore {
  userStore: UserStore;

  constructor(initialData) {
    this.userStore = new UserStore();
  }
}

export default RootStore;
