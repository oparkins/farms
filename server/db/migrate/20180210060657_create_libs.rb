class CreateLibs < ActiveRecord::Migration[5.1]
  def change
    create_table :libs do |t|
      t.string :name
      t.boolean :verify
      t.string :link
      t.references :project, foreign_key: true
      t.references :operating_system, foreign_key: true
      t.timestamps
    end
  end
end
