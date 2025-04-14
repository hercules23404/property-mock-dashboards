
import React from "react";
import { NoticeCard } from "./NoticeCard";

interface Notice {
  id: string;
  title: string;
  content: string;
  datePosted: string;
}

interface NoticeListProps {
  notices: Notice[];
}

export const NoticeList = ({ notices }: NoticeListProps) => {
  return (
    <div className="grid gap-4">
      {notices.map((notice) => (
        <NoticeCard key={notice.id} {...notice} />
      ))}
    </div>
  );
};
