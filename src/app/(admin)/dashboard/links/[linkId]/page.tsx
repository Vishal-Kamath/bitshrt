"use client";

import { endpoint } from "@/lib/constants/endpoint";
import { DrizzleLink, DrizzleLog } from "@/lib/db/schema";
import axios from "axios";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

const LinkDetailPage: FC = () => {
  const params = useParams();
  const linkId = params["linkId"] as string;

  const [link, setLink] = useState<DrizzleLink>();
  const [linkLogs, setLinkLogs] = useState<DrizzleLog[]>();

  const getLinkData = async (linkId: string) => {
    await axios
      .get<{ link: DrizzleLink; linkLogs: DrizzleLog[] }>(
        `${endpoint}/api/link/${linkId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setLink(res.data.link);
        setLinkLogs(res.data.linkLogs);
      });
  };

  useEffect(() => {
    getLinkData(linkId);
  }, [linkId]);

  return (
    <main className="flex flex-col px-vw gap-6 pt-10">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Links - {link?.key}</h2>
      </div>

      <section className="flex flex-col gap-3">
        {linkLogs &&
          linkLogs
            .sort((dateA, dateB) => {
              const dateTimeA = new Date(
                dateA.created_at?.toString()!
              ).getTime();
              const dateTimeB = new Date(
                dateB.created_at?.toString()!
              ).getTime();
              return dateTimeB - dateTimeA;
            })
            .map((log) => (
              <div className="flex flex-col" key={log.id}>
                <span>city - {log.city}</span>
                <span>country - {log.country}</span>
                <span>region - {log.region}</span>
                <span>latitude - {log.latitude}</span>
                <span>longitude - {log.longitude}</span>
                <span>browser - {log.browser}</span>
                <span>os - {log.os}</span>
                <span>time - {log.created_at?.toString()}</span>
              </div>
            ))}
      </section>
    </main>
  );
};

export default LinkDetailPage;
