import { Notice } from "@/types/notice";
import NoticeCard from "./NoticeCard";

interface NoticeListProps {
  notices: Notice[];
}

export function NoticeList({ notices }: NoticeListProps) {
  return (
    <div className="space-y-4">
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
