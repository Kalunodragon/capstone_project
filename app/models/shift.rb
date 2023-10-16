class Shift < ApplicationRecord
    has_many :schedules

    validates :position, presence: true
    validates :start_time, :off_time, presence: true, allow_blank: true
    validates_inclusion_of :day_off, in: [true, false]

    # format: { with: /\A([0-1][0-9]|2[0-3]):([0-5][0-9])\z/, message:  "Please enter time in military time format" }
end
