# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180416030852) do

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "addressLine1"
    t.string "addressLine2"
    t.string "addressCity"
    t.string "addressState"
    t.string "addressZip"
    t.string "logo"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "divisions", force: :cascade do |t|
    t.string "name"
    t.string "director"
    t.string "divisionLink"
    t.integer "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_divisions_on_company_id"
  end

  create_table "file_data", force: :cascade do |t|
    t.string "name"
    t.binary "data"
    t.string "dataHash"
    t.integer "operating_system_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operating_system_id"], name: "index_file_data_on_operating_system_id"
  end

  create_table "libs", force: :cascade do |t|
    t.string "name"
    t.boolean "verify"
    t.string "link"
    t.integer "operating_system_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operating_system_id"], name: "index_libs_on_operating_system_id"
  end

  create_table "operating_systems", force: :cascade do |t|
    t.integer "version_id"
    t.integer "os_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["os_type_id"], name: "index_operating_systems_on_os_type_id"
    t.index ["version_id"], name: "index_operating_systems_on_version_id"
  end

  create_table "os_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "projectLead"
    t.string "email"
    t.integer "division_id"
    t.integer "lib_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["division_id"], name: "index_projects_on_division_id"
    t.index ["lib_id"], name: "index_projects_on_lib_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "version_types", force: :cascade do |t|
    t.string "name"
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_version_types_on_project_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "gitLink"
    t.string "docLink"
    t.string "ciLink"
    t.integer "majorNumber"
    t.integer "minorNumber"
    t.integer "patchNumber"
    t.datetime "buildDate"
    t.integer "project_id"
    t.integer "version_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_versions_on_project_id"
    t.index ["version_type_id"], name: "index_versions_on_version_type_id"
  end

end
