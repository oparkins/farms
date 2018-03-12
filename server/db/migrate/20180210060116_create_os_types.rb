class CreateOsTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :os_types do |t|
      t.string :name
      t.references :os, foreign_key: true
      t.timestamps
    end
  end
end
