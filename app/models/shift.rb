class Shift < ApplicationRecord
    has_many :schedules

    validates :position, presence: true
    validates :start_time, :off_time, presence: true, allow_blank: true
    validates_inclusion_of :day_off, in: [true, false]

end
