import Modal from "@/components/Modal";
import { useCreateBusinessMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createBusiness, { isLoading }] = useCreateBusinessMutation();
  const [ownerId, setOwnerId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [coordinate, setCoordinate] = useState("");

  const handleSubmit = async () => {
    // Check for empty fields
    if (!ownerId || !businessName || !street || !postcode || !city)  return;

    // start here!!!!!!
    await createBusiness({
        id: 1,
        ownerId: 1,
        name: "string",
        street: "string",
        postcode: "string",
        city: "string",
        coordinate: "string",
    });
  };

  const isFormValid = () => {
    return ownerId && businessName && street && postcode && city;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
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
            type="number"
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
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;