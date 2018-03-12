class CreateVersionTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :version_types do |t|
      t.string :name
      t.references :projects, foreign_key: true
      t.references :versions, foreign_key: true

      t.timestamps
    end
  end
end
