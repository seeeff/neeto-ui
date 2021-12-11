import React from "react";
import Pane from "../../../components/Pane";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";

const AddMember = ({ isOpen, onClose, roleOptions = [] }) => {
  return (
    <Pane isOpen={isOpen} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add New Agent
        </Typography>
      </Pane.Header>
      <Pane.Body className="space-y-6">
        <div className="w-full">
          <Typography style="h4" component="h4" className="mb-2">
            Name
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <Input
              autoFocus
              size="small"
              required
              name="first_name"
              placeholder="First Name"
              data-cy="add-member-first-name-text-field"
            />
            <Input
              size="small"
              required
              name="last_name"
              placeholder="Last Name"
              ddata-cy="add-member-last-name-text-field"
            />
          </div>
        </div>
        <div className="w-full">
          <Typography style="h4" component="h4" className="mb-2">
            Email
          </Typography>
          <Input
            size="small"
            required
            name="email"
            placeholder="Email"
            data-cy="add-member-email-text-field"
          />
        </div>
        <div className="w-1/2">
          <Typography style="h4" component="h4" className="mb-2">
            Role
          </Typography>
          <Select
            size="small"
            name="role"
            placeholder="Select Role"
            data-cy="add-member-role-select"
            required
            options={roleOptions}
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
          // disabled={isSubmitting}
          // loading={isSubmitting}
          data-cy="add-member-submit-button"
          // onClick={() => {
          //   setSubmitted(true);
          //   handleSubmit();
          // }}
        />

        <Button
          // onClick={onCancel}
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
