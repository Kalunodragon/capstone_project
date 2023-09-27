class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.date :bid_open
      t.date :bid_close
      t.date :start_date
      t.date :end_date
      t.integer :sunday_shift
      t.integer :monday_shift
      t.integer :tuesday_shift
      t.integer :wednesday_shift
      t.integer :thursday_shift
      t.integer :friday_shift
      t.integer :saturday_shift
      t.integer :number_available

      t.timestamps
    end
  end
end
