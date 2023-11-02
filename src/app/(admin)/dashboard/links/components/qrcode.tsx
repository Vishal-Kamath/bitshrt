import { cn } from "@/utils/lib";
import { FC } from "react";
import QRCode from "react-qr-code";

const QRCodeComponent: FC<{ link: string; className?: string }> = ({
  link,
  className,
}) => {
  return (
    <QRCode
      size={256}
      className={cn("h-full max-h-24 w-fit aspect-square", className)}
      value={link}
      viewBox={`0 0 256 256`}
    />
  );
};

export default QRCodeComponent;
