import TransferencesPage from "@/components/transferences/TransferencesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'EasyBank - Transferences'
}

const TransferencePanel = (): React.ReactElement => {
  return (
    <div className="w-full h-[90vh]">
      <TransferencesPage />
    </div>
  );
};

export default TransferencePanel;
