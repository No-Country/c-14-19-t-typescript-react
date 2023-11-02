import TransferDetails from "@/components/transferences/TransferDetails";
import { Metadata } from "next";
import React  from "react";

export const metadata: Metadata = {
  title: 'Detalles de la transferencia'
};

const SuccessTransfer = (): React.ReactElement => {
  return (
    <div className="w-full h-[90vh] flex justify-center">
      <TransferDetails />
    </div>
  );
};

export default SuccessTransfer;
