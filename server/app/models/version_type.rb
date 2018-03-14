class VersionType < ApplicationRecord
  belongs_to :project
  belongs_to :version

  validates_presence_of :name
end
