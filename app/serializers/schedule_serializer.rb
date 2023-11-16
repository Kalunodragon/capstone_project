class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :bid_open, :bid_close, :start_date, :end_date, :number_available, :shifts

  # Add position, start time, day off order... type attributes to top level for sorting

  def shifts
    days = []
    days << {day:"Sunday", shift: formatted_shift(object.sunday_shift)}
    days << {day:"Monday", shift: formatted_shift(object.monday_shift)}
    days << {day:"Tuesday", shift: formatted_shift(object.tuesday_shift)}
    days << {day:"Wednesday", shift: formatted_shift(object.wednesday_shift)}
    days << {day:"Thursday", shift: formatted_shift(object.thursday_shift)}
    days << {day:"Friday", shift: formatted_shift(object.friday_shift)}
    days << {day:"Saturday", shift: formatted_shift(object.saturday_shift)}

    days
  end

  def formatted_shift(shift_info)
    shift = Shift.find_by(id: shift_info)
    time_off = (shift.day_off ? shift.off_time : Time.at(shift.off_time).strftime("%R"))
    time_start = (shift.day_off ? shift.start_time : Time.at(shift.start_time).strftime("%R"))
    formatted = {
      "id": shift.id,
      "day_off": shift.day_off,
      "off_time": time_off,
      "start_time": time_start,
      "position": shift.position
    }
    formatted
  end

end
