"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";
import {
  PiBuildingsBold,
  PiClockBold,
  PiCurrencyCircleDollarBold,
  PiImageBold,
  PiMapPinBold,
  PiNotePencilBold,
  PiUsersBold,
} from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";

export function EditFacilityModal({ facility }) {
  const {
    _id,
    facilityName,
    imageUrl,
    facility_type,
    price_per_hour,
    location,
    capacity,
    available_slots,
    description,
  } = facility;

  const [selectedType, setSelectedType] = useState(facility_type);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedFacility = Object.fromEntries(formData.entries());

    updatedFacility.facility_type = selectedType;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedFacility),
        //   credentials: "include",
      },
    );

    const data = await res.json();
    if (data.modifiedCount > 0) {
      toast.success("Facility updated successfully");
      onClose();
      // setIsOpen(false);
    }
  };

  return (
    <Modal>
      <button className="flex-1 h-12 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-emerald-500 transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-gray-700">
        <Pencil size={18} />
        Edit
      </button>
      {/* <Button
        variant="outline"
        className="rounded-xl text-[#0C0B0B] text-sm md:text-base"
      >
        <RiEdit2Line /> Edit
      </Button> */}

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-[95vw] sm:w-[90vw] md:max-w-xl p-0 overflow-hidden">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="px-5 sm:px-8 pt-6 pb-4">
              <Modal.Heading className="text-[#0C0B0B] text-xl md:text-2xl">
                Update Sport Facility
              </Modal.Heading>
              <p className="text-[#6C696D] text-sm md:text-base mt-1">
                Make changes to the sport facility details below
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="px-5 sm:px-8 pb-0 overflow-y-auto max-h-[65vh]">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="p-6 md:p-10 lg:p-12">
                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Facility Name */}
                    <div>
                      <TextField
                        defaultValue={facilityName}
                        name="facilityName"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiBuildingsBold className="text-[#22C55E]" />
                          Facility Name
                        </Label>

                        <Input
                          placeholder="e.g., BookNPlay Football Arena"
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Facility Type */}
                    <div>
                      <Select
                        name="facility_type"
                        isRequired
                        placeholder="Select Sport type"
                        // defaultSelectedKey={facility_type}
                        // onSelectionChange={(key) => setSelectedType(key)}
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <TbCategory className="text-[#22C55E]" />
                          Sport Type
                        </Label>

                        <Select.Trigger className="rounded-2xl bg-[#F8FAFC] border border-slate-200">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Football" textValue="Football">
                              Football
                            </ListBox.Item>

                            <ListBox.Item id="Cricket" textValue="Cricket">
                              Cricket
                            </ListBox.Item>

                            <ListBox.Item id="Badminton" textValue="Badminton">
                              Badminton
                            </ListBox.Item>

                            <ListBox.Item id="Swimming" textValue="Swimming">
                              Swimming
                            </ListBox.Item>

                            <ListBox.Item id="Tennis" textValue="Tennis">
                              Tennis
                            </ListBox.Item>

                            <ListBox.Item
                              id="Basketball"
                              textValue="Basketball"
                            >
                              Basketball
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={imageUrl}
                        name="imageUrl"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiImageBold className="text-[#22C55E]" />
                          Facility Image URL
                        </Label>

                        <Input
                          type="url"
                          placeholder="https://example.com/facility.jpg"
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Location */}
                    <div>
                      <TextField
                        defaultValue={location}
                        name="location"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiMapPinBold className="text-[#22C55E]" />
                          Location
                        </Label>

                        <Input
                          placeholder="e.g., Dhaka, Bangladesh"
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Price */}
                    <div>
                      <TextField
                        defaultValue={price_per_hour}
                        name="price_per_hour"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiCurrencyCircleDollarBold className="text-[#22C55E]" />
                          Price Per Hour
                        </Label>

                        <Input
                          type="number"
                          placeholder="e.g., 1500"
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Capacity */}
                    <div>
                      <TextField
                        defaultValue={capacity}
                        name="capacity"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiUsersBold className="text-[#22C55E]" />
                          Capacity
                        </Label>

                        <Input
                          placeholder="e.g., 22 Players"
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <TextField
                        defaultValue={available_slots}
                        name="available_slots"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiClockBold className="text-[#22C55E]" />
                          Available Slots
                        </Label>

                        <Input
                          placeholder="e.g., 8 AM - 10 PM"
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={description}
                        name="description"
                        isRequired
                      >
                        <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                          <PiNotePencilBold className="text-[#22C55E]" />
                          Description
                        </Label>

                        <TextArea
                          placeholder="Describe your sports facility..."
                          className="rounded-2xl bg-[#F8FAFC] border border-slate-200 min-h-36"
                        />

                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
                    <Button
                      type="button"
                      slot="close"
                      variant="danger"
                      className="bg-white text-[#EF4444] border-2 border-[#EF4444] text-sm rounded-xl w-full sm:w-auto"
                    >
                      <FaRegTrashAlt /> Cancel
                    </Button>
                    <Button
                      type="submit"
                      slot="close"
                      className="bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white rounded-xl px-8 py-6 text-base font-semibold shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      <LiaSaveSolid /> Save Changes
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
