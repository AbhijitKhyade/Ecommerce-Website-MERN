import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue, inputName }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-focus-outline"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>

        <div className="text-right">
          <button type="submit" className="btn btn-outline-primary ">
            {inputName}
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;