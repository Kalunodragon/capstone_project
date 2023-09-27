class CreateBids < ActiveRecord::Migration[7.0]
  def change
    create_table :bids do |t|
      t.integer :choice_number
      t.integer :employee_id
      t.integer :schedule_id

      t.timestamps
    end
  end
end
