class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_processable
    before_action :auth

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
            body: "#{employee.first_name}, You did not bid enough lines on the bid. Please contact Admin for your schedule.",
            to: "+1" + employee.phone_number.to_s,
            from: ENV["TWILIO_NUMBER"],
        )
    end

    private

    def auth
        @current_employee = Employee.find_by(id: session[:employee_id])
        render json: { errors: "No authorization found, Please sign-in" }, status: :unauthorized unless @current_employee
    end

    def render_not_processable(item)
        render json: { errors: item.record.errors.full_messages }, status: :unprocessable_entity
    end

end
