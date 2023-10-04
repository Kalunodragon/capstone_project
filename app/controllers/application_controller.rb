class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_processable
    before_action :auth

    def prevent_server_shutdown
        x = 1
        t = (Time.now + 10*60).to_fs(:time)
        p Time.now
        while x > 0 do
            if(Time.now >= t)
                p "Server timer reset"
                prevent_server_shutdown
            end
        end
    end

    prevent_server_shutdown

    private

    def auth
        @current_employee = Employee.find_by(id: session[:employee_id])
        render json: { errors: "No authorization found, Please sign-in" }, status: :unauthorized unless @current_employee
    end

    def render_not_processable(item)
        render json: { errors: item.record.errors.full_messages }, status: :unprocessable_entity
    end

end
