
import React from "react";
import { NoticeCard } from "./NoticeCard";

export interface Notice {
  id: number;  // Changed from string to number
  title: string;
  content: string;
  category: string;
  priority: string;
  datePosted: string;
  postedBy: string;
  properties: string[];
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
