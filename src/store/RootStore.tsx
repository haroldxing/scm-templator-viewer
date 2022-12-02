import { createContext, FC, PropsWithChildren, useContext } from "react";
import { makeAutoObservable } from "mobx";
import { useLocalObservable } from "mobx-react-lite";

import { TemplatorStore } from "components/ScmTemplatorViewer/store/TemplatorStore";

export class RootStore {

  readonly templatorStore = new TemplatorStore();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useLocalObservable(() => new RootStore());
  return (
    <RootStoreContext.Provider value={value}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const rootStore = useContext(RootStoreContext);
  if (rootStore === null) {
    throw new Error(
      "A RootStore was not provided via context! Are you using `useRootStore` outside of the main React tree?",
    );
  }
  return rootStore;
};
