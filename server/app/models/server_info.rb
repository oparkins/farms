class ServerInfo < ApplicationRecord
    validates_presence_of  :server_version, :api_version, :app_setup
end
