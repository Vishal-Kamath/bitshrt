import { FC } from "react";
import QRCode from "react-qr-code";

const QRCodeComponent: FC<{ link: string }> = ({ link }) => {
  return (
    <QRCode
      size={256}
      className="h-full max-h-24 w-fit aspect-square"
      value={link}
      viewBox={`0 0 256 256`}
    />
  );
};

export default QRCodeComponent;
