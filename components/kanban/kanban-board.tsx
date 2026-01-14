"use client";
import { FC, useEffect, useRef, useState } from "react";
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
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import InquiryCard from "./inquiry-card";
import InquiryModal from "./inquiry-modal";
import { useInquiryStore } from "@/store/inquiry-store";
import { buildBoard, changeInquiryPhase, delay } from "@/lib/utils";
import { updateInquiry } from "@/actions/update-inquiry";

interface KanbanBoardProps {
  inquiries: Inquiry[];
}

const KanbanBoard: FC<KanbanBoardProps> = ({ inquiries = [] }) => {
  const freezeBoardRef = useRef<BoardState | null>(null);
  const { inquiriesList, setInquiriesList, board, setBoard } =
    useInquiryStore();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [mount, setMount] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
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

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!board) return;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id;

    if (!freezeBoardRef.current) {
      freezeBoardRef.current = JSON.parse(JSON.stringify(board));
    }

    let sourcePhase: InquiryPhase | null = null;
    let targetPhase: InquiryPhase | null = null;

    for (const phase of PHASES) {
      if (board[phase].some((inq) => inq.id === activeId)) {
        sourcePhase = phase;
        break;
      }
    }
    if (!sourcePhase) return;

    if (PHASES.includes(overId as InquiryPhase)) {
      //if PHASES includes overId => target column is empty.
      targetPhase = overId as InquiryPhase;
    } else {
      for (const phase of PHASES) {
        if (board[phase].some((inq) => inq.id === overId)) {
          targetPhase = phase;
          break;
        }
      }
    }

    if (!targetPhase) return;

    if (sourcePhase === targetPhase) return;

    if (!board) return board;
    const updatedBoard = changeInquiryPhase(
      activeId,
      board,
      sourcePhase,
      targetPhase
    );
    setBoard(updatedBoard);

    try {
      await updateInquiry(activeId, targetPhase);

      const updatedInquiries = inquiriesList.map((inq) =>
        inq.id !== activeId ? inq : { ...inq, phase: targetPhase }
      );

      freezeBoardRef.current = null;
      setInquiriesList(updatedInquiries);
    } catch (error) {
      await delay(1000);
      console.error("Sorry, we could not update phase.", error);
      if (freezeBoardRef.current) {
        setBoard(freezeBoardRef.current);
      }
      return;
    }
  };

  const activeItem =
    (activeId && inquiriesList.find((i) => i.id === activeId)) || null;

  useEffect(() => {
    setInquiriesList(inquiries);
    setBoard(buildBoard(inquiries));
  }, [inquiries, setBoard, setInquiriesList]);

  useEffect(() => {
    if (!mount) {
      setMount(true);
    }
  }, [mount]);

  if (!mount) return null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        key={"dnd-context"}
      >
        <div className="flex flex-row gap-4 overflow-x-auto py-1 ">
          {PHASES.map((phase) => (
            <KanbanColumn
              key={phase}
              type={phase}
              inquiries={board?.[phase] || []}
            />
          ))}
        </div>
        <DragOverlay className="opacity-80 active:scale-105  active:-rotate-2">
          {activeItem ? <InquiryCard inquiry={activeItem} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
      <InquiryModal />
    </>
  );
};

export default KanbanBoard;
