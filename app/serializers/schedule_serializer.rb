class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :bid_open, :bid_close, :start_date, :end_date, :number_available, :shifts

  def shifts
    days = []
    days << {day:"Sunday", shift:Shift.find_by(id: object.sunday_shift)}
    days << {day:"Monday", shift:Shift.find_by(id: object.monday_shift)}
    days << {day:"Tuesday", shift:Shift.find_by(id: object.tuesday_shift)}
    days << {day:"Wednesday", shift:Shift.find_by(id: object.wednesday_shift)}
    days << {day:"Thursday", shift:Shift.find_by(id: object.thursday_shift)}
    days << {day:"Friday", shift:Shift.find_by(id: object.friday_shift)}
    days << {day:"Saturday", shift:Shift.find_by(id: object.saturday_shift)}

    days
  end

end
