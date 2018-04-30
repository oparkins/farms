class CreateOperatingSystems < ActiveRecord::Migration[5.1]
  def change
    create_table :operating_systems do |t|
      t.references :version, foreign_key: true
      t.references :os_type, foreign_key: true
      t.timestamps
    end
  end
end
