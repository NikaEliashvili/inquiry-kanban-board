"use client";
import { FC, useState } from "react";
import KanbanColumn from "./kanban-column";
import { BoardState, Inquiry, InquiryPhase, PHASES } from "@/types/inquiry";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import InquiryCard from "./inquiry-card";

const buildBoard = (inquiries: Inquiry[]): BoardState =>
  PHASES.reduce((acc, phase) => {
    acc[phase] = inquiries.filter((i) => i.phase === phase);
    return acc;
  }, {} as BoardState);

interface KanbanBoardProps {
  inquiries: Inquiry[];
}

const KanbanBoard: FC<KanbanBoardProps> = ({ inquiries = [] }) => {
  const [board, setBoard] = useState(() => buildBoard(inquiries));
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let sourcePhase: InquiryPhase | null = null;
    let targetPhase: InquiryPhase | null = null;

    // find source column
    for (const phase of PHASES) {
      if (board[phase].some((i) => i.id === activeId)) {
        sourcePhase = phase;
      }
    }
    if (!sourcePhase) return;

    // find target column (includes empty column detection)
    if (PHASES.includes(overId as InquiryPhase)) {
      targetPhase = overId as InquiryPhase;
    } else {
      for (const phase of PHASES) {
        if (board[phase].some((i) => i.id === overId)) {
          targetPhase = phase;
        }
      }
    }
    if (!targetPhase) return;

    // reorder inside same column
    if (sourcePhase === targetPhase) {
      const oldIndex = board[sourcePhase].findIndex((i) => i.id === activeId);
      const newIndex = board[sourcePhase].findIndex((i) => i.id === overId);

      setBoard((prev) => ({
        ...prev,
        [sourcePhase]: arrayMove(prev[sourcePhase], oldIndex, newIndex),
      }));
      return;
    }

    // move to another column
    setBoard((prev) => {
      const source = [...prev[sourcePhase!]];
      const target = [...prev[targetPhase!]];

      const sourceIndex = source.findIndex((i) => i.id === activeId);
      const moved = source[sourceIndex];

      source.splice(sourceIndex, 1);

      if (PHASES.includes(overId as InquiryPhase)) {
        // dropped into empty column
        target.push({ ...moved, phase: targetPhase! });
      } else {
        // dropped on top of a card in another column
        const targetIndex = target.findIndex((i) => i.id === overId);
        target.splice(targetIndex, 0, { ...moved, phase: targetPhase! });
      }

      return {
        ...prev,
        [sourcePhase!]: source,
        [targetPhase!]: target,
      };
    });
  };

  const activeItem =
    (activeId &&
      Object.values(board)
        .flat()
        .find((i) => i.id === activeId)) ||
    null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row gap-4 overflow-x-auto p-1">
        {PHASES.map((phase) => (
          <KanbanColumn key={phase} type={phase} inquiries={board[phase]} />
        ))}
      </div>
      {/* 🔥 Makes dragging smooth */}
      <DragOverlay>
        {activeItem ? <InquiryCard inquiry={activeItem} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
