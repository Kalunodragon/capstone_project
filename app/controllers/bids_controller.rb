class BidsController < ApplicationController
  skip_before_action :auth, only: :test

  def create
    if(@current_employee)
      # currentTime = new Date(Date.now()).toJSON() from front
      if(check_times)
        if(bid_check)
          dups_removed = params[:bids].uniq { |b| b[:schedule_id] }
          if(dups_removed.size != params[:bids].size)
            render json: { errors: "There is an issue with dupicates in your bid please fix and resubmit!" }, status: :unprocessable_entity
          else
            dups_removed.each do |b|
              @current_employee.bids.create(choice_number: b[:choice_number], schedule_id: b[:schedule_id], awarded: false)
            end
            render json: @current_employee.bids.all, serializer: BidSerializer, status: :created
          end
        else
          render json: { errors: "Error - A bid has already been submitted for this bid" }, status: :forbidden
        end
      else
        render json: { errors: "Out of time frame for Bid. Please try again while Bid is open." }, status: :unauthorized
      end
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  # def index
  #   if(@current_employee)
  #     all_bids = @current_employee.bids.map{|b| b.schedule}
  #     render json: all_bids, each_serializer: ScheduleSerializer, status: :ok
  #   else
  #     render json: { errors: "Please login to preform this action!" }, status: :unauthorized
  #   end
  # end

  def index
    if(@current_employee)
      all_bids = @current_employee.bids.all
      render json: all_bids, each_serializer: BidSerializer, status: :ok
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def update
    if(@current_employee)
      if(check_times)
        line_to_update = @current_employee.bids.find_by(id: params[:bid_id])
        line_to_update.update(choice_number: params[:choice_number], schedule_id: params[:schedule_id])
        render json: line_to_update, serializer: BidSerializer, status: :ok
      else
        render json: { errors: "Sorry out of time frame to update this bid!" }, status: :forbidden
      end
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def destroy
    if(@current_employee)
      if(check_times)
        if(params[:all])
          params[:bids].each do |b|
            @current_employee.bids.find_by(id: b.id).destroy
          end
        else
          @current_employee.bids.find_by(id: params[:bid_id]).destroy
        end
        render json: @current_employee.bids.all, each_serializer: BidSerializer, status: :ok
      else
        render json: { errors: "Sorry out of timeframe to delete from this bid!" }, status: :forbidden
      end
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  # def award_bid
  #   if(@current_employee.admin)
  #     if(Date.today.to_fs > Schedule.first.bid_close.to_fs)
  #       Bid.execute_bid
  #       Employee.seniority_list.each do |e|
  #         if(e.bids.all.find_by(awarded:true))
  #             awarded_message(e)
  #         else
  #             not_enough_lines(e)
  #         end
  #       end
  #       render json: ["The bid has been executed, awards and not enough lines are going out now."], status: :ok
  #     else
  #       render json: { errors: "The bid has not yet closed. This bid closes #{Schedule.first.bid_close}" }, status: :forbidden
  #     end
  #   else
  #     render json: { errors: "You are not authorized to award the bid." }, status: :unauthorized
  #   end
  # end

  def award_bid
    if(@current_employee.admin)
      if(check_if_awarded(start: params[:start_date],close: params[:bid_close]))
        param_date_formatted = Date.parse(params[:bid_close]).to_fs
        if(Date.today.to_fs > param_date_formatted)
          Employee.seniority_list.each do |employee|
            if(!employee.admin)
              # Fuigure out how to check all bids based on association of schedule.bid_close
              current_bids = employee.bids.all.select { |bid| bid.schedule.bid_close.to_fs == param_date_formatted}
              check = current_bids.detect do |bid|
                if(bid.schedule.number_available > 0)
                  current = bid.schedule.number_available
                  bid.schedule.update(number_available: current - 1)
                  bid.update(awarded: true)

                  # Removed twilio method due to trial exhaustion
                  p "#{employee.first_name} #{employee.last_name} ------------- SUCCESS THIS BID WAS AWARDED"
                  # awarded_message(employee)
                end unless current_bids == nil
              end
              if(check == nil)
                
                p "#{employee.first_name} Gat not enough lines"
                # not_enough_lines(employee)
              end
            end
          end
          render json: { success: "Bid has been executed, messages have ben sent out!" }, status: :ok
        else
          render json: { errors: "This bid has not yet closed, please try again after the closing date." }, status: :forbidden
        end
      else
        render json: { errors: "This bid has already been awarded, Schedules can not be awarded more than once!" }, status: :forbidden
      end
    else
      render json: { errors: "Only and Admin can preform this action!" }, status: :unauthorized
    end
  end

  private

  def check_times
    params[:time_now].to_date > params[:bid_open].to_date && params[:time_now].to_date < params[:bid_close].to_date.end_of_day
  end

  def bid_check
    check = @current_employee.bids.find { |bid| bid.schedule.bid_open.to_date == params[:bid_open].to_date && bid.schedule.bid_close.to_date == params[:bid_close].to_date}
    check ? false : true
  end

  def check_if_awarded (start:, close:)
    all_schedules_for_current_bid = Schedule.all.where(start_date: Date.parse(start), bid_close: Date.parse(close))
    search = all_schedules_for_current_bid.all.detect { |schedule| schedule.bids.find_by(awarded:true) }
    search ? false : true
  end

  def awarded_message(employee)
    @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

    schedule_info = employee.bids.all.where(awarded:true).last.schedule
    shift_days = schedule_info.shift_info
    day_array = []
    shift_days.each do |d|
        if(d.day_off)
            day_array << "Off"
        else
            day_array << "#{d.position}: #{Time.at(d.start_time).strftime("%R")}-#{Time.at(d.off_time).strftime("%R")}"
        end
    end

    message_to_send = "#{employee.first_name}, Your schedule from #{schedule_info.start_date.to_fs(:long_ordinal)} to #{schedule_info.end_date.to_fs(:long_ordinal)} will be as follows: \n\nSunday: #{day_array[0]} \nMonday: #{day_array[1]} \nTuesday: #{day_array[2]} \nWednesday: #{day_array[3]} \nThursday: #{day_array[4]} \nFriday: #{day_array[5]} \nSaturday: #{day_array[6]}"

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
