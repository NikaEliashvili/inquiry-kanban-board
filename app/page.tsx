import { getInquiries } from "@/actions/get-inquiries";
import KanbanBoard from "@/components/kanban/kanban-board";

export default async function Home() {
  const allInquiries = await getInquiries();

  return (
    <div className="w-full max-w-full px-4">
      <KanbanBoard inquiries={allInquiries} />
    </div>
  );
}
