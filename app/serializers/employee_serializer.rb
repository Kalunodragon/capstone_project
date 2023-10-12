class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :department, :phone_number, :email, :station, :seniority_date, :date_of_birth, :admin
end
