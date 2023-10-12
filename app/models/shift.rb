class Shift < ApplicationRecord
    has_many :schedules, dependent: :destroy

    validates :position, :start_time, :off_time, presence: true
    validates_inclusion_of :day_off, in: [true, false]

end
