class CreateOs < ActiveRecord::Migration[5.1]
  def change
    create_table :os do |t|
      t.references :ostypes, foreign_key: true
      t.references :binaries, foreign_key: true
      t.references :supportingDocs, foreign_key: true
      t.references :libs, foreign_key: true

      t.timestamps
    end
  end
end
