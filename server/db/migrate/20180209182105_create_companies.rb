class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :addressLine1
      t.string :addressLine2
      t.string :addressCity
      t.string :addressState
      t.string :addressZip
      t.string :logo
      t.string :phone
      t.string :email

      t.timestamps
    end
  end
end
