class BidSerializer < ActiveModel::Serializer
  attributes :id, :choice_number, :schedule_id, :awarded
end
