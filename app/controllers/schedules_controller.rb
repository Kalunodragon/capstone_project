class SchedulesController < ApplicationController

  def create
    
  end

  def index
    if(@current_employee)
      render json: Schedule.all, status: :ok
    else
      render json: { errors: "Please login to view this content!" }, status: :unauthorized
    end
  end

  def show

  end

  def update

  end

  def destroy

  end
end
