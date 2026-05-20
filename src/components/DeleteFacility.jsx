"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { BsTrash3 } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

export function DeleteFacility({ facility }) {
  const { _id, facilityName } = facility;

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/facilities/${_id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        // credentials: "include",
      },
    );

    const data = await res.json();
    redirect("/facilities");
  };

  return (
    <AlertDialog>
      {/* Trigger button */}
      <Button
        className="text-[#EF4444] border-[#EF4444] rounded-none text-sm md:text-base"
        variant="outline"
      >
        <BsTrash3 /> Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-[90vw] sm:w-[80vw] md:max-w-md p-5 sm:p-6 md:p-8">
            <AlertDialog.CloseTrigger />

            {/* Header */}
            <AlertDialog.Header className="pb-3">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-base sm:text-lg md:text-xl text-[#0C0B0B]">
                Delete facility permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="py-3">
              <p className="text-sm md:text-base text-[#6C696D] leading-relaxed">
                Are you sure you want to delete{" "}
                <strong className="text-[#0C0B0B]">{facilityName}</strong>?
                This action cannot be undone and will permanently remove this
                sport facility from the system.
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                slot="close"
                variant="outline"
                className="rounded-none text-sm md:text-base w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
                className="rounded-none text-sm md:text-base w-full sm:w-auto order-1 sm:order-2"
              >
                <FaRegTrashAlt /> Delete Facility
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}