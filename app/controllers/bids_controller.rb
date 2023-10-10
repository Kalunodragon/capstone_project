class BidsController < ApplicationController

  def create
    if(@current_employee)
      # currentTime = new Date(Date.now()).toJSON() from front
      if(params[:time_now].to_date > params[:bid_open].to_date && params[:time_now].to_date < params[:bid_close].to_date.end_of_day)
        dups_removed = params[:bids].uniq { |b| b[:schedule_id] }
        if(dups_removed.size != params[:bids].size)
          render json: { errors: "There is an issue with dupicates in your bid please fix and resubmit!" }, status: :unprocessable_entity
        else
          dups_removed.each do |b|
            @current_employee.bids.create!(choice_number: b[:choice_number], schedule_id: b[:schedule_id], awarded: false)
          end
          render json: @current_employee.bids, status: :created
        end
      else
        render json: { errors: "Out of time frame for Bid. Please try again while Bid is open." }, status: :unauthorized
      end
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def show

  end

  def update

  end

  def destroy

  end

  def award_bid
    if(@current_employee.admin)
      if(Date.today.to_fs > Schedule.first.bid_close.to_fs)
        Bid.execute_bid
        Employee.seniority_list.each do |e|
          if(e.bids.all.find_by(awarded:true))
              awarded_message(e)
          else
              not_enough_lines(e)
          end
        end
        render json: ["The bid has been executed, awards and not enough lines are going out now."], status: :ok
      else
        render json: { errors: "The bid has not yet closed. This bid closes #{Schedule.first.bid_close}" }, status: :forbidden
      end
    else
      render json: { errors: "You are not authorized to award the bid." }, status: :unauthorized
    end
  end

  private

  def awarded_message(employee)
    @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

    schedule_info = employee.bids.find_by(awarded:true).schedule
    shift_days = schedule_info.shift_info
    day_array = []
    shift_days.each do |d|
        if(d.day_off)
            day_array << "Off"
        else
            day_array << "#{d.position}: #{d.start_time}-#{d.off_time}"
        end
    end

    message_to_send = "#{employee.first_name}, Your schedule from #{schedule_info.start_date.to_fs(:long_ordinal)} to #{schedule_info.end_date.to_fs(:long_ordinal)} will be as follows: \nSunday: #{day_array[0]} \nMonday: #{day_array[1]} \nTuesday: #{day_array[2]} \nWednesday: #{day_array[3]} \nThursday: #{day_array[4]} \nFriday: #{day_array[5]} \nSaturday: #{day_array[6]}"

    message = @client.messages.create(
        body: message_to_send,
        to: "+1" + employee.phone_number.to_s,
        from: ENV["TWILIO_NUMBER"],
    )
end

def not_enough_lines(employee)
    @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

    message = @client.messages.create(
        body: "#{employee.first_name}, You did not bid enough lines on the bid. Admin will contact you shortly about your schedule.",
        to: "+1" + employee.phone_number.to_s,
        from: ENV["TWILIO_NUMBER"],
    )
end
  
end
