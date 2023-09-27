class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.string :position
      t.boolean :day_off
      t.integer :start_time
      t.integer :off_time

      # t.timestamps
    end
  end
end
