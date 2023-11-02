class ShiftWithConvertedTimesSerializer < ActiveModel::Serializer
  attributes :id, :shift_start_time, :shift_off_time, :position, :day_off

  def shift_start_time
    Time.at(object.start_time).strftime("%R") unless object.day_off
  end

  def shift_off_time
    Time.at(object.off_time).strftime("%R") unless object.day_off
  end

end
