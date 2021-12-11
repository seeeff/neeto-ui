import React, { useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { find, propEq } from "ramda";

import MenuBar from "./Menu";
import AddMember from "./AddMember";
import Container from "../Container";
import Scrollable from "../Scrollable";
import Header from "../Header";
import SubHeader from "../SubHeader";

import Table from "../../Table";
import Button from "../../Button";
import Input from "../../Input";
import Avatar from "../../Avatar";

import { SAMPLE_DATA, ROLE_OPTIONS } from "./constants";
import { AGENT_FILTER_VALUES } from "../../../constants/teamMembers";

const TeamMembers = ({ roleOptions = ROLE_OPTIONS, tableProps }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [selectedMemberStatusFilter, setSelectedMemberStatusFilter] = useState(
    AGENT_FILTER_VALUES[0]
  );

  const columnData = [
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
      key: "role",
      render: (role) => {
        const selectedRole = find(propEq("value", role), roleOptions);
        return selectedRole?.label;
      },
    },
  ];

  const HeaderActionBlock = () => {
    return (
      <>
        <Input
          // ref={searchRef}
          type="search"
          placeholder="Search Agents"
          prefix={<Search size={20} />}
          className="mr-3 w-80"
          // value={searchTerm}
          // onChange={(e) => {
          //   setSearchTerm(e.target.value);
          // }}
          // clear={() => setSearchTerm("")}
        />
        <Button
          icon={Plus}
          size="large"
          // disabled={loading}
          label="Add New Agent"
          onClick={() => setIsPaneOpen(true)}
        />
      </>
    );
  };

  return (
    <div className="flex">
      <MenuBar
        showMenu={isMenuOpen}
        selectedMemberStatusFilter={selectedMemberStatusFilter}
        setSelectedMemberStatusFilter={setSelectedMemberStatusFilter}
      />
      <Container>
        <Header
          title="All Agents"
          menuBarToggle={() => setIsMenuOpen(!isMenuOpen)}
          actionBlock={<HeaderActionBlock />}
        />
        <SubHeader
          deleteButtonProps={{
            count: 0,
            selectedIDs: [],
            onClick: () => {},
          }}
        />
        <Scrollable className="w-full">
          <Table
            fixedHeight
            columnData={columnData}
            rowData={SAMPLE_DATA}
            defaultPageSize={10}
            // currentPageNumber={pageNumber}
            // handlePageChange={(page) => setPageNumber(page)}

            {...tableProps}
          />
        </Scrollable>
      </Container>

      <AddMember
        isOpen={isPaneOpen}
        onClose={() => setIsPaneOpen(false)}
        roleOptions={roleOptions}
      />
    </div>
  );
};

export default TeamMembers;
