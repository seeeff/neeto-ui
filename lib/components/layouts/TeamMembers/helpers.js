import React from "react";
import { sortWith, descend, prop } from "ramda";
import { MenuHorizontal } from "@bigbinary/neeto-icons";
import classnames from "classnames";

import Avatar from "../../Avatar";
import Dropdown from "../../Dropdown";
import Typography from "../../Typography";

import { MEMBER_FILTER } from "../../../constants/teamMembers";

export const getFilteredMembers = (teamMembers, filterValue, searchTerm) => {
  let filterMembers = [];
  switch (filterValue) {
    case MEMBER_FILTER.ACTIVE.value:
      filterMembers = teamMembers.filter((member) => member.active);
      break;
    case MEMBER_FILTER.INACTIVE.value:
      filterMembers = teamMembers.filter((member) => !member.active);
      break;
    default:
      filterMembers = sortWith([descend(prop("active"))])(teamMembers);
  }
  if (searchTerm)
    filterMembers = filterMembers.filter((members) =>
      (members.first_name + members.last_name).includes(searchTerm)
    );
  return filterMembers;
};

export const getMemberFilterCounts = (teamMembers) => {
  const allCount = teamMembers.length;
  const activeCount = teamMembers.filter((member) => member.active).length;
  return {
    [MEMBER_FILTER.ALL.value]: allCount,
    [MEMBER_FILTER.ACTIVE.value]: activeCount,
    [MEMBER_FILTER.INACTIVE.value]: allCount - activeCount,
  };
};

export const getColumnData = (additonalColumns, handleUpdateStatus) => {
  return [
    {
      title: "Name",
      key: "name",
      render: (_, { first_name, last_name, profile_image_url }) => {
        const name = `${first_name} ${last_name}`;
        return (
          <div className="flex flex-row items-center">
            <Avatar
              user={{ name, imageUrl: profile_image_url }}
              size="medium"
              className="mr-2"
            />
            {name}
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "organization_role",
    },
    ...additonalColumns,
    {
      key: "icon_button",
      render: (_, { first_name, last_name, id, active }) => {
        const name = `${first_name} ${last_name}`;
        return (
          <Dropdown icon={MenuHorizontal} buttonStyle="text" strategy="fixed">
            <li onClick={() => handleUpdateStatus({ id, name }, active)}>
              <Typography
                style="body2"
                className={classnames({ "neeto-ui-text-error": active })}
              >
                {active ? "Deactivate" : "Activate"}
              </Typography>
            </li>
          </Dropdown>
        );
      },
    },
  ];
};
