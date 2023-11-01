"use client";
import Loader from "@/components/Loader";
import { StaffMember } from "@/components/staff/interfaces/staff.interface";
import { useGlobalContext } from "@/hooks/useContext";
import { getSession } from "@/utils/getJwtSession";
import { getStaffMembers } from "@/utils/staffMembersList";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StaffMembersPage = (): React.ReactElement => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useGlobalContext();
  const [staffMember, setStaffMember] = useState<StaffMember[]>([]);
  const [staffNotFound, setStaffNotFound] = useState<boolean>(false);

  const getStaff = async () => {
    setIsLoading(true);
    const getSessionToken = sessionStorage.getItem("jwtSession");
    if (getSessionToken) {
      const token = await getSession(getSessionToken);
      const members = await getStaffMembers(token.jwt);
      if (members?.status === 401) setStaffNotFound(true);
      if (members?.status === 200) {
        setStaffMember(members.staffs);
        setStaffNotFound(false);
        setIsLoading(false);
      }
    } else router.push("/");
  };

  useEffect(() => {
    getStaff();
  }, []);

  // Filtrar los miembros del personal por departamento "Attention"
  const attentionStaff = staffMember.filter((item) => item.department === "attention");

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full">
          {staffNotFound ? (
            <div className="flex justify-center items-center h-[90vh]">
              <p className="text-2xl font-thin tablet:text-4xl overflow-hidden ">
                No se encontro personal...
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-10 p-5 tablet:p-10 bg-[#e7e7d9]">
              {attentionStaff.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#e7e7d9] w-full tablet:w-[50%] desktop:w-[40%] p-5 rounded shadow-[#00796B] shadow-sm"
                >
                  <p>
                    <span className="font-bold text-sm tablet:text-lg desktop:text-2xl">
                      Usuario:
                    </span>{" "}
                    <span className="tablet: text-lg desktop:text-2xl capitalize">
                      {item.username}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-sm tablet:text-lg desktop:text-2xl">
                      Nombre:
                    </span>{" "}
                    <span className="tablet: text-lg desktop:text-2xl capitalize">
                      {item.user.name}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-sm tablet:text-lg desktop:text-2xl">
                      Apellido:
                    </span>{" "}
                    <span className="tablet: text-lg desktop:text-2xl capitalize">
                      {item.user.lastname}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-sm tablet:text-lg desktop:text-2xl">
                      Email:
                    </span>{" "}
                    <span className="tablet: text-lg desktop:text-2xl">
                      {item.user.mail}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-sm tablet:text-lg desktop:text-2xl">
                      Departamento:
                    </span>{" "}
                    <span className="tablet:text-lg desktop:text-2xl uppercase font-semibold text-[#FF5722]">
                      {item.department}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StaffMembersPage;
