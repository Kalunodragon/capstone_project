# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_04_212950) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bids", force: :cascade do |t|
    t.integer "choice_number"
    t.integer "employee_id"
    t.integer "schedule_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "awarded"
  end

  create_table "employees", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "department"
    t.bigint "phone_number"
    t.string "email"
    t.string "station"
    t.date "seniority_date"
    t.date "date_of_birth"
    t.boolean "admin"
    t.string "password_digest"
  end

  create_table "schedules", force: :cascade do |t|
    t.date "bid_open"
    t.date "bid_close"
    t.date "start_date"
    t.date "end_date"
    t.integer "sunday_shift"
    t.integer "monday_shift"
    t.integer "tuesday_shift"
    t.integer "wednesday_shift"
    t.integer "thursday_shift"
    t.integer "friday_shift"
    t.integer "saturday_shift"
    t.integer "number_available"
  end

  create_table "shifts", force: :cascade do |t|
    t.string "position"
    t.boolean "day_off"
    t.time "start_time"
    t.time "off_time"
  end

end
