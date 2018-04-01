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

ActiveRecord::Schema.define(version: 20180401184920) do

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
    t.integer "project_id"
    t.integer "operating_system_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operating_system_id"], name: "index_libs_on_operating_system_id"
    t.index ["project_id"], name: "index_libs_on_project_id"
  end

  create_table "operating_systems", force: :cascade do |t|
    t.integer "version_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["version_id"], name: "index_operating_systems_on_version_id"
  end

  create_table "os_types", force: :cascade do |t|
    t.string "name"
    t.integer "operating_system_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operating_system_id"], name: "index_os_types_on_operating_system_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "projectLead"
    t.string "email"
    t.integer "division_id"
    t.integer "lib_id"
    t.integer "lib_id_id"
    t.integer "version_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["division_id"], name: "index_projects_on_division_id"
    t.index ["lib_id"], name: "index_projects_on_lib_id"
    t.index ["lib_id_id"], name: "index_projects_on_lib_id_id"
    t.index ["version_id"], name: "index_projects_on_version_id"
  end

  create_table "server_infos", force: :cascade do |t|
    t.integer "server_version"
    t.integer "api_version"
    t.boolean "app_setup"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "version_types", force: :cascade do |t|
    t.string "name"
    t.integer "project_id"
    t.integer "version_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_version_types_on_project_id"
    t.index ["version_id"], name: "index_version_types_on_version_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "gitLink"
    t.string "docLink"
    t.string "ciLink"
    t.datetime "buildDate"
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_versions_on_project_id"
  end

end
