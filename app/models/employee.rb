class Employee < ApplicationRecord
    has_secure_password

    has_many :bids
    has_many :schedules, through: :bids

    # removed :phone_number from uniqueness: true
    validates :email, uniqueness: true
    validates :first_name, :last_name, :department, :phone_number, :email, :station, :seniority_date, :date_of_birth, :password, presence: true
    validates_inclusion_of :admin, in: [true, false]

    def self.seniority_list
        Employee.all.sort_by { |a| [a.seniority_date, a.date_of_birth] }
    end
end
