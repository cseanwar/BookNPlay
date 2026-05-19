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
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";

const AddFacility = () => {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden px-4 sm:px-6 md:px-10 lg:px-16 xl:max-w-7xl xl:mx-auto py-10 md:py-16 lg:py-20">
      <h1 className="text-[#0C0B0B] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold pb-6 md:pb-10 wrap-break-word">
        Add a New Facility
      </h1>

      {/* Replace Card with plain div to avoid HeroUI fixed widths */}
      <div className="w-full border border-gray-200 shadow-sm overflow-hidden">
        <form
          className="p-5 sm:p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 w-full"
          style={{ width: "100%" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* Facility Name */}
            <div className="col-span-1 w-full">
              <TextField
                name="facilityName"
                isRequired
                style={{ width: "100%" }}
              >
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Facility Name
                </Label>
                <Input
                  placeholder="e.g., Lords cricket ground"
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>

            {/* Facility Type */}
            <div className="col-span-1 w-full">
              <Select
                name="facilityType"
                isRequired
                style={{ width: "100%" }}
                placeholder="Select a facility"
              >
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Facility Type
                </Label>
                <Select.Trigger
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                >
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Beach" textValue="Beach">
                      Football
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Mountain" textValue="Mountain">
                      cricket
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="City" textValue="City">
                      Badminton
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Adventure" textValue="Adventure">
                      Swimming
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Cultural" textValue="Cultural">
                      Tennis
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Luxury" textValue="Luxury">
                      Table Tennis
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Image URL */}
            <div className="col-span-1 md:col-span-2 w-full">
              <TextField name="imageUrl" isRequired style={{ width: "100%" }}>
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="e.g., https://example.com/image.jpg"
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>

            {/* Location */}
            <div className="col-span-1 w-full">
              <TextField name="location" isRequired style={{ width: "100%" }}>
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Location
                </Label>
                <Input
                  placeholder="e.g., Motijheel, Dhaka"
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>

            {/* Price per hour */}
            <div className="col-span-1 w-full">
              <TextField
                name="price"
                type="number"
                isRequired
                style={{ width: "100%" }}
              >
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Price per hour(BDT)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 299"
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>

            {/* Capacity */}
            <div className="col-span-1 w-full">
              <TextField name="capacity" isRequired style={{ width: "100%" }}>
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Capacity
                </Label>
                <Input
                  placeholder="e.g., 22"
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>

            {/* Available time slots */}
            <div className="col-span-1 w-full">
              <TextField
                name="availableTimeSlots"
                type="date"
                isRequired
                style={{ width: "100%" }}
              >
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium uppercase">
                  Available Time Slots
                </Label>
                <Input
                  placeholder="e.g., 8:00 PM - 9:00 PM"
                  type="date"
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2 w-full">
              <TextField
                name="description"
                isRequired
                style={{ width: "100%" }}
              >
                <Label className="text-[#0C0B0B] text-base md:text-lg font-medium">
                  Description
                </Label>
                <TextArea
                  placeholder="Describe the travel experience..."
                  className="bg-[#F8FAFC] text-[#6C696D] rounded-sm min-h-32"
                  style={{ width: "100%", minWidth: "0" }}
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="danger"
              className="bg-white text-[#EF4444] border-2 border-[#EF4444] text-sm rounded-xl font-medium"
            >
              <FaRegTrashAlt /> Cancel
            </Button>
            <Button
              type="submit"
              className="bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:scale-105"
            >
              <LiaSaveSolid /> Add Facility
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacility;
