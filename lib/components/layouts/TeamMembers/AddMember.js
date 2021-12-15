import React, { useState } from "react";

import { post } from "./apis";
import { isEmpty } from "ramda";

import Pane from "../../../components/Pane";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";
import Toastr from "../../../components/Toastr";

const AddMember = ({
  metaName,
  isOpen,
  onClose,
  roles = [],
  addMemberEndpoint,
  fetchTeamMembers,
}) => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    onClose();
    setEmail("");
    setSelectedRole(null);
  };

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!selectedRole?.value) {
      errors.role = "Please select a role";
    }
    setErrors(errors);
    return errors;
  };

  const handleAddMember = async () => {
    const error = validateForm();
    if (!isEmpty(error)) return;

    try {
      setIsLoading(true);
      const payload = {
        user: {
          first_name: "---",
          last_name: "---",
          email,
          organization_role: selectedRole?.value,
        },
      };
      await post(addMemberEndpoint, payload);
      fetchTeamMembers();
      handleClose();
      Toastr.success(`Added ${metaName} successfully`);
    } catch (err) {
      Toastr.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pane isOpen={isOpen} onClose={handleClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New {metaName}
        </Typography>
      </Pane.Header>
      <Pane.Body className="space-y-6">
        <div className="w-full">
          <Typography style="h4" component="h4" className="mb-2">
            Email
          </Typography>
          <Input
            required
            size="small"
            name="email"
            placeholder="Email"
            data-cy="add-member-email-text-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            onBlur={validateForm}
          />
        </div>
        <div className="w-1/2">
          <Typography style="h4" component="h4" className="mb-2">
            Role
          </Typography>
          <Select
            required
            size="small"
            name="role"
            placeholder="Select Role"
            value={selectedRole}
            options={roles.map((role) => ({ label: role, value: role }))}
            onChange={(role) => setSelectedRole(role)}
            data-cy="add-member-role-select"
            error={errors.role}
            onBlur={validateForm}
          />
        </div>
      </Pane.Body>

      <Pane.Footer>
        <Button
          type="submit"
          label="Submit"
          size="large"
          style="primary"
          className="mr-3"
          disabled={isLoading}
          loading={isLoading}
          data-cy="add-member-submit-button"
          onClick={handleAddMember}
        />

        <Button
          onClick={handleClose}
          label="Cancel"
          size="large"
          style="text"
          data-cy="add-member-cancel-button"
        />
      </Pane.Footer>
    </Pane>
  );
};

export default AddMember;
