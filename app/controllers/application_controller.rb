class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_processable
    
    private

    def auth
        @current_employee = Employee.find_by(id: session[:employee_id])
        render json: { errors: "No authorization found, Please sign-in" }, status: :unauthorized unless @current_employee
    end

    def render_not_processable(item)
        render json: { errors: item.record.errors.full_messages }, status: :unprocessable_entity
    end

end
