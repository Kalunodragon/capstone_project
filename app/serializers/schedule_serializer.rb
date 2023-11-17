class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :bid_open, :bid_close, :start_date, :end_date, :number_available, :shifts, :sort_position, :sort_time, :sort_day_position

  # Add position, start time, day off order... type attributes to top level for sorting
  # times and positions might need an array to hold multiple times and or positions (in this case they are automatically added to the bottom)

  @sort_position
  @sort_time
  @sort_day_position

  def sort_position
    @sort_position unless @sort_position == nil
  end

  def sort_time
    @sort_time unless @sort_time == nil
  end

  def sort_day_position
    sunday = Shift.find_by(id: object.sunday_shift)
    monday = Shift.find_by(id: object.monday_shift)
    tuesday = Shift.find_by(id: object.tuesday_shift)
    wednesday = Shift.find_by(id: object.wednesday_shift)
    thursday = Shift.find_by(id: object.thursday_shift)
    friday = Shift.find_by(id: object.friday_shift)
    saturday = Shift.find_by(id: object.saturday_shift)

    @sort_day_position = 0 if saturday.day_off && sunday.day_off
    @sort_day_position = 1 if sunday.day_off && monday.day_off
    @sort_day_position = 2 if monday.day_off && tuesday.day_off
    @sort_day_position = 3 if tuesday.day_off && wednesday.day_off
    @sort_day_position = 4 if wednesday.day_off && thursday.day_off
    @sort_day_position = 5 if thursday.day_off && friday.day_off
    @sort_day_position = 6 if friday.day_off && saturday.day_off
    @sort_day_position
  end

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
    @sort_position == nil ? (shift.day_off ? nil : @sort_position = shift.position) : nil
    @sort_time == nil ? (shift.day_off ? nil : @sort_time = time_start) : nil
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
