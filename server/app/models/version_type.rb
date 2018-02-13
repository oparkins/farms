class VersionType < ApplicationRecord
  belongs_to :projects
  belongs_to :versions
end
