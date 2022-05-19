import RootStore from "./RootStore";

export default function initRootStore(initialData: RootStore) {
  // if (isServer) {
  return new RootStore(initialData);
}
// if (store === null) PL
// store = new RootStore(initialData)
// return store;
