class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :last_name
      t.string :department
      t.integer :phone_number
      t.string :email
      t.string :station
      t.date :seniority_date
      t.date :date_of_birth
      t.boolean :admin
      
      # t.timestamps
    end
  end
end
