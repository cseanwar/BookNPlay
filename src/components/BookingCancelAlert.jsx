"use client";

import { authClient } from "@/lib/auth-client";
import { Trash2 } from "lucide-react";
// import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";

export function BookingCancelAlert({ bookingId }) {
  const handleCancelBooking = async () => {
    // const { data } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const data = await res.json();
    window.location.reload();
  };

  return (
    <AlertDialog>
      {/* Trigger */}
      <Button
        className="rounded-none border-red-500 text-red-500 text-sm md:text-base"
        variant="outline"
      >
        <Trash2 size={18} /> Cancel
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-[90vw] sm:w-[80vw] md:max-w-md p-5 sm:p-6 md:p-8">
            <AlertDialog.CloseTrigger />

            {/* Header */}
            <AlertDialog.Header className="pb-3">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-base sm:text-lg md:text-xl text-[#0C0B0B]">
                Cancel Booking Permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="py-3">
              <p className="text-sm md:text-base text-[#6C696D] leading-relaxed">
                Are you sure you want to cancel this booking? This action cannot
                be undone and your reservation will be permanently removed.
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                slot="close"
                variant="outline"
                className="rounded-none text-sm md:text-base w-full sm:w-auto order-2 sm:order-1"
              >
                Keep Booking
              </Button>
              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
                className="rounded-none text-sm md:text-base w-full sm:w-auto order-1 sm:order-2"
              >
                <FaRegTrashAlt /> Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}