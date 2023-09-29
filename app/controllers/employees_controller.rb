class EmployeesController < ApplicationController
    skip_before_action :auth, only: :create

    # Finish setting up controller to allow for routes control of Employee model.
    # Test with postman to make sure create, show, update, and destroy all work
    
    def create
        if(params[:password] == params[password_confirmation])
            employee = Employee.create!(employee_params)
            session[:employee_id] = employee.id
            render json: employee, status: :created
        else
            render json: { errors: "Please try again, can't process"}, status: :unprocessable_entity
        end
    end

    def show

    end

    def update

    end

    def destroy

    end

    private

    def employee_params
        params.permit(:first_name, :last_name, :department, :phone_number, :email, :station, :seniority_date, :date_of_birth, :admin, :password, :password_confirmation)
    end
end
