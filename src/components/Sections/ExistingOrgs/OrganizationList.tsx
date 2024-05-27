import React, { useEffect, useState } from "react";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { TExistingOrgProps, TOrg } from "@/types";

export default function OrganizationList(props: TExistingOrgProps) {
  const [appState] = useAtom(appAtom);
  const [reversedOrgs, setReversedOrgs] = useState<TOrg[]>([]);

  // Effect to reverse the organization list whenever it changes
  useEffect(() => {
    if (appState.allOrgs) {
      setReversedOrgs([...appState.allOrgs].reverse());
    }
  }, [appState.allOrgs]);

  return (
    <div className="w-1/2 py-2 text-white">
      {reversedOrgs.map((org: TOrg, index: number) => (
        <div
          className="w-full bg-[#24303F] my-2 py-3 flex rounded-lg px-5 justify-between"
          key={index}
        >
          <p className="text-lg text-white my-auto">{org.orgName}</p>
          <button
            className="bg-[#3d51e0] text-white py-2 px-4 rounded"
            onClick={() => props.setEnumState(org)}
          >
            Create License Certificate
          </button>
        </div>
      ))}
    </div>
  );
}
