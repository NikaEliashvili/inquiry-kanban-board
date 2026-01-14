"use client";

import { getInquiries } from "@/actions/get-inquiries";
import FiltersPanel from "@/components/filters/filters-panel";
import KanbanBoard from "@/components/kanban/kanban-board";
import { Inquiry } from "@/types/inquiry";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { KanbanSkeleton } from "./loading";
export default function Dashboard() {
  const searchParams = useSearchParams();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const clientName = searchParams.get("clientName") || undefined;
    const eventFrom = searchParams.get("eventFrom") || undefined;
    const eventTo = searchParams.get("eventTo") || undefined;
    const minValue = searchParams.get("minValue") || undefined;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getInquiries({
          clientName,
          eventFrom,
          eventTo,
          minValue: Number(minValue),
        });
        setInquiries(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      setInquiries([]);
    };
  }, [searchParams]);

  return (
    <div className="relative w-full max-w-full px-4 space-y-2 pb-4">
      <FiltersPanel />
      {loading ? <KanbanSkeleton /> : <KanbanBoard inquiries={inquiries} />}
    </div>
  );
}
