class ShiftsController < ApplicationController

  def create
    if(@current_employee.admin)
      if(!Shift.find_by(position:params[:position],start_time:Time.parse(params[:start_time]),off_time:Time.parse(params[:off_time]),day_off:false))
        created_shift = Shift.create(position:params[:position],start_time:Time.parse(params[:start_time]),off_time:Time.parse(params[:off_time]),day_off:false)
        render json: created_shift, serializer: ShiftWithConvertedTimesSerializer, status: :created
      else
        render json: { errors: "Shift has already been created, can not duplicate shifts" }, status: :forbidden
      end
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

  # FUTURE USE FOR WHEN OUT OF ALPHA TESTINGapp
  # def update
  #   if(@current_employee.admin)
  #     shift_to_update = Shift.find_by(id: params[:id])
  #     if(shift_to_update)
  #       shift_to_update.update!(shift_params)
  #       render json: shift_to_update, status: :accepted
  #     else
  #       render json: { errors: "Sorry could not find a shift with that ID please try again!" }, status: :not_found
  #     end
  #   else
  #     render json: { errors: "Sorry only Admin can preform this action!" }, status: :unauthorized
  #   end
  # end

  def destroy
    if(@current_employee.admin)
      shift_to_delete = Shift.find_by(id: params[:id])
      if(shift_to_delete)
        if(shift_to_delete.id != 1)
          shift_to_delete.destroy
          render json: shift_to_delete, serializer: ShiftWithConvertedTimesSerializer, status: :ok
        else
          render json: { errors: "Can not delete day off shift" }, status: :forbidden
        end
      else
        render json: { errors: "Sorry could not find a shift with that ID please try again!" }, status: :not_found
      end
    else
      render json: { errors: "Sorry only Admin can preform this action!" }, status: :unauthorized
    end
  end

  private

end
