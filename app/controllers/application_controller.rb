class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_processable
    before_action :auth

    # @Account_SID = ENV["ACCOUNT_SID"]
    # @Auth_TOKEN = ENV["AUTH_TOKEN"]
    # @Twilio_NUMBER = ENV["TWILIO_NUMBER"]

    # @client = Twilio::REST::Client.new @Account_SID, @Auth_TOKEN

    def awarded_message(employee)
        @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

        name = employee.first_name + " " + employee.last_name
        choice = employee.bids.find_by(awarded:true).choice_number
        schedule_info = employee.bids.find_by(awarded:true).schedule
        message_to_send = "#{name}, You have been awarded you bid choice #{choice}. Your schedule from #{schedule_info.start_date.to_fs(:long_ordinal)} to #{schedule_info.end_date.to_fs(:long_ordinal)} will be as follows: "

        message = @client.messages.create(
            body: message_to_send,
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
