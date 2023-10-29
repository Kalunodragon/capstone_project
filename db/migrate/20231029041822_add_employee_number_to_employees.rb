class AddEmployeeNumberToEmployees < ActiveRecord::Migration[7.0]
  def change
    add_column :employees, :employee_number, :string
  end
end
