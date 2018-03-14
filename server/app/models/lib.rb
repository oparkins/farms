class Lib < ApplicationRecord
  belongs_to :operating_system
  has_one :project, dependent: :destroy
  validates_presence_of :name, :verify, :link
end
