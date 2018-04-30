class Division < ApplicationRecord
  belongs_to :company
  has_many :projects, dependent: :destroy
  validates_presence_of :name


  after_initialize do |division|
    division.director ||= ""
    division.divisionLink ||= ""
  end

end
