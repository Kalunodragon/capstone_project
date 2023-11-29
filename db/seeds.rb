# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'date'

p Date.today

p "--- Starting Seed Generator ---"
p " "
p "Generating Employees"
    Employee.create(first_name:"Andrew", last_name:"Onulak", department:"Ramp", phone_number:7325759043, email:"test@test.com", station:"DEN", seniority_date: Date.new(2016,5,19), date_of_birth: Date.new(1992,5,2), admin:false, password:"testing", employee_number: "E2")
    Employee.create(first_name:"Drew", last_name:"Jordan", department:"Ramp", phone_number:7325759043, email:"test2@test.com", station:"DEN", seniority_date: Date.new(2016,5,19), date_of_birth: Date.new(1990,8,12), admin:true, password:"testing", employee_number: "E1")
    Employee.create(first_name:"Deletable", last_name:"Delete-Me", department:"Ramp", phone_number:7325759043, email:"delete@test.com", station:"NONE", seniority_date: Date.today, date_of_birth: Date.yesterday.yesterday, admin:false, password:"testing", employee_number: "E199998")
    Employee.create(first_name:"Willson", last_name:"Shouldget", department:"Ramp", phone_number:7325759043, email:"delete2@test.com", station:"NONE", seniority_date: Date.today, date_of_birth: Date.yesterday, admin:false, password:"testing", employee_number: "E199999")
    Employee.create(first_name:"Deletable3", last_name:"Delete-Me3", department:"Ramp", phone_number:7325759043, email:"delete3@test.com", station:"NONE", seniority_date: Date.today, date_of_birth: Date.today, admin:false, password:"testing", employee_number: "E200000")

    n = 11500
    10.times do |emp|
        f = Faker::Name.first_name
        l = Faker::Name.last_name
        h = Faker::Date.between(from: '1970-01-10', to: '2023-01-10')
        dob = h.next_year(-18)
        e = f + l + rand(1..999).to_s + "@test.com"
        en = "E" + n.to_s
        Employee.create(first_name:f,last_name:l,department:"Ramp",phone_number:7325759043,email:e,station:"DEN",seniority_date:Date.parse(h.to_s),date_of_birth:Date.parse(dob.to_s),admin:false,password:"testing",employee_number:en)
    end

    Employee.seniority_list.each do |emp|
        n += rand(1..3)
        if(emp.last_name == "Onulak")
            p n
        end
        num = "E"+n.to_s
        emp.update(password:"testing",employee_number:num)
    end

p "Finished generating Employees"
p " "
p "Generating Shifts"
    Shift.create(position: "Off", day_off: true, start_time: nil, off_time: nil)
    Shift.create(position: "Tpoint", day_off: false, start_time: Time.parse("6:00AM"), off_time: Time.parse("2:30PM"))
    Shift.create(position: "Gates", day_off: false, start_time: Time.parse("2:30PM"), off_time: Time.parse("11:00PM"))
    Shift.create(position: "Transfers", day_off: false, start_time: Time.parse("5:00AM"), off_time: Time.parse("1:30PM"))
    Shift.create(position: "Locals", day_off: false, start_time: Time.parse("1:30PM"), off_time: Time.parse("10:00PM"))
    Shift.create(position: "Lavs", day_off: false, start_time: Time.parse("5:30AM"), off_time: Time.parse("2:00PM"))
    Shift.create(position: "Cargo", day_off: false, start_time: Time.parse("2:00PM"), off_time: Time.parse("10:30PM"))
    Shift.create(position: "Float", day_off: false, start_time: Time.parse("9:00AM"), off_time: Time.parse("5:30PM"))
p "Finished generating Shifts"
p " "
p "Generating Schedules"
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:1, monday_shift:1, tuesday_shift:2, wednesday_shift:2, thursday_shift:2, friday_shift:2, saturday_shift:2, number_available:2)
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:3, monday_shift:3, tuesday_shift:1, wednesday_shift:1, thursday_shift:3, friday_shift:3, saturday_shift:3, number_available:2)
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:4, monday_shift:4, tuesday_shift:4, wednesday_shift:4, thursday_shift:1, friday_shift:1, saturday_shift:4, number_available:2)
    Schedule.create(bid_open:Date.new(2023,1,9), bid_close:Date.new(2023,8,9), start_date: Date.new(2023,8,10), end_date: Date.new(2023,11,11), sunday_shift:7, monday_shift:7, tuesday_shift:7, wednesday_shift:1, thursday_shift:1, friday_shift:7, saturday_shift:7, number_available:5)
p "Finished generating Schedules"
p " "
p "Generating Bids"
    Bid.create(choice_number:1, employee_id:1, schedule_id:1, awarded:false)
    Bid.create(choice_number:2, employee_id:1, schedule_id:3, awarded:false)
    Bid.create(choice_number:1, employee_id:3, schedule_id:1, awarded:false)
    Bid.create(choice_number:2, employee_id:3, schedule_id:2, awarded:false)
    Bid.create(choice_number:1, employee_id:4, schedule_id:1, awarded:false)
    Bid.create(choice_number:2, employee_id:4, schedule_id:3, awarded:false)
p "Finished generating Bids"
p " "
p "--- Finished Seed Generator ---"