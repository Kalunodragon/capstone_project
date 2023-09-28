# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'date'

p Date.new(1992,5,2)

p "--- Starting Seed Generator ---"
p " "
p "Generating Employees"
    Employee.create(first_name:"Andrew", last_name:"Onulak", department:"Ramp", phone_number:7325759043, email:"test@test.com", station:"DEN", seniority_date: Date.new(2016,5,19), date_of_birth: Date.new(1992,5,2), admin:false, password:"testing")
p "Finished generating Employees"
p " "
p "Generating Shifts"
    Shift.create(position: "Off", day_off: true, start_time: nil, off_time: nil)
    Shift.create(position: "Tpoint", day_off: false, start_time: 600, off_time: 1430)
    Shift.create(position: "Gates", day_off: false, start_time: 1430, off_time: 2300)
    Shift.create(position: "Transfers", day_off: false, start_time: 500, off_time: 1330)
    Shift.create(position: "Locals", day_off: false, start_time: 1330, off_time: 2200)
    Shift.create(position: "Lavs", day_off: false, start_time: 530, off_time: 1400)
    Shift.create(position: "Cargo", day_off: false, start_time: 1400, off_time: 2230)
    Shift.create(position: "Float", day_off: false, start_time: 900, off_time: 1730)
p "Finished generating Shifts"
p " "
p "Generating Schedules"
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:1, monday_shift:1, tuesday_shift:2, wednesday_shift:2, thursday_shift:2, friday_shift:2, saturday_shift:2, number_available:3)
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:3, monday_shift:3, tuesday_shift:1, wednesday_shift:1, thursday_shift:3, friday_shift:3, saturday_shift:3, number_available:2)
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:4, monday_shift:4, tuesday_shift:4, wednesday_shift:4, thursday_shift:1, friday_shift:1, saturday_shift:4, number_available:1)
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:7, monday_shift:7, tuesday_shift:7, wednesday_shift:1, thursday_shift:1, friday_shift:7, saturday_shift:7, number_available:5)
p "Finished generating Schedules"
p " "
p "Generating Bids"
    Bid.create(choice_number:1, employee_id:1, schedule_id:1)
    Bid.create(choice_number:2, employee_id:1, schedule_id:3)
p "Finished generating Bids"
p " "
p "--- Finished Seed Generator ---"