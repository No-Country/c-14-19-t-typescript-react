import TransferencesAmongAccounts from "@/components/transferences/TransferencesAmongAccounts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'EasyBank - Transferencia entre cuentas'
};

const MyAccountTransferencesPage = (): React.ReactElement => {
  return (
    <div className="w-full h-screen">
      <TransferencesAmongAccounts />
    </div>
  );
};

export default MyAccountTransferencesPage;
