import { getInquiries } from "@/actions/get-inquiries";
import FiltersPanel from "@/components/filters/filters-panel";
import KanbanBoard from "@/components/kanban/kanban-board";

interface DashboardProps {
  searchParams: {
    clientName?: string;
    eventFrom?: string;
    eventTo?: string;
    minValue?: number;
  };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const clientName = searchParams.clientName;
  const eventFrom = searchParams.eventFrom;
  const eventTo = searchParams.eventTo;
  const minValue = searchParams.minValue;
  const allInquiries = await getInquiries({
    clientName,
    eventFrom,
    eventTo,
    minValue,
  });

  return (
    <div className="w-full max-w-full px-4 space-y-2 pb-4">
      <FiltersPanel />
      <KanbanBoard inquiries={allInquiries} />
    </div>
  );
}
