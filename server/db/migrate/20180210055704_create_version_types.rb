class CreateVersionTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :version_types do |t|
      t.string :name
      t.references :project, foreign_key: true
      

      t.timestamps
    end
  end
end
