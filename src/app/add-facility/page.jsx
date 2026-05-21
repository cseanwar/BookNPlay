"use client";

import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

import { FaRegTrashAlt } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";

import {
  PiImageBold,
  PiMapPinBold,
  PiCurrencyCircleDollarBold,
  PiUsersBold,
  PiClockBold,
  PiNotePencilBold,
  PiBuildingsBold,
} from "react-icons/pi";

import { TbCategory } from "react-icons/tb";
import { useRouter } from "next/navigation";

const AddFacility = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const facility = {
      ...Object.fromEntries(formData.entries()),
      ownerEmail: session?.user?.email,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(facility),
    });

    const data = await res.json();

    if (data.insertedId) {
      router.push("/facilities");
    }
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const facility = {
  //     ...Object.fromEntries(formData.entries()),
  //     ownerEmail: session?.user?.email,
  //   };

  //   console.log(facility);

  //   const res = await fetch("http://localhost:5000/facilities", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(facility),
  //   });

  //   const data = await res.json();

  //   if (data.insertedId) {
  //         toast.success("You have added a facility successfully!");
  //       router.push("/facilities");
  //   }

  //   console.log(data);
  // };

  return (
    <section className="bg-[#F8FAFC] min-h-screen py-16 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 text-[#16A34A] px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <PiBuildingsBold className="text-lg" />
            Add New Sports Facility
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight">
            Create Your Facility
          </h1>

          <p className="mt-5 text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed">
            Add your sports venue and let players discover and book it easily
            through BookNPlay.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Gradient */}
          <div className="h-2 bg-linear-to-r from-[#22C55E] to-[#16A34A]" />

          <form onSubmit={onSubmit} className="p-6 md:p-10 lg:p-12">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Facility Name */}
              <div>
                <TextField name="facilityName" isRequired>
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

                      <ListBox.Item id="Basketball" textValue="Basketball">
                        Basketball
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired>
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
                <TextField name="location" isRequired>
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

              {/* Owner Email Auto Fill */}
              <div>
                <TextField>
                  <Label className="text-[#0F172A] font-semibold mb-1 flex items-center gap-2">
                    <PiUsersBold className="text-[#22C55E]" />
                    Owner Email
                  </Label>

                  <Input
                    value={session?.user?.email || ""}
                    isReadOnly
                    className="rounded-2xl bg-[#F1F5F9] border border-slate-200"
                  />
                </TextField>
              </div>

              {/* Price */}
              <div>
                <TextField name="price_per_hour" isRequired>
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
                <TextField name="capacity" isRequired>
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
                <TextField name="available_slots" isRequired>
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
                <TextField name="description" isRequired>
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
                className="border border-red-400 bg-white text-red-500 hover:bg-red-50 rounded-xl px-6 py-6 text-base font-semibold"
              >
                <FaRegTrashAlt />
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white rounded-xl px-8 py-6 text-base font-semibold shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <LiaSaveSolid className="text-xl" />
                Add Facility
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFacility;
