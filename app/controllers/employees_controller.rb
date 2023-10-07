class EmployeesController < ApplicationController
    skip_before_action :auth, only: [:create, :test]

    # Finish setting up controller to allow for routes control of Employee model.
    # Test with postman to make sure create, show, update, and destroy all work

    def create
        # Dates need to be converted before passing them in as a param
        if(params[:password] == params[:password_confirmation])
            employee = Employee.create!(employee_params)
            session[:employee_id] = employee.id
            if(employee.admin)
                session[:admin] = employee.admin
            end
            render json: employee, status: :created
        else
            render json: { errors: "Please try again, can't process"}, status: :unprocessable_entity
        end
    end

    def show
        if(@current_employee)
            render json: @current_employee
        else
            render json: { errors: "No Employee logged in" }, status: :no_content
        end
    end

    def update
        employee = @current_employee
        if(params[:password] == params[:password_confirmation])
            employee.update!(employee_params)
            render json: employee, status: :ok
        else
            render json: { errors: "Please make sure the passwords match and try again" }, status: :unprocessable_entity
        end
    end

    def destroy
        if(@current_employee)
            if(session[:admin] == true)
                employee.destroy
                render json: employee, status: :ok
            else
                render json: { errors: "Only Admin can preform this action!" }, status: :unauthorized
            end
        else
            render json: { errors: "Please log in to try and preform this action!" }, status: :unauthorized
        end
    end

    def test
        render json: Employee.seniority_list, status: :ok
    end

    private

    def employee_params
        params.permit(:first_name, :last_name, :department, :phone_number, :email, :station, :seniority_date, :date_of_birth, :admin, :password, :password_confirmation)
    end
end

# def destroy
#     # This will need to change so that only and Admin can destroy/remove and Employee
#     # This is only for testing out the routes on front end
#     employee = find_employee
#     if(session[:employee_id] == employee.id)
#         employee.destroy
#         render json: employee, status: :ok
#     else
#         render json: { errors: "Only and Admin can remove and Employee!" }, status: :unauthorized
#     end
# end