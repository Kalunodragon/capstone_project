class ApplicationController < ActionController::API
    include ActionController::Cookies
    require "twilio-ruby"
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_processable
    before_action :auth

    @Account_SID = ENV["ACCOUNT_SID"]
    @Auth_TOKEN = ENV["AUTH_TOKEN"]
    @Twilio_NUMBER = ENV["TWILIO_NUMBER"]

    @client = Twilio::REST::Client.new @Account_SID, @Auth_TOKEN

    private

    def auth
        @current_employee = Employee.find_by(id: session[:employee_id])
        render json: { errors: "No authorization found, Please sign-in" }, status: :unauthorized unless @current_employee
    end

    def render_not_processable(item)
        render json: { errors: item.record.errors.full_messages }, status: :unprocessable_entity
    end

    def awarded_message(employee)
        message = @client.messages.create(
            body: `Hello #{employee.first_name}! You have been awarded this schedule:` + employee.bids.first.schedule.shift_info + "If there seems to be an issue with this please contact Admin!",
            to: "+1" + employee.phone_number.to_s,
            from: @Twilio_NUMBER
        )
    end

    def not_enough_lines(employee)

    end

end
