import React from "react";

import SidebarAdmin from "../components/SidebarAdmin/SidebarAdmin";
import FormCreateTemplate from "../components/FormCreateTemplate/FormCreateTemplate";
function Funnel() {
  const styleForm = {};

  return (
    <SidebarAdmin>
      <FormCreateTemplate style={styleForm} />
    </SidebarAdmin>
  );
}

export default Funnel;
