"use client";
import React from "react";
import Dialog from "../dialog";
import { useInquiryStore } from "@/store/inquiry-store";
import HighValue from "../high-value";
import {
  changeInquiryPhase,
  cn,
  delay,
  formatCurrency,
  getRGBColor,
} from "@/lib/utils";
import { HIGH_VALUE_INDICATOR } from "@/lib/constants";
import Select from "../select";
import { InquiryPhase, PHASE_CONFIG, PHASES } from "@/types/inquiry";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  Clock,
  FileText,
  User,
  Users,
} from "lucide-react";
import { format, formatDistance } from "date-fns";
import { updateInquiry } from "@/actions/update-inquiry";

const InquiryModal = () => {
  const {
    selectedInquiry,
    setSelectedInquiry,
    inquiriesList,
    setInquiriesList,
    board,
    setBoard,
  } = useInquiryStore();

  const handleClose = () => {
    setSelectedInquiry(null);
  };

  if (!selectedInquiry) return null;

  const handleChangePhase = async (phase: InquiryPhase) => {
    if (!board || !selectedInquiry) return null;
    const freezeSelectedInquiry = selectedInquiry;
    const freezeBoardState = board;
    const newBoard = changeInquiryPhase(
      selectedInquiry.id,
      board,
      selectedInquiry.phase,
      phase
    );
    setBoard(newBoard);
    setSelectedInquiry({ ...selectedInquiry, phase });

    try {
      const selectedId = selectedInquiry.id;
      await updateInquiry(selectedId, phase);
      const updatedInquiries = inquiriesList.map((inq) =>
        inq.id !== selectedId ? inq : { ...inq, phase }
      );
      setInquiriesList(updatedInquiries);
    } catch (error) {
      await delay(1000);
      console.error("Sorry, we could not update phase. ", error);
      setBoard(freezeBoardState);
      setSelectedInquiry(freezeSelectedInquiry);
      return;
    }
  };

  const isHighValue = selectedInquiry.potentialValue > HIGH_VALUE_INDICATOR;

  return (
    <Dialog isOpen={true} onClose={handleClose}>
      <div className="space-y-4">
        <div className="flex flex-row items-start justify-between pr-8">
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-semibold">
              {selectedInquiry?.clientName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {selectedInquiry?.id}
            </p>
          </div>
          {isHighValue && (
            <HighValue
              className="text-sm bg-amber-100/50 px-3 py-1"
              iconClassName="size-4"
              text="High Value"
            />
          )}
        </div>

        <div className="h-[2px] w-full bg-muted-foreground/10 my-4" />

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center gap-1">
            <p className="text-sm text-muted-foreground">
              Potential Value (CHF)
            </p>
            <span
              className={cn(
                "text-2xl font-semibold leading-5",
                isHighValue && "text-yellow-400"
              )}
            >
              {formatCurrency(selectedInquiry?.potentialValue)}
            </span>
          </div>
          <div className="flex flex-col">
            <form onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="phase-selector"
                className="text-sm text-muted-foreground"
              >
                Phase
              </label>
              <Select
                id="phase-selector"
                value={selectedInquiry.phase}
                onChange={(value) => handleChangePhase(value as InquiryPhase)}
                options={PHASES.map((p) => ({
                  value: p,
                  label: (
                    <div className="flex items-center gap-3">
                      <div
                        className="size-3 rounded-full "
                        style={{
                          backgroundColor: getRGBColor(PHASE_CONFIG[p].rgb),
                        }}
                      />{" "}
                      <span>{PHASE_CONFIG[p].label}</span>
                    </div>
                  ),
                }))}
                className="w-48"
              />
            </form>
          </div>
        </div>
        <div className="flex flex-col !mt-10 !mb-10">
          <h3 className="text-sm font-medium">Event Details</h3>

          {/* Grid container */}
          <div className="grid sm:grid-cols-2 sm:grid-rows-2 gap-8 mt-4">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="size-6 text-muted-foreground" />
              <div className="flex flex-col gap-0">
                <span className="text-xs text-muted-foreground">
                  Event Type
                </span>
                <span className="text-base font-medium">
                  {selectedInquiry.eventType}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-6 text-muted-foreground" />
              <div className="flex flex-col gap-0">
                <span className="text-xs text-muted-foreground">
                  Event Date
                </span>
                <span className="text-base font-medium">
                  {format(selectedInquiry.eventDate, "PP")}
                  <span className="text-xs text-muted-foreground ml-1">
                    (
                    {formatDistance(
                      new Date(selectedInquiry.eventDate),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                    )
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-6 text-muted-foreground" />
              <div className="flex flex-col gap-0">
                <span className="text-xs text-muted-foreground">
                  Guest Count
                </span>
                <span className="text-base font-medium">
                  {selectedInquiry.guestCount} guests
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="size-6 text-muted-foreground" />
              <div className="flex flex-col gap-0">
                <span className="text-xs text-muted-foreground">
                  Contact Person
                </span>
                <span className="text-base font-medium">
                  {selectedInquiry.contactPerson}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[2px] w-full bg-muted-foreground/10 " />

        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-1">
            <Building2 className="size-4" />
            <h3>Associated Hotels</h3>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {selectedInquiry.hotels.length > 0 ? (
              selectedInquiry.hotels.map((hotel, indx) => (
                <span
                  key={`${hotel}-${indx}`}
                  className="text-sm px-5 py-2 bg-muted rounded-full font-medium"
                >
                  {hotel}
                </span>
              ))
            ) : (
              <p className="italic text-muted-foreground text-sm">
                No hotels assigned yet
              </p>
            )}
          </div>
        </div>
        <div className="h-[2px] w-full bg-muted-foreground/10 " />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-1">
            <FileText className="size-4" />
            <h3>Notes</h3>
          </div>
          <p className="text-sm text-foreground/80">
            {selectedInquiry.notes || "No notes available"}
            {selectedInquiry.notes || "No notes available"}
            {selectedInquiry.notes || "No notes available"}
          </p>
        </div>
        <div className="h-[2px] w-full bg-muted-foreground/10 " />
        <div className="flex sm:flex-row flex-col gap-2  justify-between ">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Created:{" "}
              {format(selectedInquiry.createdAt, "MMMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Updated:{" "}
              {format(selectedInquiry.updatedAt, "MMMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InquiryModal;
