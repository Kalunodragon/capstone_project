class SchedulesController < ApplicationController

  def create
    if(@current_employee.admin)
      created_schedule = Schedule.create(schedule_params)
      render json: created_schedule, serializer: ScheduleSerializer, status: :created
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def index
    if(@current_employee)
      render json: Schedule.all, each_serializer: ScheduleSerializer, status: :ok
    else
      render json: { errors: "Please login to view this content!" }, status: :unauthorized
    end
  end

  def show
    if(@current_employee)
      schedule_to_show = Schedule.find_by(id: params[:id])
      render json: schedule_to_show, serializer: ScheduleSerializer, status: :ok
    else
      render json: { errors: "Please login to view this content!" }, status: :unauthorized
    end
  end

  def update
    if(@current_employee.admin)
      schedule_to_update = Schedule.find_by(id: params[:id])
      schedule_to_update.update!(schedule_params)
      render json: schedule_to_update, serializer: ScheduleSerializer, status: :accepted
    else
      render json: { errors: "Please login to view this content!" }, status: :unauthorized
    end
  end

  def destroy
    if(@current_employee.admin)
      schedule_to_delete = Schedule.find_by(id: params[:id])
      schedule_to_delete.destroy
      render json: schedule_to_delete, serializer: ScheduleSerializer, status: :ok
    else
      render json: { errors: "Please login to view this content!" }, status: :unauthorized
    end
  end

  private

  def schedule_params
    params.permit(:bid_open,:bid_close,:start_date,:end_date,:sunday_shift,:monday_shift,:tuesday_shift,:wednesday_shift,:thursday_shift,:friday_shift,:saturday_shift,:number_available)
  end
end
