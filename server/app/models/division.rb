class Division < ApplicationRecord
  belongs_to :company
  has_many :projects, dependent: :destroy
  validates_presence_of :name, :director, :divisionLink
end
