class CreateFileData < ActiveRecord::Migration[5.1]
  def change
    create_table :file_data do |t|
      t.string :name
      t.binary :data
      t.string :dataHash
      t.references :operating_system, foreign_key: true

      t.timestamps
    end
  end
end
