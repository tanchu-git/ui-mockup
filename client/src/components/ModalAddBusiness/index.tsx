import Modal from "@/components/Modal";
import { useCreateBusinessMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import { getActiveUser } from "../Sidebar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAddBusiness = ({ isOpen, onClose }: Props) => {
  const [createBusiness, { isLoading }] = useCreateBusinessMutation();
  const [ownerId, setOwnerId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [coordinate, setCoordinate] = useState("");

  const handleSubmit = async () => {
    // Check for empty fields
    if (!businessName || !street || !postcode || !city)  return;

    await createBusiness({
        ownerId: getActiveUser(),
        name: businessName,
        street: street,
        postcode: parseInt(postcode.replace(" ", "")), 
        city: city,
        // Fix by importing from google maps
        placeId: "string",
    });
  };

  const isFormValid = () => {
    return businessName && street && postcode && city;
  };

  // Main styling to use
  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    // Use parent Modal component as base
    <Modal isOpen={isOpen} onClose={onClose} name="Add New Location">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          // Prevent refreshing page when adding and handle the submitted data
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="text"
            className={inputStyles}
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <input
            type="text"
            className={inputStyles}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          // Disable add button if data is invalid or loading
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Adding.." : "Add Location"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalAddBusiness;