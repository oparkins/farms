class OsType < ApplicationRecord
  has_many :operating_system, dependent: :destroy
  validates_presence_of :name
end
