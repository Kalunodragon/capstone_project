class BidSerializer < ActiveModel::Serializer
  attributes :id, :choice_number, :schedule_id, :awarded, :schedule

  has_one :schedule, serializer: ScheduleSerializer
end
