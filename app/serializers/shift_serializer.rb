class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :position, :day_off, :start_time, :off_time
end
