"use client";

import UIButton from "@/components/ui/button";
import UIInput2 from "@/components/ui/input2";
import Modal from "@/components/ui/modal";
import axios from "axios";
import { FC, useState } from "react";
import QRCodeComponent from "./qrcode";
import { endpoint } from "@/lib/constants/endpoint";

const GenerateLink: FC<{ fetchLinks: VoidFunction }> = ({ fetchLinks }) => {
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const _submit = async () => {
    if (!url.trim() || !key.trim()) return alert("Please fill all details");
    if (key.length !== 6)
      return alert("Shortened key must be a 6 characters word");
    await axios
      .post(
        "/api/link",
        {
          key,
          url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        fetchLinks();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <UIButton onClick={() => setOpen(true)} variant="outlined">
        Generate
      </UIButton>
      <Modal
        className="px-9 flex gap-9 items-center w-full max-w-xl py-12"
        open={open}
        closeModal={() => setOpen(false)}
      >
        <div className="flex w-full flex-col gap-3">
          <UIInput2
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Original URL"
          />

          <UIInput2
            id="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Shorten Key"
          />

          <UIButton onClick={_submit} variant="sky-contained">
            Submit
          </UIButton>
        </div>
        <QRCodeComponent link={`${endpoint}/bit/${key}`} className="max-h-36" />
      </Modal>
    </>
  );
};

export default GenerateLink;
