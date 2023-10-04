class AddAwardedToBid < ActiveRecord::Migration[7.0]
  def change
    add_column :bids, :awarded, :boolean
  end
end
