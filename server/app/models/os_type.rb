class OsType < ApplicationRecord
  belongs_to :operating_system
  validates_presence_of :name
end
