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

ActiveRecord::Schema.define(version: 20180210060808) do

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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "libs", force: :cascade do |t|
    t.string "name"
    t.boolean "verify"
    t.string "link"
    t.integer "projects_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["projects_id"], name: "index_libs_on_projects_id"
  end

  create_table "os", force: :cascade do |t|
    t.integer "ostypes_id"
    t.integer "binaries_id"
    t.integer "supportingDocs_id"
    t.integer "libs_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["binaries_id"], name: "index_os_on_binaries_id"
    t.index ["libs_id"], name: "index_os_on_libs_id"
    t.index ["ostypes_id"], name: "index_os_on_ostypes_id"
    t.index ["supportingDocs_id"], name: "index_os_on_supportingDocs_id"
  end

  create_table "os_types", force: :cascade do |t|
    t.string "name"
    t.integer "project_id_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id_id"], name: "index_os_types_on_project_id_id"
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

  create_table "version_types", force: :cascade do |t|
    t.string "name"
    t.integer "projects_id"
    t.integer "versions_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["projects_id"], name: "index_version_types_on_projects_id"
    t.index ["versions_id"], name: "index_version_types_on_versions_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "gitLink"
    t.string "docLink"
    t.string "ciLink"
    t.datetime "buildDate"
    t.integer "versiontypes_id"
    t.integer "oses_id"
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oses_id"], name: "index_versions_on_oses_id"
    t.index ["project_id"], name: "index_versions_on_project_id"
    t.index ["versiontypes_id"], name: "index_versions_on_versiontypes_id"
  end

end
