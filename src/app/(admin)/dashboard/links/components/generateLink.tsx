"use client";

import UIButton from "@/components/ui/button";
import UIInput2 from "@/components/ui/input2";
import Modal from "@/components/ui/modal";
import axios from "axios";
import { FC, useState } from "react";

const GenerateLink: FC<{ fetchLinks: VoidFunction }> = ({ fetchLinks }) => {
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const _submit = async () => {
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
        className="p-5 flex flex-col gap-3 w-full max-w-xl pt-12"
        open={open}
        closeModal={() => setOpen(false)}
      >
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
      </Modal>
    </>
  );
};

export default GenerateLink;
