import { DrizzleLink } from "@/lib/db/schema";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { cn } from "@/utils/lib";
import { dateFormater } from "@/utils/dateFormater";
import { endpoint } from "@/lib/constants/endpoint";

const LinkComponent: FC<{ link: DrizzleLink }> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${endpoint}/bit/${link.key}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white leading-none rounded-lg border-1 border-gray-200 flex shadow-md px-4 py-6 gap-4">
      <Image
        src="/assets/logo.svg"
        alt="Bitshrt"
        className="fill-black w-10 h-10"
        width={100}
        height={100}
      />

      <div className="flex flex-col justify-between">
        <div className="flex gap-3 items-center">
          <h3 className="text-blue-600 font-semibold">
            {endpoint}/bit/{link.key}
          </h3>
          <button
            className={cn(
              "rounded-full w-6 h-6 flex justify-center items-center hover:bg-blue-50 bg-gray-100 hover:text-blue-500 text-gray-500"
            )}
            onClick={copyToClipboard}
          >
            {copied ? (
              <BsCheckLg className="h-3 w-3" />
            ) : (
              <MdContentCopy className="h-3 w-3" />
            )}
          </button>
        </div>
        <div className="flex gap-1 text-xs">
          <span className="text-gray-600">
            {dateFormater(new Date(link.created_at!))}
          </span>
          <span>•</span>
          <span className="text-gray-600">{link.url}</span>
        </div>
      </div>

      <Link href={`/dashboard/links/${link.id}`} className="ml-auto">
        View More
      </Link>
    </div>
  );
};

export default LinkComponent;
