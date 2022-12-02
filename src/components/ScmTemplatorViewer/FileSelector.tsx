import { FC } from "react";
import { notification, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";

import { Templator } from "./types";


export interface FileSelectorProps {
  className?: string;
  onChange: (tpl: Templator, fileName: string) => void;
}

export const FileSelector: FC<FileSelectorProps> = ({ className, onChange }) => {

  const handleSelect = (_: RcFile, files: RcFile[]) => {
    files.forEach(file => {
      file.text().then(text => {
        try {
          onChange(JSON.parse(text), file.name);
        } catch (error) {
          console.log(error);
          if (error instanceof Error)
            notification.error({ message: `[${file.name}]: ${error.message}` });
        }
      });
    });
    return false;
  };
  return (
    <Upload.Dragger
      className={className}
      multiple
      accept=".json"
      showUploadList={false}
      beforeUpload={handleSelect}
    >
      <p className="ant-upload-drag-icon">
        <UploadOutlined />
      </p>
      <p className="ant-upload-text px-10">Click or drag file to this area to upload</p>
    </Upload.Dragger>
  );
};