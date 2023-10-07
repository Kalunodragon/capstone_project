class Bid < ApplicationRecord
    belongs_to :employee
    belongs_to :schedule

    validates :choice_number, :employee_id, :schedule_id, presence: true
    validates_inclusion_of :awarded, in: [true, false]

    # future add - takes a parameter (schedule.bid_open or schedule.bid_close)
        # use this parameter to check e.bids.where(schedule.bid_open == parameter)
    def self.execute_bid
        @not_enough_lines = []
        Employee.seniority_list.each do |e|
            check = e.bids.detect do |b|
                if(b.schedule.number_available > 0)
                    current = b.schedule.number_available
                    b.schedule.update(number_available: current - 1)
                    b.update(awarded:true)
                end
            end
            if(check == nil)
                @not_enough_lines << e
            end
        end
    end

    # Checks :number_available
    # Employee.seniority_list.each { |e| e.bids.find { |s| p s.schedule.number_available > 0} }

end


# Create SMS send from this file and see if the ENV variables can be accessed from here