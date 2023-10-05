class Bid < ApplicationRecord
    belongs_to :employee
    belongs_to :schedule

    validates :choice_number, :employee_id, :schedule_id, presence: true
    validates_inclusion_of :awarded, in: [true, false]

    def self.execute_bid
        Employee.seniority_list.each do |e|
            check = e.bids.detect do |b|
                if(b.schedule.number_available > 0)
                    current = b.schedule.number_available
                    b.schedule.update(number_available: current - 1)
                    b.update(awarded:true)
                end
            end
            if(check == nil)
                p "Not enough bidded lines!"
            end
        end
        # p Bid.all.where(awarded:true)
    end

    # Checks :number_available
    # Employee.seniority_list.each { |e| e.bids.find { |s| p s.schedule.number_available > 0} }

end
