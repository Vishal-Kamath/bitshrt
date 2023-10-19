"use client";

import { DrizzleLink } from "@/lib/db/schema";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import LinkComponent from "./components/linkComponent";
import GenerateLink from "./components/generateLink";

const LinksPage: FC = () => {
  const [links, setLinks] = useState<DrizzleLink[]>([]);

  const fetchLinks = () => {
    axios
      .get<{ links: DrizzleLink[] }>("/api/link", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setLinks(res.data.links);
      })
      .catch();
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <main className="flex flex-col px-vw gap-6 pt-10">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">My Links</h2>
        <GenerateLink fetchLinks={fetchLinks} />
      </div>

      <section className="flex flex-col gap-3">
        {links.map((link) => (
          <LinkComponent key={link.id} link={link} />
        ))}
      </section>
    </main>
  );
};

export default LinksPage;
