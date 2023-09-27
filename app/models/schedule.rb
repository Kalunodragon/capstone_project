class Schedule < ApplicationRecord
    has_many :bids
    has_many :shifts
end
