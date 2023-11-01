class EmployeesController < ApplicationController
    skip_before_action :auth, only: :test

    def create
        if(@current_employee.admin)
            params[:seniority_date] = params[:seniority_date].to_date
            params[:date_of_birth] = params[:date_of_birth].to_date
            password_gen = (Faker::Name.first_name + Faker::Number.number(digits:5).to_s)
            params[:password] = password_gen
            params[:employee_number] = `E#{Employee.seniority_list.last.employee_number[1..-1].to_i + 1}`
            employee = Employee.create!(employee_params)
            message_employee_password(password_gen, employee)
            render json: employee, status: :created
        else
            render json: { errors: "Only an Admin can set up an Employee account" }, status: :forbidden
        end
    end

    def index
        if(@current_employee)
            render json: Employee.seniority_list, status: :ok
        else
            render json: { erorrs: "Please login to access this information" }, status: :unauthorized
        end
    end

    def show
        if(@current_employee)
            render json: @current_employee, status: :ok
        else
            render json: { errors: "Please login to use this application" }, status: :no_content 
        end
    end

    def update
        if(@current_employee.admin)
            if(@current_employee.authenticate(params[:admin_password]))
                employee = Employee.find_by(id:params[:id])
                employee.update!(admin_params)
                message_admin_update(employee)
                render json: employee, status: :accepted
            else
                render json: { errors: "Error - Incorrect password, try again" }, status: :unauthorized
            end
        elsif(@current_employee && !@current_employee.admin)
            if(@current_employee.authenticate(params[:password]))
                if(params[:new_password].present? && params[:new_password_confirmation].present?)
                    if(params[:new_password] == params[:new_password_confirmation])
                        params[:password] = params[:new_password]
                        @current_employee.update(new_password_update_params)
                        message_employee_update(employee)
                        render json: @current_employee, status: :accepted
                    else
                        render json: { errors: "Error - New passwords must match" }, status: :not_acceptable
                    end
                else
                    @current_employee.update(update_params)
                    render json: @current_employee, status: :accepted
                end
            else
                render json: { errors: "Error - Incorrect password, try again" }, status: :unauthorized
            end
        else
            render json: { errors: "Please log in to update your account" }, status: :unauthorized
        end
    end

    def destroy
        if(@current_employee.admin)
            if(params[:password] == params[:password_confirmation])
                if(@current_employee.authenticate(params[:password]))
                    employee = Employee.find_by(id: params[:id])
                    employee.destroy
                    render json: employee, status: :ok
                else
                    render json: { errors: "Error - Inccorect password, try again" }, status: :unauthorized
                end
            else
                render json: { errors: "Error - Passwords do not match, try again" }, status: :unauthorized
            end
        else
            render json: { errors: "Only an Admin can preform this action!" }, status: :unauthorized
        end
    end

    def test
        testing = Schedule.all
        # byebug
        render json: testing, each_serializer: ScheduleSerializer, status: :ok
    end

    private

    def employee_params
        params.permit(:first_name, :last_name, :department, :phone_number, :email, :station, :seniority_date, :date_of_birth, :admin, :password, :password_confirmation, :employee_number)
    end

    def new_password_update_params
        params.permit(:phone_number, :email, :password)
    end

    def update_params
        params.permit(:phone_number, :email)
    end

    def admin_params
        params.permit(:first_name, :last_name, :department, :phone_number, :email, :station, :seniority_date, :date_of_birth, :admin)
    end

    def message_employee_password(password, employee)
        @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

        message = @client.messages.create(
            body: "#{employee.first_name}, Your account has been set up. Your Employee number is '#{employee.employee_number}' Your temporary password is: '#{password}'. We recommend changing your password during your first login session.",
            to: "+1" + employee.phone_number.to_s,
            from: ENV["TWILIO_NUMBER"],
        )
    end

    def message_admin_update(employee)
        @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

        message = @client.messages.create(
            body: "#{employee.first_name}, Your account has been updated by admin to reflect the new changes. Visit your account on RADS to view the details.",
            to: "+1" + employee.phone_number.to_s,
            from: ENV["TWILIO_NUMBER"],
        )
    end

    def message_employee_update(employee)
        @client = Twilio::REST::Client.new ENV["ACCOUNT_SID"], ENV["AUTH_TOKEN"]

        message = @client.messages.create(
            body: "#{employee.first_name}, Your account information has been changed. If you receive this message and didn't initiate an update to your account please contact admin.",
            to: "+1" + employee.phone_number.to_s,
            from: ENV["TWILIO_NUMBER"],
        )
    end
end
