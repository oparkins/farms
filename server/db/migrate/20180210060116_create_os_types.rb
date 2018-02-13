class CreateOsTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :os_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
