"use client";
import { UserAccount } from "@/context/interfaces/store.interfaces";
import { useGlobalContext } from "@/hooks/useContext";
import { getCustomerSession } from "@/utils/getJwtSession";
import {
  getCustomerAccounts,
  transferBetweenAccounts,
} from "@/utils/transferences";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AccountsTransferData,
  TransferBetweenAccountsFields,
  UserAccounts,
  UserAccountsError,
} from "./interfaces/transferences.interface";
import LabelsForm from "../labels/LabelsForm";
import * as Yup from "yup";
import SubmitButton from "../buttons/SubmitButton";
import SpanError from "../errors/SpanError";
import MessageAuthorization from "../authorization/MessageAuthorization";
import Loader from "../Loader";

const INITIAL_VALUES = {
  from: "",
  to: "",
  amount: "",
};

const TransferencesAmongAccounts = (): React.ReactElement => {
  const router = useRouter();
  const {
    userInfo,
    isClicked,
    errorMessage,
    isLoading,
    setIsLoading,
    setErrorMessage,
    setIsClicked,
    setUserInfo,
    setTransference,
  } = useGlobalContext();
  const [accounts, setAccounts] = useState<UserAccounts[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const getSession = sessionStorage.getItem("customerJwtSession");
      const user = await getCustomerSession(getSession);

      if (!getSession) router.push("/");

      setUserInfo(user);

      // Llamar a getAccounts una vez que userInfo se haya actualizado
      if (user) {
        getAccounts(user);
      }
    };

    const getAccounts = async (userInfo: UserAccount) => {
      const userID = userInfo.hbAccount.user.id;
      const token = userInfo.jwt;

      const accounts = await getCustomerAccounts(userID, token);
      if (accounts !== undefined) setAccounts(accounts), setIsLoading(false);
    };

    getUser();
  }, []);

  const getSelectValues = accounts.map(
    (value) => `${value.number_account} ($${value.money})`
  );

  const validationSchema = Yup.object().shape({
    from: Yup.string()
      .required("Campo requerido.")
      .oneOf(getSelectValues, "Seleccione una opción válida."),
    to: Yup.string()
      .required("Campo requerido")
      .oneOf(getSelectValues, "Seleccione una opción válida.")
      .test(
        "not-same",
        "No se puede transferir a una misma cuenta.",
        function (value) {
          if (this.parent.from !== undefined && this.parent.from === value)
            return false; // No válido si son iguales
          return true;
        }
      ),
    amount: Yup.string()
      .matches(/^[0-9]+$/, "Inserte un monto válido.")
      .test("minimum-amount", "Monto mínimo $1,000.", (value) => {
        if (value === undefined) return false; // Si el valor es undefined, no cumple con el monto minimo.

        const numericValue = parseInt(value, 10);
        return numericValue >= 1000;
      })
      .required("Campo requerido."),
  });

  const validateFields = async (values: TransferBetweenAccountsFields) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: UserAccountsError = {};

      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
  };

  const handleSubmit = async (
    values: TransferBetweenAccountsFields,
    { setFieldValue }: FormikHelpers<TransferBetweenAccountsFields>
  ) => {
    const { from, to, amount } = values;
    setIsClicked(true);

    const pattern = /\(\$\d+\.\d+\)/; // Patron para eliminar el ($0.00) y mandar la peticion

    const request: AccountsTransferData = {
      sender_number_account: from.replace(pattern, "").trim(),
      receiver_number_account: to.replace(pattern, "").trim(),
      amount: parseInt(amount),
    };

    const makeTransfer = await transferBetweenAccounts(request, userInfo.jwt);

    if (makeTransfer?.status === 400 || makeTransfer?.status === 401) {
      setIsClicked(false);
      setErrorMessage(makeTransfer.error);
      setTimeout(() => {
        setErrorMessage("");
        setFieldValue("amount", "");
      }, 3000);
    }

    if (makeTransfer?.status === 201) {
      setIsClicked(false);
      setTransference(request);
      router.push("/customer/homebanking/transference-panel/success-transfer");
    }
  };

  return (
    <div className="w-full h-full bg-[#e7e7d9]">
      {!isLoading ? (
        <div className="flex flex-col justify-center items-center h-full p-4">
          <h1 className="text-lg font-bold text-center tablet:text-2xl desktop:text-4xl overflow-hidden">
            Selecciona las cuentas y el monto a{" "}
            <span className="text-[#FF5722]">transferir</span>
          </h1>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            validate={validateFields}
          >
            <Form className="flex flex-col mt-6 w-full tablet:justify-center tablet:items-center tablet:w-[80%]">
              <div className="w-[70%] tablet:mt-5 desktop:w-[50%]">
                <LabelsForm htmlFor="desde" />
              </div>
              <Field
                as="select"
                name="from"
                className="bg-[#d3dacccf] rounded p-2 outline-none text-sm tablet:w-[70%] tablet:text-base desktop:w-[50%] desktop:text-lg"
              >
                <option>Seleccione una cuenta</option>
                {accounts.map((values) => (
                  <option key={values.number_account}>
                    {values.number_account} (${values.money})
                  </option>
                ))}
              </Field>
              <div className="w-[70%] desktop:w-[50%]">
                <SpanError prop="from" />
              </div>

              <div className="w-[70%] tablet:mt-5 desktop:w-[50%]">
                <LabelsForm htmlFor="para" />
              </div>
              <Field
                as="select"
                name="to"
                className="bg-[#d3dacccf] rounded p-2 outline-none text-sm tablet:w-[70%] tablet:text-base desktop:w-[50%] desktop:text-lg"
              >
                <option>Seleccione una cuenta</option>
                {accounts.map((values) => (
                  <option key={values.number_account}>
                    {values.number_account} (${values.money})
                  </option>
                ))}
              </Field>
              <div className="w-[70%] desktop:w-[50%]">
                <SpanError prop="to" />
              </div>

              <div className="w-[70%] tablet:mt-5 desktop:w-[50%]">
                <LabelsForm htmlFor="monto" />
              </div>
              <Field
                type="text"
                name="amount"
                className="bg-[#d3dacccf] rounded p-2 outline-none text-sm tablet:w-[70%] tablet:text-base desktop:w-[50%] desktop:text-lg"
                placeholder="$"
              />
              <div className="w-[70%] desktop:w-[50%]">
                <SpanError prop="amount" />
              </div>

              <div className="flex flex-col tablet:flex-row tablet:items-end justify-center gap-[50px] w-full mt-10">
                <SubmitButton
                  value={isClicked ? "Enviando transferencia..." : "Transferir"}
                />
              </div>
            </Form>
          </Formik>
          <div className="mt-10">
            {errorMessage && <MessageAuthorization message={errorMessage} />}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default TransferencesAmongAccounts;
