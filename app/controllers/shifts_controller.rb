class ShiftsController < ApplicationController

  def create
    if(@current_employee.admin)
      created_shift = Shift.find_or_create_by(shift_params)
      render json: created_shift, serializer: ShiftWithConvertedTimesSerializer, status: :created
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def index
    if(@current_employee)
      render json: Shift.all, each_serializer: ShiftWithConvertedTimesSerializer, status: :ok
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def show
    if(@current_employee)
      shift_to_find = Shift.find_by(id: params[:id])
      if(shift_to_find)
        render json: shift_to_find, status: :ok
      else
        render json: { errors: "Sorry could not find a shift with that ID please try again!" }, status: :not_found
      end
    else
      render json: { errors: "Please login to preform this action!" }, status: :unauthorized
    end
  end

  def update
    if(@current_employee.admin)
      shift_to_update = Shift.find_by(params[:id])
      if(shift_to_update)
        shift_to_update.update!(shift_params)
        render json: shift_to_update, status: :accepted
      else
        render json: { errors: "Sorry could not find a shift with that ID please try again!" }, status: :not_found
      end
    else
      render json: { errors: "Sorry only Admin can preform this action!" }, status: :unauthorized
    end
  end

  def destroy
    if(@current_employee.admin)
      shift_to_delete = Shift.find_by(params[:id])
      if(shift_to_delete)
        shift_to_delete.destroy
        render json: shift_to_delete, status: :ok
      else
        render json: { errors: "Sorry could not find a shift with that ID please try again!" }, status: :not_found
      end
    else
      render json: { errors: "Sorry only Admin can preform this action!" }, status: :unauthorized
    end
  end

  private

  def shift_params
    params.permit(:position, :start_time, :off_time, :day_off)
  end

end
