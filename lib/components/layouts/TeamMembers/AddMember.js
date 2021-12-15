import React, { useState } from "react";
import { Formik } from "formik";

import { post } from "./apis";

import Pane from "../../../components/Pane";
import Input from "../../../components/formik/Input";
import Select from "../../../components/formik/Select";
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
  const [initialValues, setInitialValues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setEmail("");
    setSelectedRole(null);
  };

  const handleAddMember = async () => {
    try {
      setIsLoading(true);
      const payload = {
        user: {
          first_name: "-",
          last_name: "-",
          email,
          organization_role: selectedRole?.value,
        },
      };
      await post(addMemberEndpoint, payload);
      fetchTeamMembers();
      handleClose();
      Toastr.success(`Added ${metaName} successfully`);
    } catch (err) {
      console.log(err);
      Toastr.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={ADD_USER_VALIDATION_SCHEMA}
      validateOnChange={submitted}
      validateOnBlur={submitted}
    >
      {({ isSubmitting, handleSubmit }) => (
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
      )}
    </Formik>
  );
};

export default AddMember;
