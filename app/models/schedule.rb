class Schedule < ApplicationRecord
    has_many :bids
    has_many :shifts

    validates :bid_open, :bid_close, :start_date, :end_date, presence: true
    validates :sunday_shift, :monday_shift, :tuesday_shift, :wednesday_shift, :thursday_shift, :friday_shift, :saturday_shift, :number_available, numericality: { only_numeric: true }, presence: true

    def shift_info
        week = []
        info = []
        week << self.sunday_shift
        week << self.monday_shift
        week << self.tuesday_shift
        week << self.wednesday_shift
        week << self.thursday_shift
        week << self.friday_shift
        week << self.saturday_shift

        week.each do |shift_id|
            info << Shift.find_by(id: shift_id)
        end
        info
    end
end
