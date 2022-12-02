
import { RootStoreProvider } from "store/RootStore";

import { ScmTemplatorViewer } from "components/ScmTemplatorViewer";

export const App = () => {
  return (
    <RootStoreProvider>
      <ScmTemplatorViewer />
    </RootStoreProvider>
  );
};