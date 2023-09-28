class Employee < ApplicationRecord
    has_secure_password

    has_many :bids
    has_many :schedules
    has_many :shifts
end
