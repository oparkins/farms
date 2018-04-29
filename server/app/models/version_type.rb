class VersionType < ApplicationRecord
  belongs_to :project
  has_many :version, dependent: :destroy

  validates_presence_of :name
end
