import { action, computed, makeAutoObservable, observable } from "mobx";
import { instagramaccount, instagramuser, telegramuser } from "@prisma/client";
import axios from "axios";

type TUnsafeUserData = {
  auth_date: string;
  hash: string;
  query_id: string;
  user: TTelegramUser;
};

type TTelegramUser = {
  first_name: string;
  id: number;
  language_code: string;
  last_name: string;
  username: string;
};

type TAxiosResponse<T> = {
  data: T;
};

class UserStore {
  // client: AxiosInstance;

  constructor() {
    // this.client = client;
    makeAutoObservable(this);
  }

  @observable _telegramUser: telegramuser | undefined;
  @observable _user: TUnsafeUserData | undefined = undefined;
  @observable _instagramAccounts: instagramaccount[] = [];
  @observable _instagramUsers: instagramuser[] = [];

  @action setUserFromWindow = () => {
    if (typeof window === "undefined") {
      console.log("Window is not defined");
      return;
    }
    this._user = window?.Telegram?.WebApp?.initDataUnsafe;
    axios
      .get<undefined, TAxiosResponse<telegramuser>>(
        `/api/telegram_user/${this.user?.user.id}`
      )
      .then((user) => {
        console.log(user);
        this._telegramUser = user.data;
      });
  };

  @action setInstagramUsers = async () => {
    if (this.user === undefined) {
      console.log("USER IS NOT DEFINED");
      return;
    }
    return await axios
      .get<undefined, TAxiosResponse<instagramuser[]>>(
        `/api/instagram_user/${this.user.user.id}`
      )
      .then((accounts) => {
        console.log(accounts);
        this._instagramUsers = accounts.data;
        return accounts.data;
      });
  };

  @action setInstagramAccounts = async () => {
    if (this.user === undefined) {
      console.log("USER IS NOT DEFINED");
      return;
    }
    return await axios
      .get<undefined, TAxiosResponse<instagramaccount[]>>(
        `/api/instagram_account/${this.user.user.id}`
      )
      .then((accounts) => {
        console.log(accounts);
        this._instagramAccounts = accounts.data;
        return accounts.data;
      });
  };

  @action initUserData = async () => {
    if (this.user === undefined) {
      console.log("USER IS NOT DEFINED");
      return;
    }
    await this.setInstagramUsers();
    await this.setInstagramAccounts();
  };

  @action changeInstagramUserEnabledStatus = (user: instagramuser) => {
    return axios
      .post<undefined, TAxiosResponse<instagramuser>>(
        `/api/instagram_user/enable_change`,
        user
      )
      .then((account) => {
        this._instagramUsers = this._instagramUsers.map((iUser) =>
          iUser.pk === user.pk ? account.data : iUser
        );
        return this._instagramUsers;
      });
  };

  @computed get user() {
    return this._user;
  }

  @computed get instagramAccounts() {
    return this._instagramAccounts;
  }

  @computed get instagramUsers() {
    return this._instagramUsers;
  }
}

export default UserStore;
