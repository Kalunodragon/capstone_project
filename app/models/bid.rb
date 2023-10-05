class Bid < ApplicationRecord
    belongs_to :employee
    belongs_to :schedule

    validates :choice_number, :employee_id, :schedule_id, presence: true
    validates_inclusion_of :awarded, in: [true, false]

    def self.execute_bid
        # pull seniority list
        # check EACH employees BID
            # go through EACH BID in order
            # FIND first BID that has a :number_available that is > 0
                # once that bid is found update that Bid using the Bid.id to change :awarded to true
                # After all bids are awarded message each employee who got a bid their bid
                # Any employee who didnt get an awarded bid gets a message saying that they got Not Enough Lines
        Employee.seniority_list.each do |e| 
            e.bids.find do |s|
                bid_awarded = false
                award = s.schedule.number_available > 0
                if(award && bid_awarded == false)
                    bid_awarded = true
                    p award
                    # award.update(awarded: true)
                end
            end
            # p Employee.seniority_list.each { |e| e.bids.find_by(awarded: true) }
        end
    end

    # Checks :number_available
    # Employee.seniority_list.each { |e| e.bids.find { |s| p s.schedule.number_available > 0} }

end
