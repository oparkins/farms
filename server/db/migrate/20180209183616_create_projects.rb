class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :projectLead
      t.string :email
      t.references :division, foreign_key: true
      t.references :lib, foreign_key: true
      t.references :lib_id, foreign_key: true
      t.references :version, foreign_key: true
      t.timestamps
    end
  end
end
