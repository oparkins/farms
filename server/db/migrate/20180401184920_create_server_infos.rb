class CreateServerInfos < ActiveRecord::Migration[5.1]
  def change
    create_table :server_infos do |t|
      t.integer :server_version
      t.integer :api_version
      t.boolean :app_setup

      t.timestamps
    end
  end
end
