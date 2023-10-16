class SessionsController < ApplicationController
  skip_before_action :auth, only: :create

  def create
    employee = Employee.find_by(first_name: params[:first_name], last_name: params[:last_name])
    if employee&.authenticate(params[:password])
      session[:employee_id] = employee.id
      if(employee.admin)
        session[:admin] = employee.admin
      end
      render json: employee, status: :ok
    else
      render json: { error: "Employee does not exist or password is incorrect please try again." }, status: :unauthorized
    end
  end

  def destroy
    session.delete :employee_id
    if(session[:admin])
      session.delete :admin
    end
    head :no_content
  end
end
