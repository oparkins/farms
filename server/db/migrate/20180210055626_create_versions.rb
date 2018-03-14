class CreateVersions < ActiveRecord::Migration[5.1]
  def change
    create_table :versions do |t|
      t.string :gitLink
      t.string :docLink
      t.string :ciLink
      t.datetime :buildDate
      t.references :project, foreign_key: true
      t.timestamps
    end
  end
end
