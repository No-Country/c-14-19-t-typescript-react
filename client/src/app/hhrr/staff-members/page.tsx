"use client";
import { StaffMember } from '@/components/staff/interfaces/staff.interface';
import { getStaffMembers } from '@/utils/staffMembersList';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const StaffMembersPage = (): React.ReactElement => {
    const router = useRouter();
    const [staffMember, setStaffMember] = useState<StaffMember[]>([]);
    const [staffNotFound, setStaffNotFound] = useState<boolean>(false);

    const getStaff = async () => {
        const getToken = sessionStorage.getItem('jwtSession')
        if (getToken) {
            const members = await getStaffMembers(getToken);
            if (members?.status === 401) setStaffNotFound(true);
            if (members?.status === 200) {
                setStaffMember(members.staffs);
                setStaffNotFound(false);
            }
        } else router.push('/');
    };

    useEffect(() => {
        getStaff();
        console.log(staffMember)
    }, []);
    

  return (
    <div>
        
    </div>
  )
}

export default StaffMembersPage