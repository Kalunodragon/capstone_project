class Schedule < ApplicationRecord
    has_many :bids
    has_many :shifts

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
