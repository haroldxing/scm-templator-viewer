import { observer } from "mobx-react-lite";
import { useRootStore } from "store/RootStore";

import { EntitiesList } from "./EntitiesList";
import { FileSelector } from "./FileSelector";
import { Templator } from "./types";


export const ScmTemplatorViewer = observer(() => {
  const { templatorStore } = useRootStore();
  const handleFileChange = ({ entities }: Templator, name: string) => {
    templatorStore.handleEntities(entities, name);
  };
  return (
    <>
      <div className="flex divide-x overflow-x-auto">
        <EntitiesList entities={templatorStore.entities} />
      </div>
      <FileSelector className="fixed right-4 bottom-4 bg-white" onChange={handleFileChange} />
    </>
  );
});