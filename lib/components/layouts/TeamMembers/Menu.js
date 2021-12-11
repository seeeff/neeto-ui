import React from "react";
import MenuBar from "../MenuBar";

import {
  AGENT_FILTERS,
  AGENT_FILTER_VALUES,
} from "../../../constants/teamMembers";

const Menu = ({
  showMenu,
  selectedMemberStatusFilter,
  setSelectedMemberStatusFilter,
}) => {
  return (
    <MenuBar showMenu={showMenu} title="Agents">
      {AGENT_FILTERS.map((option) => (
        <MenuBar.Block
          count={
            AGENT_FILTER_VALUES.includes(option.value) &&
            !(AGENT_FILTER_VALUES.length === AGENT_FILTERS.length) &&
            100
          }
          key={option.value}
          label={option.label}
          active={
            AGENT_FILTER_VALUES.includes(selectedMemberStatusFilter) &&
            option.value === selectedMemberStatusFilter
          }
          onClick={() => setSelectedMemberStatusFilter(option.value)}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
