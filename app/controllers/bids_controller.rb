class BidsController < ApplicationController

  def award_bid
    # if(@current_employee.admin)
      # if(Date.now.to_fs > Schedule.first.bid_close.to_fs)
        Bid.execute_bid
        Employee.seniority_list.each do |e|
          if(e.bids.all.find_by(awarded:true))
              awarded_message(e)
          else
              not_enough_lines(e)
          end
        # end
        # render json: ["The bid has been executed, awards and not enough lines are going out now."], status: :ok
      # else
        # render json: { errors: "The bid has not yet closed. This bid closes #{Schedule.first.bid_close}" }, status: :forbidden
      # end
    else
      render json: { errors: "You are not authorized to award the bid." }, status: :unauthorized
    end
  end
  
end
