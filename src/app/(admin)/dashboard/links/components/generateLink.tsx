"use client";

import UIButton from "@/components/ui/button";
import UIInput2 from "@/components/ui/input2";
import useModal from "@/hooks/useModal";
import axios from "axios";
import { FC, useState } from "react";

const GenerateLink: FC = () => {
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");
  const [openModal, Modal] = useModal();

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <UIButton onClick={openModal} variant="outlined">
        Generate
      </UIButton>
      <Modal className="p-5 flex flex-col gap-3 w-full max-w-xl pt-12">
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
