class OsType < ApplicationRecord
  belongs_to :os
  validates_presence_of :name
end
